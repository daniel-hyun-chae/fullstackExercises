const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./model/book')
const Author = require('./model/author')
const User = require('./model/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('Connecting to ', MONGODB_URI)
mongoose.connect(MONGODB_URI, {  useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Conneted to MongoDB')
  })
  .catch((error)=>{
    console.log('Connection to MongoDB failed: ', error.message)
  })

mongoose.set('debug', true)

const typeDefs = gql`
  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
  }

  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
      addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String]!
      ): Book
      editAuthor(
          name: String!,
          setBornTo: Int!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        books = await Book.find({})
        if (args.genre){
          books = books.filter(book => book.genres.includes(args.genre))
        }
        if (args.author){
          const author = await Author.findOne({ name: args.author })
          books = books.filter(book => {
            return book.author.equals(author._id)
          })
        }
        return books
      },
      allAuthors: async () => {
        return await Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Book: {
    author: async (root) => await Author.findById(root.author)
  },
  Mutation: {
      addBook: async (root, args, context) => {
          const currentUser = context.currentUser

          if(!currentUser) {
            throw new AuthenticationError("not authenticated")
          }

          let author = await Author.findOne({name: args.author})

          if (!author){
            const newAuthor = new Author({name: args.author, bookCount: 1})
            try {
              author = await newAuthor.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args.author
              })
            }
          } else {
            author.bookCount += 1
            await author.save()
          }

          const book = new Book({...args, author: author.id})

          try {
            await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }

          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book
      },
      editAuthor: async (root, args, context) => {
         const currentUser = context.currentUser

          if(!currentUser) {
            throw new AuthenticationError("not authenticated")
          }

          const author = await Author.findOne({ name: args.name })
          author.born = args.setBornTo
          console.log(author)

          try {
            return await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
      },
      createUser: (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'secret'){
          throw new UserInputError("wrong credentials")
        }

        // define token contents with username and id
        const userForToken = {
          username: user.username,
          id: user._id
        }

        // return jwt token encoded with secret
        return { value: jwt.sign(userForToken, JWT_SECRET)}
      }
  }, 
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization: null 

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)

      // what's returned from context is available as third argument of resolvers
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
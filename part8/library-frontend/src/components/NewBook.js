import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: ( error ) => {
      console.log(error)
    },
    // update: (store, response) => {
    //   const dataInStore = store.readQuery({ query: ALL_BOOKS })
    //   store.writeQuery({
    //     query: ALL_BOOKS,
    //     data: {
    //       ...dataInStore,
    //       allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
    //     }
    //   })
    // }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    addBook({ 
      variables: { title, author, published: parseInt(published), genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit} className="space-y-2">
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="ml-3 border-b-2 px-3 py-1"
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className="ml-3 border-b-2 px-3 py-1"
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            className="ml-3 border-b-2 px-3 py-1"
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            className="mr-3 border-b-2 px-3 py-1"
          />
          <button onClick={addGenre} type="button" className='btn-sm'>add genre</button>
        </div>
        <div>
          genres added: {genres.join(' ')}
        </div>
        <button className='btn-sm' type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook

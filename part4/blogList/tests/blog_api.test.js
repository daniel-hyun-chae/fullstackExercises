const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper=  require('./test_helper')
const bcrypt = require('bcrypt')

// supertest only works with express app not with http server
const api = supertest(app)
let token
let savedUser

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  savedUser = await user.save()
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs.map(blog => {
    return { ...blog, user: savedUser._id }
  }))
})

describe('When there are initial blog saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog includes id property', async () => {
    const blogs = await helper.blogsInDb()
    const firstBlog = blogs[0]
    expect(firstBlog.id).toBeDefined()
  })
})

describe('Test cases for creating blog:', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'testNew_Title',
      author: 'testNew_Author',
      url: 'testNew_URL',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('testNew_Title')
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'testNew_Title',
      author: 'testNew_Author',
      url: 'testNew_URL',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('Default value 0 is used for like property', async () => {
    const newBlog = {
      title: 'testNew_Title',
      author: 'testNew_Author',
      url: 'testNew_URL',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.likes).toBe(0)
  })

  test('Creation Fails if mandatory properties are missing', async () => {
    const newBlog = {
      author: 'testNew_Author',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('test cases for deleting blog', () => {
  test('deletion suceed with status code 204 if the request is valid', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('test cases for updating blog', () => {
  test('like property can be updated', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToUpdate = blogAtStart[0]
    blogToUpdate.likes = 99

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedLike = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0]
    expect(updatedLike.likes).toBe(99)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
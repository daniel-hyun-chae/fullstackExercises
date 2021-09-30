const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'test1_Title',
    author: 'test1_Author',
    url: 'test1_URL',
    likes: 1
  },     {
    title: 'test2_Title',
    author: 'test2_Author',
    url: 'test2_URL',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'test3_Title',
    author: 'test3_Author',
    url: 'test3_URL',
    likes: 3
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const blogs = await User.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = request.body
  const user = request.user
  const blogToSave = new Blog({ ...blog, user: user._id })
  const savedBlog = await blogToSave.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const id = request.params.id
  const blog = await Blog.findById(id)
  console.log(user)
  console.log(blog)

  if (blog.user.toString() === user._id.toString()){
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'only the owner of the post can delete it' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogsRouter
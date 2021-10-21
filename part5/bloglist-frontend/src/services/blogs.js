import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (input) => {
  token = `Bearer ${input}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (title, author, url) => {
  const blog = { title, author, url }
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const formattedBlog = {
    user: newBlog.user.id,
    likes: newBlog.likes,
    author: newBlog.author,
    title: newBlog.author,
    url: newBlog.url
  }
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, formattedBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, setToken, create, update, remove }
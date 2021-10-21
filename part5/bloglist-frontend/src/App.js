import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogCreationForm from './components/BlogCreationForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      sortAndSetBlogs(blogs)
    }
    fetchBlogs()

    const user = localStorage.getItem('user')
    if (user){
      setUser(JSON.parse(user))
    }
  }, [])

  const sortAndSetBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(sortedBlogs)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      const message = `Welcome ${user.name}! You are successfully logged in.`
      displayMessage(message, 'notification', 1500)
    } catch {
      const message = 'wrong username or password'
      displayMessage(message, 'error', 1500)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('user')
    setUser(null)

    const message = 'You are successfully logged out.'
    displayMessage(message, 'notification', 1500)
  }

  const displayMessage = (message, type, time) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
    }, time)
  }

  const handleLike = async (blog) => {
    blogService.setToken(user.token)
    const newBlog = { ...blog, likes: blog.likes +1 }
    await blogService.update(newBlog)
    const newBlogs = blogs.map(entry => entry.id === newBlog.id ? newBlog : entry)
    sortAndSetBlogs(newBlogs)
  }

  const handleRemove = (blog) => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmed) {
      blogService.setToken(user.token)
      blogService.remove(blog.id)
    }
  }

  const handleCreateBlog = async (title, author, url) => {
    try {
      blogService.setToken(user.token)
      const response = await blogService.create(title, author, url)
      setBlogs(blogs.concat(response))
      const message = `A new blog ${response.title} by ${response.author} added`
      displayMessage(message, 'notification', 1500)
    } catch {
      const message = 'A new blog creation failed'
      displayMessage(message, 'error', 1500)
    }
    blogFormRef.current.setVisible()
  }

  if (user === null) {
    return <LoginForm message={message} messageType={messageType} handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} messageType={messageType} />
      <div>{user.name} logged in <button onClick={handleLogout}>Log-out</button></div>
      <Togglable ref={blogFormRef} buttonLabel='Create new blog'>
        <BlogCreationForm user={user} displayMessage={displayMessage} blogFormRef={blogFormRef} handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove}/>
      )}
    </div>
  )
}

export default App
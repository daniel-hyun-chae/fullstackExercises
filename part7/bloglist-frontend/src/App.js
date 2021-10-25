import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Route, Switch, useHistory } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogListForEachUser from './components/BlogListForEachUser'

import { blogInitilizeActionCreator } from './reducers/blogReducer'
import { messageSetActionCreator } from './reducers/messageReducer'
import { userSetActionCreator } from './reducers/userReducer'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const messageState = useSelector(state => state.message)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Initialize app
  useEffect(() => {
    dispatch(blogInitilizeActionCreator())

    const user = localStorage.getItem('user')
    if (user){
      dispatch(userSetActionCreator((JSON.parse(user))))
    }
  }, [])

  // handle Login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(userSetActionCreator(user))
      setUsername('')
      setPassword('')
      const message = `Welcome ${user.name}! You are successfully logged in.`
      dispatch(messageSetActionCreator(message, 'notification', 3))
    } catch {
      const message = 'wrong username or password'
      dispatch(messageSetActionCreator(message, 'error', 3))
    }
  }

  // Handle Logout
  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('user')
    dispatch(userSetActionCreator(null))
    const message = 'You are successfully logged out.'
    dispatch(messageSetActionCreator(message, 'notification', 3))
    history.push('/')
  }

  // If there is no logged in user, render log-in form
  if (user === null) {
    return (
      <div className="w-full h-screen bg-login bg-cover bg-center bg-blend-overlay bg-black bg-opacity-50">
        <Notification message={messageState.message} messageType={messageState.type} />
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </div>

    )
  }
  // If there is a logged in user, render blog page
  return (
    <div className="min-h-screen">
      <nav className='flex bg-gray-800 text-white text-xl px-16 py-5'>
        <Link to="/" className='flex items-center mr-12 hover:text-gray-300'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className='text-2xl font-semibold'>Bloglist</span>
        </Link>
        <ul className='flex space-x-5 items-center mr-auto'>
          <li>
            <Link to="/" className="hover:text-gray-300">Blogs</Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-gray-300">Users</Link>
          </li>
        </ul>
        <div className='flex space-x-5 items-center'>
          <div>{user.name} logged in</div>
          <button className="hover:text-gray-300" onClick={handleLogout}>Log-out</button>
        </div>
      </nav>
      <div className='container mx-auto py-7 min-h-full'>
        <Notification message={messageState.message} messageType={messageState.type} />
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/users/:id">
            <BlogListForEachUser />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>
      </div>
      <div className="bg-gray-800 text-white text-xl px-16 py-5 text-center font-semibold">
        Handcrafted by Hyun Chae
      </div>
    </div>
  )
}

export default App
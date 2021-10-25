import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Togglable from './Togglable'
import BlogCreationForm from './BlogCreationForm'
import BlogItem from './BlogItem'

import { blogUpdateActionCreator, blogRemoveActionCreator } from '../reducers/blogReducer'
import { blogCreateActionCreator } from '../reducers/blogReducer'
import { messageSetActionCreator } from '../reducers/messageReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  // Create a reference
  const blogFormRef = useRef()

  // Create blog
  const handleCreateBlog = async (title, author, url) => {
    try {
      dispatch(blogCreateActionCreator(title, author, url, user))
      // const message = `A new blog ${response.title} by ${response.author} added`
      const message = 'A new blog added'
      dispatch(messageSetActionCreator(message, 'notification', 3))
    } catch {
      const message = 'A new blog creation failed'
      dispatch(messageSetActionCreator(message, 'error', 3))
    }
    blogFormRef.current.setVisible()
  }

  // Like blog
  const handleLike = async (blog) => {
    dispatch(blogUpdateActionCreator(blog, user))
  }

  // Remove blog
  const handleRemove = (blog) => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmed) {
      dispatch(blogRemoveActionCreator(blog, user))

      const message = `Removed blog ${blog.title} by ${blog.author}`
      dispatch(messageSetActionCreator(message, 'error', 3))
    }
  }

  return (
    <div>
      <div className="text-2xl mb-7 text-gray-500">In this page, you can see the entire list of blogs or register a new blog.</div>
      <Togglable ref={blogFormRef} buttonLabel='Register a new blog'>
        <BlogCreationForm user={user} blogFormRef={blogFormRef} handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      <div className="border rounded-lg p-5 border-gray-300">
        {blogs.map(blog =>
          <BlogItem key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove}/>
        )}
      </div>
    </div>
  )
}

export default Blogs
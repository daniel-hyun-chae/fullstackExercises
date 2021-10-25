import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { blogUpdateActionCreator } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const { id } = useParams()
  const blog = blogs.find(entry => entry.id === id)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      ...blog,
      comments: [...blog.comments, comment]
    }
    dispatch(blogUpdateActionCreator(newBlog, user))
    setComment('')
  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(blogUpdateActionCreator(newBlog, user))
  }

  if (!blog){
    return null
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-2">
        <div className="text-2xl mb-7 text-gray-500">In this page, you can see the details of a blog</div>
        <h2 className="text-4xl font-semibold">{blog.title}</h2>
        <hr/>
        <div>URL: {blog.url}</div>
        <div>{blog.likes} Likes <button className="bg-gray-300 px-2 rounded-md" onClick={handleLike}>like</button></div>
        <div>Added by {blog.user.name}</div>
        <hr />
        <h3 className="text-xl font-semibold">Comments</h3>
        <form onSubmit={handleSubmit}>
          <input value={comment} onChange={handleChange} className="w-4/6 py-1 px-2 border-b mr-2" placeholder="What comment do you want to leave?"/><button className="bg-gray-300 px-2 py-1 rounded-md">Add Comment</button>
        </form>
        <ul className="list-disc">
          {blog.comments.map((comment) => <li key={comment}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog
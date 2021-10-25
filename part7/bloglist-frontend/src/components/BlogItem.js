import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <Link to={`blogs/${blog.id}`} data-test="blogItem" className="border-b border-gray-500 border-solid mb-5 px-3 py-1 text-xl hover:bg-gray-100 block">
      {blog.title} by {blog.author}
    </Link>
  )
}

export default Blog
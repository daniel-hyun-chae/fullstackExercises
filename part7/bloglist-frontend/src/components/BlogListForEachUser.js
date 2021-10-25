import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const BlogListForEachUser = () => {
  const blogs = useSelector(state => state.blogs)
  const { id } = useParams()
  const filteredBlogs = blogs.filter(blog => blog.user.id === id)

  if (filteredBlogs.length === 0){
    return null
  }

  return (
    <div className="min-h-screen">
      <div className="text-2xl mb-7 text-gray-500">In this page, you can see the list of blogs per user. </div>
      <h2 className="text-xl mb-5">Blogs added by {filteredBlogs[0].user.name}</h2>
      <ul>
        {filteredBlogs.map(blog => {
          return (
            <li key={blog.id} className="border-b border-gray-500 border-solid mb-5 px-3 py-1 text-xl hover:bg-gray-100 block"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
          )
        })}
      </ul>
    </div>
  )
}

export default BlogListForEachUser
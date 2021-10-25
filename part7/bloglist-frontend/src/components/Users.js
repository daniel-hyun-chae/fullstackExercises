import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector(state => state.blogs)

  // Create an object of user:number of blogs pair
  const blogsPerUser = blogs.length === 0 ? [] : blogs.reduce((result, currentBlog) => {
    if (currentBlog.user.id in result){
      result[currentBlog.user.id].count += 1
    } else {
      result[currentBlog.user.id] = { count: 1, name: currentBlog.user.name }
    }
    return result
  }, {})

  return (
    <div className="min-h-screen">
      <div className="text-2xl mb-7 text-gray-500">In this page, you can see the summary of blogs per user. Click on user name to see the list of blogs per user. </div>
      <table className="table-auto bg-gray-200 text-center">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2"></th>
            <th className="border border-gray-800 p-2">Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(blogsPerUser).map(blogPerUser => {
            return (
              <tr key={blogPerUser[0]} className="hover:bg-gray-400">
                <td className="border border-gray-800 p-2 "><Link to={`/users/${blogPerUser[0]}`}>{blogPerUser[1].name}</Link></td>
                <td className="border border-gray-800 p-2"><Link to={`/users/${blogPerUser[0]}`}>{blogPerUser[1].count}</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
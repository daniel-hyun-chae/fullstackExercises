import React, { useState } from 'react'

const BlogCreationForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="rounded-lg border p-5 space-y-3">
      <h2 className='text-2xl font-semibold text-center'>Create new blog</h2>
      <hr/>
      <form onSubmit={onSubmit}>
        <div className="px-5 py-1">
              Title:  <input data-test='title' required type="text" placeholder="What's the title of the blog?" value={title} onChange={(event) => {setTitle(event.target.value)}} className="w-5/6 px-3 py-2 border-b" />
        </div>
        <div className="px-5 py-1">
              Author:  <input data-test='author' required type="text" placeholder="Who's the author of the blog?" value={author} onChange={(event) => {setAuthor(event.target.value)}} className="w-5/6 px-3 py-2 border-b" />
        </div>
        <div className="px-5 py-1">
              URL:  <input data-test='url' required type="url" placeholder="What's the URL of the blog?" value={url} onChange={(event) => {setUrl(event.target.value)}} className="w-5/6 px-3 py-2 border-b" />
        </div>
        <button type="submit" data-test="submitButton" className={`w-full py-2 rounded-lg text-xl font-semibold bg-gray-100 ${title&&author&&url ? 'bg-blue-500':''}`}>Create</button>
      </form>
    </div>
  )
}

export default BlogCreationForm
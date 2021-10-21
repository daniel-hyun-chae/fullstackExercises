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
    <>
      <h2>Create new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
              Title:<input data-test='title' type="text" value={title} onChange={(event) => {setTitle(event.target.value)}} />
        </div>
        <div>
              Author:<input data-test='author' type="text" value={author} onChange={(event) => {setAuthor(event.target.value)}} />
        </div>
        <div>
              URL:<input data-test='url' type="url" value={url} onChange={(event) => {setUrl(event.target.value)}} />
        </div>
        <input type="submit" value="Create" data-test="submitButton"/>
      </form>
    </>
  )
}

export default BlogCreationForm
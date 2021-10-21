import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [contentVisible, setContentVisible] = useState(false)
  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible)
  }

  const onLike = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  const onRemove = (event) => {
    event.preventDefault()
    handleRemove(blog)
  }

  const showWhenContentVisible = { display:contentVisible?'':'none' }

  return (
    <div style={blogStyle} data-test="blogItem">
      <span>{blog.title} {blog.author}</span> <button data-test='blogItem-detailButton' onClick={toggleContentVisibility}>{contentVisible?'hide':'view'}</button>
      <div style={showWhenContentVisible} data-test="blogItem-detail">
        <div>{blog.url}</div>
        <div data-test='blogItem-detail-likes'>{blog.likes} <button data-test='blogItem-detail-likeButton' onClick={onLike}>like</button></div>
        <div>{blog.author}</div>
        <button onClick={onRemove}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
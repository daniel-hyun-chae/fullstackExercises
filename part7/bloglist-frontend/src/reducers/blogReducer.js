import blogService from '../services/blogs'

const sortBlogs = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })
  return sortedBlogs
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'BLOG_INITIALIZE':
    return action.data
  case 'BLOG_CREATE':
    return [...state, action.data]
  case 'BLOG_UPDATE':
    return sortBlogs(state.map(entry => entry.id === action.data.id ? action.data : entry))
  case 'BLOG_REMOVE':
    return state.filter(entry => entry.id !== action.data)
  default: return state
  }
}

export const blogInitilizeActionCreator = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = sortBlogs(blogs)
    dispatch({
      type: 'BLOG_INITIALIZE',
      data:  sortedBlogs
    })
  }
}

export const blogCreateActionCreator = (title, author, url, user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    const response = await blogService.create(title, author, url)
    dispatch({
      type: 'BLOG_CREATE',
      data: response
    })
  }
}

export const blogUpdateActionCreator = (blog, user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    const updatedBlog = await blogService.update(blog)
    console.log(updatedBlog)
    dispatch({
      type: 'BLOG_UPDATE',
      data:  updatedBlog
    })
  }
}

export const blogRemoveActionCreator = (blog, user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    await blogService.remove(blog.id)
    dispatch({
      type: 'BLOG_REMOVE',
      data: blog.id
    })
  }
}

export default blogReducer
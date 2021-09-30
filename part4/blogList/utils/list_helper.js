const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  },0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return {}
  }
  let maxIndex = 0
  let maxLike = 0

  for (let i = 0; i < blogs.length; i++){
    if (blogs[i].likes > maxLike){
      maxLike = blogs[i].likes
      maxIndex = i
    }
  }

  return blogs[maxIndex]
}

const mostBlogs = (blogs) => {
  const blogCount = {}

  blogs.forEach(blog => {
    if (blogCount[blog.author] >= 0){
      blogCount[blog.author] += 1
    } else {
      blogCount[blog.author] = 1
    }
  })
  let mostBlog = 0
  let mostBlogAuthor
  Object.keys(blogCount).forEach(author => {
    if (blogCount[author] > mostBlog){
      mostBlog = blogCount[author]
      mostBlogAuthor = author
    }
  })
  return {
    author: mostBlogAuthor,
    blogs: mostBlog
  }
}

const mostLikes = (blogs) => {
  const likeCount = {}

  blogs.forEach(blog => {
    if (likeCount[blog.author] >= 0){
      likeCount[blog.author] += blog.likes
    } else {
      likeCount[blog.author] = blog.likes
    }
  })
  let mostLikes = 0
  let mostLikesAuthor
  Object.keys(likeCount).forEach(author => {
    if (likeCount[author] > mostLikes){
      mostLikes = likeCount[author]
      mostLikesAuthor = author
    }
  })
  return {
    author: mostLikesAuthor,
    likes: mostLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
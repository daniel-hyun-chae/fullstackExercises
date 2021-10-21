import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let component

  const blog = {
    title: 'test title 1',
    url: 'test-url-1@naver.com',
    likes: 10,
    author: 'test Author'
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLike={mockHandler}/>
    )
  })

  test('Blog displays only title and author by default', () => {
    expect(component.container.querySelector('.blogItem')).toHaveTextContent(blog.title)
    expect(component.container.querySelector('.blogItem')).toHaveTextContent(blog.author)
    expect(component.container.querySelector('.blogItemDetail')).toHaveStyle({ display: 'none' })
  })

  test('Clicking view button make blog details visible', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container.querySelector('.blogItemDetail')).not.toHaveStyle({ display: 'none' })
    expect(component.container.querySelector('.blogItem')).toHaveTextContent(blog.url)
    expect(component.container.querySelector('.blogItem')).toHaveTextContent(blog.likes)
  })

  test('Like button triggers event as many time as it is clicked', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})


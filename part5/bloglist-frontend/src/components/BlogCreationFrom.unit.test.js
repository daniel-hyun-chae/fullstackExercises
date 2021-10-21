import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogCreationForm from './BlogCreationForm'

test('Right detail is passed when a new blog is created', () => {
  const handleCreateBlog = jest.fn()

  const component = render(
    <BlogCreationForm handleCreateBlog={handleCreateBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'test-author' }
  })
  fireEvent.change(title, {
    target: { value: 'test-title' }
  })
  fireEvent.change(url, {
    target: { value: 'http://www.test-url.com' }
  })

  fireEvent.submit(form)

  expect(handleCreateBlog.mock.calls).toHaveLength(1)
  expect(handleCreateBlog.mock.calls[0][0]).toBe('test-title')
  expect(handleCreateBlog.mock.calls[0][1]).toBe('test-author')
  expect(handleCreateBlog.mock.calls[0][2]).toBe('http://www.test-url.com')
})
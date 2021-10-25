import React from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const content = useField('text', 'content')
    const author = useField('text', 'author')
    const info = useField('text', 'info')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }

    const reset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} reset={null} />
          </div>
          <div>
            author
            <input {...author} reset={null}/>
          </div>
          <div>
            url for more info
            <input {...info} reset={null}/>
          </div>
          <button>create</button>
          <button onClick={reset}>reset</button>
        </form>
      </div>
    )
}

export default CreateNew
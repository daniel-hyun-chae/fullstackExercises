import React from 'react'
// import { useDispatch } from 'react-redux'
import {connect} from 'react-redux'
import {createNewAction} from '../reducers/anecdoteReducer'
import {setMessageAction} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        const anecdote = event.target.newAnecdote.value
        // dispatch(createNewAction(anecdote))
        props.createNewAction(anecdote)
        event.target.newAnecdote.value = ''
        // dispatch(setMessageAction(`You created a new anecdote '${anecdote}'`, 5))
        props.setMessageAction(`You created a new anecdote '${anecdote}'`, 5)
    }
      
    return (
        <form onSubmit={createNew}>
            <div><input name="newAnecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

const mapDispatchToProps = {
    createNewAction,
    setMessageAction
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
//export default AnecdoteForm
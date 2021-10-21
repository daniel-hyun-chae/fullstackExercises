import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {voteAction} from '../reducers/anecdoteReducer'
import {setMessageAction} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        const filteredAndSortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
        return filteredAndSortedAnecdotes
    })

    const vote = (id) => {
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteAction(anecdote))
        dispatch(setMessageAction(`You voted '${anecdote.content}'`, 5))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
        </>
    )
}

export default AnecdoteList
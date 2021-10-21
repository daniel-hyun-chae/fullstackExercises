import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'VOTE':
      const anecdote = state.find(anecdote => anecdote.id === action.data.id)
      const newAnecdote = { ...anecdote, votes: anecdote.votes +1 }
      return state.map(anecdote => anecdote.id === action.data.id ? newAnecdote : anecdote)
    case 'INITIALIZE':
      return action.data
    default: return state  
  }
}

export const createNewAction = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: anecdote
    })
  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: {id: updatedAnecdote.id}
    })
  }
}

export const initilizeAction = () => {
  return async dispatch => {
    const annecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: annecdotes
    })
  }
}

export default reducer
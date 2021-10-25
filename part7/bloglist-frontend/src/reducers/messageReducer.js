let timeoutId

const messageReducer = (state = { message: '', type: '' }, action) => {
  switch(action.type) {
  case 'MESSAGE_SET':
    return action.data
  case 'MESSAGE_REMOVE':
    return {
      message: '',
      type: ''
    }
  default: return state
  }
}

export const messageSetActionCreator = (message, type, timeInSec) => {
  return async dispatch => {
    dispatch({
      type: 'MESSAGE_SET',
      data: {
        message,
        type
      }
    })

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'MESSAGE_REMOVE'
      })
    }, timeInSec * 1000)
  }
}

export default messageReducer
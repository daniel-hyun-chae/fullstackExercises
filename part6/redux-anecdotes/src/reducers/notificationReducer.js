let currentTimeout = null;

const reducer = (state = "", action) => {
  switch (action.type) {
    case 'SETMESSAGE':
      return action.data.message
    case 'REMOVEMESSAGE':
      return ""
    default: return state
  }
}

export const setMessageAction = (message, timeInSec) =>{
  return async dispatch => {
    dispatch({
      type: 'SETMESSAGE',
      data: {
        message
      }
    })
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(()=>{
      dispatch({
        type: 'REMOVEMESSAGE'
      })
    }, timeInSec*1000)
  }
}

export const removeMessageAction = () => {
  return {
    type: 'REMOVEMESSAGE'
  }
}

export default reducer

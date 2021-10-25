import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'USER_SET':
    return action.data.user
  default: return state
  }
}

export const loginActionCreator = (username, password) => {
  return async dispatch => {
    const user = await loginService.login(username, password)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({
      type: 'USER_SET',
      data: {
        user
      }
    })
  }
}

export const userSetActionCreator = (user) => {
  return async dispatch => {
    dispatch({
      type: 'USER_SET',
      data: {
        user
      }
    })
  }
}

export default userReducer
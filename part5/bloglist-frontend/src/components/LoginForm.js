import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ message, messageType, handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} messageType={messageType} />
      <form onSubmit={handleLogin} data-test="loginForm">
        <div>
            username
          <input data-test="username" type="text" value={username} onChange={(event) => {setUsername(event.target.value)}}/>
        </div>
        <div>
            password
          <input data-test="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        </div>
        <input data-test="login-button" type="submit" value="login" />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
}

export default LoginForm
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <div className="flex flex-col bg-black bg-opacity-70 w-4/12 h-2/6 mx-auto absolute top-1/3 left-1/3 text-white px-20 py-5 space-y-10 rounded-lg">
      <h2 className="text-center font-bold text-3xl">Welcome to Bloglist</h2>
      <form onSubmit={handleLogin} data-test="loginForm" className="space-y-5 flex flex-col text-gray-800">
        <input data-test="username" type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} placeholder="Username" className="px-3 py-3 rounded-lg"/>
        <input data-test="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} placeholder="Password" className="px-3 py-3 rounded-lg"/>
        <input data-test="login-button" type="submit" value="Log in" className='text-xl font-semi px-3 py-3 rounded-lg' />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired
}

export default LoginForm
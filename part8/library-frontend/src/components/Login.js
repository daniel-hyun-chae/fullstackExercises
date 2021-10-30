import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const Login = ({setToken, show, setPage}) => {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        if ( result.data ){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setPage("authors")
            setName('')
            setPassword('')
        }
    }, [result.data]) //eslint-disable-line

    const handleLogin = (event) => {
        event.preventDefault()
        login({ variables: { username, password }})
    }

    if (!show) {
        return null
      }

    return (
        <div>
            <h2 className="text-2xl uppercase">login</h2>
            <form className="my-5" onSubmit={handleLogin}>
                <div>
                    Name 
                    <input className="ml-3 border-b-2 px-3 py-1" value={username} onChange={event=>setName(event.target.value)}/>
                </div>        
                <div>
                    Password 
                    <input className="ml-3 border-b-2 px-3 py-1" value={password} type='password' onChange={event=>setPassword(event.target.value)}/>
                </div>
                <button type='submit' className="mt-5 btn-sm">Login</button>
            </form>
        </div>

    )
}

export default Login
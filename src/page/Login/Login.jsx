import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  return (
    <>
        <div className=''>
            <div>
                <h1>LOGIN</h1>
            </div>
            <div>
                <label>Username: </label>
                <input type="text" placeholder='username' required tabIndex='1' />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" placeholder='password' required tabIndex='2' />
            </div>
            <div>
                <p>Don't have an account? <Link to='/register'>Sign up here!</Link></p>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </div>
    </>
  )
}

export default Login
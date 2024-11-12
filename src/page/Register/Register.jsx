import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
  return (
    <>
        <div className=''>
            <div>
                <h1>REGISTER</h1>
            </div>
            <div>
                <label htmlFor="">Username:</label>
                <input type="text" placeholder='username' required tabIndex='1' />
            </div>
            <div>
                <label htmlFor="">Email:</label>
                <input type="email" placeholder='email' required tabIndex='2' />
            </div>
            <div>
                <label htmlFor="">Password:</label>
                <input type="password" placeholder='password' required tabIndex='3' />
            </div>
            <div>
                <p>If you already registered an account, <Link to='/login'>Login here!</Link></p>
            </div>
            <div>
                <button type="submit">Sign up</button>
            </div>
        </div>
    </>
  )
}

export default Register
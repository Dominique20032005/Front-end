import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='inpForm w-fit h-fit flex items-center justify-center flex-col rounded-md p-5'>
            <div className='my-5'>
                <h1>LOGIN</h1>
            </div>
            <div className='flex items-center my-3'>
                <label htmlFor="">
                    <span class="material-symbols-outlined text-4xl mx-2">person</span>
                </label>
                <input type="text" className='inp w-48 h-8' placeholder='username' required tabIndex='1' />
            </div>
            <div className='flex items-centerm my-3'>
                <label htmlFor="">
                    <span class="material-symbols-outlined text-4xl mx-2">password</span>
                </label>
                <input type="password" className='inp w-48 h-8' placeholder='password' required tabIndex='3' />
            </div>
            <div>
                <p>Don't have an account? <Link to='/register'>Sign up here!</Link></p>
            </div>
            <div>
                <button type="submit"><Link to='/'>Login</Link></button>
            </div>
        </div>
    </div>
  )
}

export default Login
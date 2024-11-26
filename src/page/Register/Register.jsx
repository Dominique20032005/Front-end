import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='inpForm w-fit h-fit flex items-center justify-center flex-col rounded-md p-5'>
            <div>
                <h1>REGISTER</h1>
            </div>
            <div className='flex items-center my-3'>
                <label htmlFor="">
                    <span class="material-symbols-outlined text-4xl mx-2">person</span>
                </label>
                <input type="text" className='inp w-48 h-8' placeholder='username' required tabIndex='1' />
            </div>
            <div className='flex items-center my-3'>
                <label htmlFor="">
                    <span className="material-symbols-outlined text-4xl mx-2">mail</span>
                </label>
                <input type="email" className='inp w-48 h-8' placeholder='email' required tabIndex='2' />
            </div>
            <div className='flex items-center my-3'>
                <label htmlFor="">
                    <span class="material-symbols-outlined text-4xl mx-2">password</span>
                </label>
                <input type="password" className='inp w-48 h-8' placeholder='password' required tabIndex='3' />
            </div>
            <div>
                <p>If you already registered an account, <Link to='/login'>Login here!</Link></p>
            </div>
            <div>
                <button type="submit"><Link to='/login'>Sign up</Link></button>
            </div>
        </div>
    </div>
  )
}

export default Register
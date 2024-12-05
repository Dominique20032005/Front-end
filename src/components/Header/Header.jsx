import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <header className='flex items-center justify-between p-2.5'>
      <div>
        <h1 className='font-mono '>LEARNING</h1>
      </div>
      <div>
        <Link className='px-10' to='/'>Home</Link>
        <Link className='px-10' to='/about'>About</Link>
        <Link className='px-10' to='/post'>Post</Link>
      </div>
      <div>
        <button className='p-5'><Link to='/login'>Log out</Link></button>
        <button className='p-5'><Link to='/login'>Log in</Link></button>
        <button className='p-5'><Link to='/register'>Register</Link></button>
      </div>
    </header>
  )
}

export default Header
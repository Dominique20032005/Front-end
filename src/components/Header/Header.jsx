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
        <Link className='box mx-10 p-3 rounded-md' to='/'>Home</Link>
        <Link className='box mx-10 p-3 rounded-md' to='/about'>About</Link>
        <Link className='box mx-10 p-3 rounded-md' to='/post'>Post</Link>
      </div>
      <div>
        <button className='box m-5 p-2.5 rounded-md'><Link to='/login'>Log out</Link></button>
        <button className='box m-5 p-2.5 rounded-md'><Link to='/login'>Log in</Link></button>
        <button className='box m-5 p-2.5 rounded-md'><Link to='/register'>Register</Link></button>
      </div>
    </header>
  )
}

export default Header
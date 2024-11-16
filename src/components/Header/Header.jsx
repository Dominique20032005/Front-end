import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <button><Link to='/login'>Log out</Link></button>
        <button><Link to='/login'>Log in</Link></button>
        <button><Link to='/register'>Register</Link></button>
    </>
  )
}

export default Header
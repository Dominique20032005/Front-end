import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './page/Login/Login'
import Register from './page/Register/Register'
import Main from './page/Main/Main'
import About from './page/Aboutpage/About'
import Post from './page/Postpage/Post'
import './App.css'

const App = () => {
  return (
    <BrowserRouter className='min-h-screen'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
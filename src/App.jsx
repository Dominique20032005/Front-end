import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './page/Login/Login'
import Register from './page/Register/Register'
import Main from './page/Main/Main'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
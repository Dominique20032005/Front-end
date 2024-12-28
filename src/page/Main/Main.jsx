import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Main.css'
import '../../assets/font/Oswald/Oswald.css'

const Main = () => {
  return (
    <>
      <Header></Header>
      <div>
        <div className='board w-full h-screen flex items-center justify-center flex-col'>
          <h1 className='poppins-regular'>Welcome to UIT-Learning. Join with us for more interesting content</h1>
          <div className='new-Post flex items-center flex-col'>
            <h3>New post</h3>
            <div className='post'></div>
            <h2>For more post? <Link to='/post'>Click here</Link></h2>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Main
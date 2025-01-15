import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CarouselItem from '../../components/Carousel'
import './Main.css'
import '../../assets/font/Oswald/Oswald.css'

const Main = () => {
  return (
    <>
      <Header></Header>
      <div className='board w-full h-screen flex items-center justify-center'>
        <div className="left">
          <h1 className='oswald-regular text-4xl'>Welcome to Learning-Social. Join with us for more interesting content</h1>
          <h2 className='text-2xl'>For more post? <Link to='/post' className='font-bold text-5xl cursor-pointer'>Click here</Link></h2>
        </div>
        <div className="right">
        <CarouselItem autoplay={true} interval={5000} fade={true} />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Main
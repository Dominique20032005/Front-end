import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CarouselItem from '../../components/Carousel/Carousel'
import './Main.css'
import '../../assets/font/Oswald/Oswald.css'

const Main = () => {
  return (
    <>
      <Header></Header>
      <div className='board w-full h-screen flex items-center justify-center bg-gray-900 text-gray-100'>
        <div className="left w-6/12 px-5">
          <h1 className='oswald-regular text-4xl'><span className='text-teal-400'>Welcome to <span className='oswald-bold'>Learning-Social</span></span>. Join with us for more interesting content</h1>
          <h2 className='text-2xl'>For more post? <Link to='/post' className='btn text-2xl font-bold cursor-pointer p-3 rounded-lg text-gray-100 bg-gray-800/50 backdrop-blur border border-gray-700 text-center space-y-2'>Click here</Link></h2>
        </div>
        <div className="right w-6/12">
        <CarouselItem/>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Main
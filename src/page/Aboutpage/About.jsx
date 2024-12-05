import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const About = () => {
  return (
    <>
      <Header />
      <div className='board w-full h-screen flex items-center justify-center flex-col'>
        <h1>UIT-Learning</h1>
        <p>Created and designed on Dec 7th 2024, UIT-Learning is the place where you can share and explore.</p>
        <p>We hope that UIT-Learning can help you with your education process, meet new people, learning new things that you wanted.</p>
        <div className="stat">
          <div className='stats'>
            <h2>2</h2>
            <p>Creators</p>
          </div>
          <div className='stats'>
            <h2>20</h2>
            <p>Members</p>
          </div>
          <div className='stats'>
            <h2>10</h2>
            <p>Posts</p>
          </div>
        </div>
        <div className="creator">
          <div className="person">
            <h1>Nguyen Huu Anh Duc</h1>
            <h3>ID: 23560009</h3>
          </div>
          <div className="person">
            <h1>Ho Huy Thien</h1>
            <h3>ID: 23560063</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
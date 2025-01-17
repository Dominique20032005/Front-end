import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CarouselItem from '../../components/Carousel/Carousel';
import './Main.css';
import '../../assets/font/Oswald/Oswald.css';

const Main = () => {
  return (
    <>
      <Header />
      <div className="main-board w-full h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="main-left w-1/2 px-8">
          <h1 className="oswald-bold text-5xl leading-tight my-6 text-teal-400">
            Welcome to <span className="oswald-regular text-white">Learning-Social</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Join us to explore interesting content, learn, and connect with people who share your passion for knowledge.
          </p>
          <Link
            to="/post"
            className="main-btn text-lg font-semibold p-4 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-all"
          >
            Explore Posts
          </Link>
        </div>
        <div className="main-right w-1/2 px-6">
          <CarouselItem />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img0 from '../../assets/Images/img.jpg'
import img1 from '../../assets/Images/img1.jpg'
import img2 from '../../assets/Images/img2.jpg'
import './Carousel.css'


const carouselSlides = [
  {
    id: 1,
    title: 'First slide label',
    description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    image: img0,
  },
  {
    id: 2,
    title: 'Second slide label',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: img1,
  },
  {
    id: 3,
    title: 'Third slide label',
    description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
    image: img2,
  },
];

const CarouselItem = ({ autoplay = true, interval = 3000, fade = true }) => {
  return (
    <Carousel interval={autoplay ? interval : null} fade={fade} controls={false} indicators={false}>
      {carouselSlides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-full rounded-lg img-shadow"
            src={slide.image}
            alt={slide.title}
            style={{ height: '600px', width: '900px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselItem;
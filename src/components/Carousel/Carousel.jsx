import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img0 from '../../assets/Images/img.jpg';
import img1 from '../../assets/Images/img1.jpg';
import img2 from '../../assets/Images/img2.jpg';
import './Carousel.css';

const carouselSlides = [
  { id: 1, image: img0 },
  { id: 2, image: img1 },
  { id: 3, image: img2 },
];

const CarouselItem = ({ autoplay = true, interval = 2000, fade = true }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleImageClick = () => {
    const nextIndex = (index + 1) % carouselSlides.length; // Cycle through slides
    setIndex(nextIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={autoplay ? interval : null}
        fade={fade}
        controls={false}
        indicators={false}
      >
        {carouselSlides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img
              className="img-shadow"
              src={slide.image}
              alt={`Slide ${slide.id}`}
              onClick={handleImageClick} // Navigate to the next image on click
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselItem;

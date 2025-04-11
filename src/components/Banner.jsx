import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import imgar from '../assets/imgar.jpg';
import imgar1 from '../assets/imgar1.jpg';
import imgar2 from '../assets/imgar2.jpg';
import imgar3 from '../assets/imgar3.jpg';
import imgar4 from '../assets/imgar4.jpg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Banner = ({ language = 'en' }) => {
  // Debug: Log the language prop to verify its value
  console.log('Banner language prop:', language);

  // Conditionally set slides and images based on language
  const slides = language === 'ar' ? [imgar] : [image1, image2, image3, image4];
  const imageRow = language === 'ar' ? [imgar1, imgar2, imgar3, imgar4] : [img1, img2, img3, img4];

  // Debug: Log the selected slides and imageRow to verify
  console.log('Slides:', slides);
  console.log('Image Row:', imageRow);

  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDE_DURATION = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 20000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Slider Section */}
      <div className="relative w-full h-[700px] md:h-[500px] sm:h-[400px] xs:h-[300px] overflow-hidden">
        <div
          className="flex transition-transform ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)`, transitionDuration: `${SLIDE_DURATION}ms` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative w-full h-[700px] md:h-[500px] sm:h-[400px] xs:h-[300px] flex-shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide})`,
                backgroundColor: 'blue',
              }}
            ></div>
          ))}
        </div>

        <button
          onClick={goToPreviousSlide}
          className="absolute left-2 xs:left-4 top-1/2 transform -translate-y-1/2 border border-amber-50 rounded-lg p-2 xs:p-3 w-10 xs:w-12 h-16 xs:h-20 flex items-center justify-center bg-transparent cursor-pointer"
        >
          <FaChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-2 xs:right-4 top-1/2 transform -translate-y-1/2 border border-amber-50 rounded-lg p-2 xs:p-3 w-10 xs:w-12 h-16 xs:h-20 flex items-center justify-center bg-transparent cursor-pointer"
        >
          <FaChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* Image Row Section with Scrollable Flex */}
      <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden py-4 px-2 xs:px-4 sm:px-6 w-full scrollbar-hide">
        {imageRow.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
            className="w-[480px] h-auto object-cover rounded-lg shadow-md mr-5"
            draggable="false"
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
import React from 'react';
import product1 from '../assets/product1.svg';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.svg';
import product4 from '../assets/product4.svg';
import { useNavigate } from 'react-router-dom';

const OurProducts = ({ language = 'en' }) => {
  const navigate = useNavigate();

  // Translation dictionaries
  const translations = {
    en: {
      title: 'Categories',
      readMore: 'Read More',
    },
    ar: {
      title: 'الفئات',
      readMore: 'اقرأ المزيد',
    },
  };

  // Optionally, define language-specific images (uncomment if you have Arabic images)
  /*
  const images = {
    en: [product1, product2, product3, product4],
    ar: [product1_ar, product2_ar, product3_ar, product4_ar], // Replace with actual Arabic image imports
  };
  const productImages = images[language] || images.en;
  */

  // For now, use the same images for both languages since Arabic images aren't specified
  const productImages = [product1, product2, product3, product4];

  return (
    <div className="py-8 flex flex-col justify-center items-center bg-gray-50">
      <h1
        className={`text-3xl text-gray-600 font-medium text-center mb-6 sm:mb-8 ${
          language === 'ar' ? 'rtl' : 'ltr'
        }`}
      >
        {translations[language].title}
      </h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-screen-lg mx-auto px-2 sm:px-4 overflow-hidden">
        <img
          onClick={() => {
            navigate('/product/2');
            window.scrollTo(0, 0);
          }}
          src={productImages[0]}
          alt="Product 2"
          className="w-60 h-auto object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-110 cursor-pointer"
          draggable="false"
        />
        <img
          onClick={() => {
            navigate('/product/1');
            window.scrollTo(0, 0);
          }}
          src={productImages[1]}
          alt="Product 1"
          className="w-60 h-auto object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-110 cursor-pointer"
          draggable="false"
        />
        <img
          onClick={() => {
            navigate('/product/3');
            window.scrollTo(0, 0);
          }}
          src={productImages[2]}
          alt="Product 3"
          className="w-60 h-auto object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-110 cursor-pointer"
          draggable="false"
        />
        <img
          onClick={() => {
            navigate('/product/4');
            window.scrollTo(0, 0);
          }}
          src={productImages[3]}
          alt="Product 4"
          className="w-60 h-auto object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-110 cursor-pointer"
          draggable="false"
        />
      </div>
      <button
        onClick={() => {
          navigate('/products');
          window.scrollTo(0, 0);
        }}
        className={`primary w-1/3 sm:w-1/5 px-6 sm:px-8 py-3 sm:py-4 mt-10 text-white font-bold rounded-2xl hover:scale-105 duration-300 cursor-pointer flex items-center justify-center`} // Added flex, items-center, justify-center
      >
        {translations[language].readMore}
      </button>
    </div>
  );
};

export default OurProducts;
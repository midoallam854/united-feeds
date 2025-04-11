import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';

const BestSeller = ({ language = 'en' }) => {
  const context = useContext(ShopContext);
  const navigate = useNavigate();

  if (!context) {
    console.error('BestSeller must be used within a ShopContextProvider');
    return <div>Error: ShopContext not found</div>;
  }

  const { products } = context;
  const [bestSeller, setBestSeller] = useState([]);

  // Translation dictionaries
  const translations = {
    en: {
      title: 'Best Sellers',
      seeMore: 'See More',
    },
    ar: {
      title: 'الأكثر مبيعًا',
      seeMore: 'شاهد المزيد',
    },
  };

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-8">
      <div className="text-center">
        <h1
          className={`text-2xl font-semibold text-gray-600 ${language === 'ar' ? 'rtl' : 'ltr'}`}
        >
          {translations[language].title}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name_en={item.name.en} // Pass name_en
            name_ar={item.name.ar} // Pass name_ar
            image={item.image}
            price={item.price}
            stars={item.stars || 0}
            inStock={item.inStock}
            language={language}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate('/products');
            window.scrollTo(0, 0);
          }}
          className={`primary w-1/3 sm:w-1/5 px-6 sm:px-8 py-3 sm:py-4 text-white font-bold rounded-2xl hover:scale-105 duration-300 cursor-pointer flex items-center justify-center`} // Added flex, items-center, justify-center
        >
          {translations[language].seeMore}
        </button>
      </div>
    </div>
  );
};

export default BestSeller;
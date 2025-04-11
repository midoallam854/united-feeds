import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const MyFav = ({ language = 'en' }) => {
  const { products, favorites = [] } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [stockFilter, setStockFilter] = useState('In Stock');
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      account: 'Account',
      favorites: 'Favorites',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      noFavorites: 'No favorite products found.',
      addedToCart: 'Added to cart successfully!',
      addedToFavorites: 'Added to favorites!',
      removedFromFavorites: 'Removed from favorites!',
    },
    ar: {
      account: 'الحساب',
      favorites: 'المفضلة',
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
      noFavorites: 'لم يتم العثور على منتجات مفضلة.',
      addedToCart: 'تمت الإضافة إلى السلة بنجاح!',
      addedToFavorites: 'تمت الإضافة إلى المفضلة!',
      removedFromFavorites: 'تمت الإزالة من المفضلة!',
    },
  };

  const stockFilterOptions = [
    { en: 'In Stock', ar: translations.ar.inStock },
    { en: 'Out of Stock', ar: translations.ar.outOfStock },
  ];

  useEffect(() => {
    let filtered = [...products];

    filtered = filtered.filter((item) => favorites.includes(item._id));

    if (stockFilter === translations.en.inStock || stockFilter === translations.ar.inStock) {
      filtered = filtered.filter((item) => item.inStock);
    } else if (stockFilter === translations.en.outOfStock || stockFilter === translations.ar.outOfStock) {
      filtered = filtered.filter((item) => !item.inStock);
    }

    setFilteredProducts(filtered);
    setLoading(false); // Update immediately, no delay
  }, [stockFilter, products, favorites, language]);

  const handleStockFilterChange = (filter) => {
    setStockFilter(filter);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      className={`w-full max-w-full px-4 py-6 sm:px-6 md:px-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/account" className="hover:underline">{translations[language].account}</Link> /{' '}
        {translations[language].favorites}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">{translations[language].favorites}</h1>
        <div className="flex gap-2">
          {stockFilterOptions.map((option) => (
            <motion.button
              key={option.en}
              onClick={() => handleStockFilterChange(option[language])}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                stockFilter === option[language]
                  ? 'bg-[#78B833] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option[language]}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <motion.div key={index} variants={fadeIn}>
                <ProductItem
                  id={item._id}
                  name_en={item.name.en}
                  name_ar={item.name.ar}
                  image={item.image}
                  price={item.price}
                  stars={item.stars || 0}
                  inStock={item.inStock}
                  language={language}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              {translations[language].noFavorites}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyFav;
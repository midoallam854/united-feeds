import React from 'react';
import newArrivals from '../assets/newArrivals.svg';
import price from '../assets/price.svg';
import specialOffers from '../assets/specialOffers.svg';
import suggested from '../assets/suggested.svg';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion'; // For animations

const Dropdown = ({ isOpen, selectedOption, onOptionChange, language = 'en' }) => {
  // Translation dictionaries
  const translations = {
    en: {
      suggested: 'Suggested',
      newArrivals: 'New Arrivals',
      priceHighToLow: 'Price High to Low',
      priceLowToHigh: 'Price Low to High',
      discount: 'Discount',
    },
    ar: {
      suggested: 'مقترح',
      newArrivals: 'الوافدون الجدد',
      priceHighToLow: 'السعر من الأعلى إلى الأدنى',
      priceLowToHigh: 'السعر من الأدنى إلى الأعلى',
      discount: 'خصم',
    },
  };

  // Map English labels to translated labels for display
  const options = [
    { label: translations[language].suggested, icon: suggested, key: 'Suggested' },
    { label: translations[language].newArrivals, icon: newArrivals, key: 'New Arrivals' },
    { label: translations[language].priceHighToLow, icon: price, key: 'Price High to Low' },
    { label: translations[language].priceLowToHigh, icon: price, key: 'Price Low to High' },
    { label: translations[language].discount, icon: specialOffers, key: 'Discount' },
  ];

  // Find the translated label for the selected option
  const translatedSelectedOption =
    options.find((opt) => opt.key === selectedOption)?.label || selectedOption;

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        className={`flex items-center bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition-all duration-200 shadow-sm ${
          language === 'ar' ? 'flex-row-reverse' : ''
        }`}
        onClick={() => onOptionChange(null, true)} // Toggle dropdown
      >
        <span>{translatedSelectedOption}</span>
        <RiArrowDropDownLine
          className={`text-gray-500 ${language === 'ar' ? 'mr-2' : 'ml-2'} transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={24}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="py-2">
              {options.map(({ label, icon, key }) => (
                <li
                  key={key}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
                    language === 'ar' ? 'flex-row-reverse' : ''
                  } ${translatedSelectedOption === label ? 'bg-gray-50 font-semibold' : ''}`}
                  onClick={() => onOptionChange(key)} // Pass the English key
                >
                  <img
                    src={icon}
                    alt={`${label} Icon`}
                    className={`w-5 h-5 ${language === 'ar' ? 'ml-3' : 'mr-3'}`}
                  />
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
// components/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ language = 'en' }) => {
  const translations = {
    en: { loading: 'Loading...' },
    ar: { loading: 'جارٍ التحميل...' },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-12 h-12 border-4 border-t-4 border-[#78B833] border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
      <p className="mt-4 text-gray-500 text-lg">{translations[language].loading}</p>
    </motion.div>
  );
};

export default LoadingSpinner;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Checkout = ({ language = 'en' }) => {
  const navigate = useNavigate();

  // Translation dictionaries
  const translations = {
    en: {
      checkout: 'Checkout',
      comingSoon: 'Checkout page coming soon!',
      backToCart: 'Back to Cart',
    },
    ar: {
      checkout: 'الدفع',
      comingSoon: 'صفحة الدفع قادمة قريبًا!',
      backToCart: 'العودة إلى السلة',
    },
  };

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className={`p-6 max-w-6xl mx-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations[language].checkout}</h1>
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">{translations[language].comingSoon}</p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          {translations[language].backToCart}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
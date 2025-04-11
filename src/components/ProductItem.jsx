import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const ProductItem = ({ id, image, name_en, name_ar, price, stars, inStock, language = 'en' }) => {
  const navigate = useNavigate();
  const { currency, favorites, addToFavorites, removeFromFavorites, addToCart } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const isFavorited = favorites.some((item) => item === id);

  const translations = {
    en: {
      addToCart: 'Add to Cart',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      currency: currency || 'SAR',
      addedToCart: 'Added to cart successfully!',
      addedToFavorites: 'Added to favorites!',
      removedFromFavorites: 'Removed from favorites!',
    },
    ar: {
      addToCart: 'أضف إلى السلة',
      addToFavorites: 'أضف إلى المفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
      currency: 'ريال',
      addedToCart: 'تمت الإضافة إلى السلة بنجاح!',
      addedToFavorites: 'تمت الإضافة إلى المفضلة!',
      removedFromFavorites: 'تمت الإزالة من المفضلة!',
    },
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (isFavorited) {
      removeFromFavorites(id);
      toast.info(translations[language].removedFromFavorites, {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      addToFavorites(id);
      toast.success(translations[language].addedToFavorites, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!inStock) {
      toast.error(translations[language].outOfStock, {
        position: 'top-right',
        autoClose: 3000,
        style: { direction: language === 'ar' ? 'rtl' : 'ltr' },
      });
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(id);
    toast.success(translations[language].addedToCart, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const name = language === 'ar' ? name_ar : name_en;

  return (
    <div className={`bg-white shadow-sm rounded-lg overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Link to={`/product-details/${id}`}>
        <div className="relative w-full h-48 flex items-center justify-center bg-white">
          <img
            className="max-h-full max-w-full object-contain"
            src={Array.isArray(image) ? image[0] : image}
            alt={name}
          />
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-2 ${language === 'ar' ? 'left-2' : 'right-2'} text-2xl`}
            aria-label={
              isFavorited ? translations[language].removeFromFavorites : translations[language].addToFavorites
            }
            disabled={!user}
          >
            {isFavorited ? (
              <AiFillHeart className={`cursor-pointer ${user ? 'text-[#78B833]' : 'text-gray-300'}`} />
            ) : (
              <AiOutlineHeart className={`cursor-pointer ${user ? 'text-gray-400 hover:text-[#78B833]' : 'text-gray-300'}`} />
            )}
          </button>
        </div>
        <div className="p-4 text-center">
          <div className="flex justify-center text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(stars) ? '★' : '☆'}</span>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="text-base font-semibold text-gray-900 mt-1">
            {price} {translations[language].currency}
          </p>
          <p className={`text-sm mt-1 ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? translations[language].inStock : translations[language].outOfStock}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#78B833] text-white py-2 rounded-full flex items-center justify-center text-sm font-medium hover:bg-[#78B833] transition-colors cursor-pointer"
          disabled={!inStock}
        >
          <AiOutlineShoppingCart className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          {translations[language].addToCart}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import saudi from '../assets/saudi.png';
import Notification from '../assets/Notification.svg';
import eng from '../assets/eng.svg';
import cart from '../assets/cart.svg';
import fav from '../assets/fav.svg';
import logo from '../assets/logo.svg';
import best from '../assets/best.svg';
import profile from '../assets/profile.svg';
import search_icon from '../assets/search_icon.svg';
import group from '../assets/group.svg';
import menu_icon from '../assets/menu_icon.png';
import { NavLink } from 'react-router-dom';

const Navbar = ({ language, setLanguage }) => {
  const { favorites = [], products } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDesktopSearchFocused, setIsDesktopSearchFocused] = useState(false);

  // Translation dictionaries
  const translations = {
    en: {
      searchPlaceholder: 'Search',
      categories: 'Categories',
      all: 'ALL',
      barley: 'Barley',
      corn: 'Corn',
      soya: 'Soya',
      wheat: 'Wheat',
      bestTagline: 'Best Feeds Production in Saudi Arabia',
      signIn: 'Sign in',
      logout: 'Logout',
    },
    ar: {
      searchPlaceholder: 'بحث',
      categories: 'الفئات',
      all: 'الكل',
      barley: 'شعير',
      corn: 'ذرة',
      soya: 'صويا',
      wheat: 'قمح',
      bestTagline: 'أفضل إنتاج أعلاف في المملكة العربية السعودية',
      signIn: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
    },
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Update suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredSuggestions = products
        .filter((product) =>
          product.name[language].toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((product) => product.name[language])
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products, language]); // Add language to dependencies

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setIsMobileMenuOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  // Handle search functionality
  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      const exactMatch = products.find(
        (product) => product.name[language].toLowerCase() === query.trim().toLowerCase()
      );
      if (exactMatch) {
        navigate(`/product-details/${exactMatch._id}`);
      } else {
        navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      }
    } else {
      navigate('/products');
    }
    setSearchQuery('');
    setSuggestions([]);
    setIsMobileSearchOpen(false);
    setIsDesktopSearchFocused(false);
  };

  // Handle search on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const selectedProduct = products.find(
      (product) => product.name[language] === suggestion
    );
    if (selectedProduct) {
      navigate(`/product-details/${selectedProduct._id}`);
    }
    setSearchQuery('');
    setSuggestions([]);
    setIsDesktopSearchFocused(false);
    setIsMobileSearchOpen(false);
  };

  // Handle language toggle
  const handleLanguageToggle = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className={`flex flex-col w-full px-4 py-4 gap-5 bg-white shadow-md relative ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* First Row: Logo, Search, Language, Menu Icon, Tagline */}
      <div className="flex items-center justify-between w-full gap-4">
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="w-28 sm:w-32 md:w-36 cursor-pointer"
          src={logo}
          alt="Logo"
        />

        {/* Desktop Search Bar */}
        <div className="hidden sm:flex flex-grow max-w-xs md:max-w-sm lg:max-w-md relative">
          <input
            className="rounded-full px-4 py-2 w-full border border-gray-300 focus:outline-none placeholder-gray-300 h-8 text-sm"
            type="text"
            placeholder={translations[language].searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsDesktopSearchFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsDesktopSearchFocused(false), 200);
            }}
          />
          <img
            src={search_icon}
            alt="Search"
            className={`absolute ${language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer`}
            onClick={() => handleSearch()}
          />
          {/* Desktop Suggestions Dropdown */}
          {isDesktopSearchFocused && suggestions.length > 0 && (
            <ul className={`absolute top-10 ${language === 'ar' ? 'right-0' : 'left-0'} w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto`}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="sm:hidden flex-grow w-full relative">
            <input
              className="rounded-full px-4 py-2 w-full border border-gray-300 focus:outline-none placeholder-gray-300 h-8 text-sm"
              type="text"
              placeholder={translations[language].searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              onBlur={() => {
                setTimeout(() => {
                  setIsMobileSearchOpen(false);
                  handleSearch();
                }, 200);
              }}
            />
            <img
              src={search_icon}
              alt="Search"
              className={`absolute ${language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer`}
              onClick={() => handleSearch()}
            />
            {/* Mobile Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className={`absolute top-10 ${language === 'ar' ? 'right-0' : 'left-0'} w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto`}>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Language Selection, Search Icon, Menu Icon, and Tagline */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Icon for Mobile */}
          <img
            src={search_icon}
            alt="Search"
            className="sm:hidden w-6 h-6 cursor-pointer"
            onClick={toggleMobileSearch}
          />

          <div className="flex gap-2">
            <div
              className={`flex items-center gap-1 cursor-pointer ${language === 'en' ? 'text-[#78B833]' : 'hover:text-[#78B833]'} transition-colors`}
              onClick={() => handleLanguageToggle('en')}
            >
              <img src={eng} alt="English" className="w-5 h-5" />
              <p className="text-xs sm:text-sm font-medium">ENG</p>
            </div>
            <div
              className={`flex items-center gap-1 cursor-pointer ${language === 'ar' ? 'text-[#78B833]' : 'hover:text-[#78B833]'} transition-colors`}
              onClick={() => handleLanguageToggle('ar')}
            >
              <img src={saudi} alt="Arabic" className="w-5 h-5" />
              <p className="text-xs sm:text-sm font-medium">عربي</p>
            </div>
          </div>
          <img
            src={menu_icon}
            alt="Menu"
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="hidden lg:flex items-center gap-2 text-gray-600">
            <img src={best} alt="Best" className="w-8 h-8" />
            <p className="text-sm">{translations[language].bestTagline}</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 right-0 w-64 h-screen bg-white shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-end">
              <img
                src={menu_icon}
                alt="Close Menu"
                className="w-6 h-6 cursor-pointer transform rotate-180"
                onClick={toggleMobileMenu}
              />
            </div>
            <ul className="flex flex-col gap-4 mt-4 font-medium text-gray-700">
              <NavLink to="/products" onClick={toggleMobileMenu}>
                <li className="py-1 text-black font-normal hover:text-[#78B833]">
                  {translations[language].categories}
                </li>
              </NavLink>
              {['ALL', 'Barley', 'Corn', 'Soya', 'Wheat'].map((item) => (
                <NavLink
                  key={item}
                  to={`/product/${item === 'ALL' ? '0' : ['Barley', 'Corn', 'Soya', 'Wheat'].indexOf(item) + 1}`}
                  className={({ isActive }) =>
                    isActive ? 'text-[#78B833]' : 'hover:text-[#78B833] transition-colors'
                  }
                  onClick={toggleMobileMenu}
                >
                  <li className="py-1 text-black font-normal hover:text-[#78B833]">
                    {translations[language][item.toLowerCase()]}
                  </li>
                </NavLink>
              ))}
              <div className="flex items-center gap-4 mt-6">
                <div className="relative">
                  <img
                    src={cart}
                    alt="Cart"
                    className={`w-6 h-6 cursor-pointer transition-opacity ${user ? 'hover:opacity-70' : 'opacity-50'}`}
                    onClick={() => {
                      user ? navigate('/cart') : navigate('/login');
                      toggleMobileMenu();
                    }}
                  />
                </div>
                <div className="relative">
                  <img
                    src={fav}
                    alt="Favorites"
                    className={`w-6 h-6 cursor-pointer transition-opacity ${user ? 'hover:opacity-70' : 'opacity-50'}`}
                    onClick={() => {
                      user ? navigate('/favorites') : navigate('/login');
                      toggleMobileMenu();
                    }}
                  />
                  {user && favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </div>
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="primary text-white px-4 py-2 rounded-full cursor-pointer transition-colors text-sm font-medium"
                    >
                      {translations[language].logout}
                    </button>
                    <img
                      src={profile}
                      alt="Profile"
                      className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => {
                        navigate('/profile');
                        toggleMobileMenu();
                      }}
                    />
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      toggleMobileMenu();
                    }}
                    className="primary text-white px-4 py-2 rounded-full cursor-pointer transition-colors text-sm font-medium"
                  >
                    {translations[language].signIn}
                  </button>
                )}
                <img
                  src={Notification}
                  alt="Notifications"
                  className={`w-6 h-6 cursor-pointer transition-opacity ${user ? 'hover:opacity-70' : 'opacity-50'}`}
                  onClick={() => {
                    user ? navigate('/notifications') : navigate('/login');
                    toggleMobileMenu();
                  }}
                />
              </div>
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Second Row: Navigation and User Actions */}
      <div className="hidden md:flex items-center justify-between w-full border-t border-gray-200 pt-4">
        <div className="flex items-center gap-4">
          <img
            src={group}
            alt="Group"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              navigate('/products');
              window.scrollTo(0, 0);
            }}
          />
          <ul className="flex items-center gap-4 lg:gap-6 font-medium text-gray-700">
            <NavLink to="/products">
              <li className="py-1 relative group text-black font-normal hover:text-[#78B833]">
                {translations[language].categories}
                <hr className="border-none outline-none h-0.5 w-3/5 primary m-auto absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </NavLink>
            {['ALL', 'Barley', 'Corn', 'Soya', 'Wheat'].map((item) => (
              <NavLink
                key={item}
                to={`/product/${item === 'ALL' ? '0' : ['Barley', 'Corn', 'Soya', 'Wheat'].indexOf(item) + 1}`}
                className={({ isActive }) =>
                  isActive ? 'text-[#78B833]' : 'hover:text-[#78B833] transition-colors'
                }
              >
                <li className="py-1 relative group text-black font-normal hover:text-[#78B833]">
                  {translations[language][item.toLowerCase()]}
                  <hr className="border-none outline-none h-0.5 w-3/5 primary m-auto absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 lg:gap-8">
          <div className="relative">
            <img
              src={cart}
              alt="Cart"
              className={`w-6 h-6 cursor-pointer transition-opacity ${user ? 'hover:opacity-70' : 'opacity-50'}`}
              onClick={() => (user ? navigate('/cart') : navigate('/login'))}
            />
          </div>
          <div className="relative">
            <img
              src={fav}
              alt="Favorites"
              className={`w-6 h-6 cursor-pointer transition-opacity ${user ? 'hover:opacity-70' : 'opacity-50'}`}
              onClick={() => (user ? navigate('/favorites') : navigate('/login'))}
            />
            {user && favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#78B833] text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="primary text-white px-6 py-2 rounded-full cursor-pointer transition-colors text-sm font-medium"
              >
                {translations[language].logout}
              </button>
              <img
                src={profile}
                alt="Profile"
                className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/profile')}
              />
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="primary text-white px-6 py-2 rounded-full cursor-pointer transition-colors text-sm font-medium"
            >
              {translations[language].signIn}
            </button>
          )}
          <img
            src={Notification}
            alt="Notifications"
            className={`w-6 h-6 cursor-pointer transition-opacity ${user ? 'hover:opacity-70' : 'opacity-50'}`}
            onClick={() => (user ? navigate('/notifications') : navigate('/login'))}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
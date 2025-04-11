import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShopContextProvider from './context/ShopContext';
import { auth } from './firebase';

import './index.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // New import
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import PrivacyAndPolicy from './pages/PrivacyAndPolicy';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Profile from './pages/Profile';
import ReturnAndExchange from './pages/ReturnAndExchange';
import ShopDetails from './pages/Shopdetails';
import Shop from './pages/Shop';
import SignUp from './pages/SignUp';
import UsagePolicy from './pages/UsagePolicy';
import Footer from './components/Footer';
import Product from './pages/Product';
import ScrollToTop from './components/ScrollToTop'; // New import

// Error Boundary Component
const ErrorBoundary = ({ children, language }) => {
  const [hasError, setHasError] = useState(false);

  const handleTryAgain = () => {
    setHasError(false);
  };

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="p-6 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h1 className="text-red-600 text-3xl font-semibold mb-4" role="alert">
          {language === 'ar' ? 'حدث خطأ ما.' : 'Something went wrong.'}
        </h1>
        <p className="text-gray-600 mb-6">
          {language === 'ar'
            ? 'يرجى المحاولة مرة أخرى أو الاتصال بالدعم.'
            : 'Please try again or contact support.'}
        </p>
        <button
          onClick={handleTryAgain}
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          aria-label={language === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
        >
          {language === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
        </button>
      </div>
    );
  }

  return children;
};

// Protected Route Component
const ProtectedRoute = ({ children, language }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.info(language === 'ar' ? 'يرجى تسجيل الدخول للوصول إلى هذه الصفحة.' : 'Please log in to access this page.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const [language, setLanguage] = useState('en'); // Default to English
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ShopContextProvider>
        <div
          className={`scrollbar-hide ${language === 'ar' ? 'rtl' : 'ltr'}`}
          lang={language}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <ScrollToTop />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
          <Navbar language={language} setLanguage={setLanguage} />
          <main className="min-h-screen">
            <Routes>
              <Route path="/about" element={<ErrorBoundary language={language}><About language={language} /></ErrorBoundary>} />
              <Route
                path="/cart"
                element={
                  <ErrorBoundary language={language}>
                    <ProtectedRoute language={language}>
                      <Cart language={language} />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ErrorBoundary language={language}>
                    <ProtectedRoute language={language}>
                      <Checkout language={language} />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              />
              <Route path="/contact" element={<ErrorBoundary language={language}><Contact language={language} /></ErrorBoundary>} />
              <Route
                path="/favorites"
                element={
                  <ErrorBoundary language={language}>
                    <ProtectedRoute language={language}>
                      <Favorites language={language} />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              />
              <Route path="/" element={<ErrorBoundary language={language}><Home language={language} /></ErrorBoundary>} />
              <Route path="/login" element={<ErrorBoundary language={language}><Login language={language} /></ErrorBoundary>} />
              <Route
                path="/order-history"
                element={
                  <ErrorBoundary language={language}>
                    <ProtectedRoute language={language}>
                      <OrderHistory language={language} />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              />
              <Route path="/privacy-policy" element={<ErrorBoundary language={language}><PrivacyAndPolicy language={language} /></ErrorBoundary>} />
              <Route path="/product-details/:productId" element={<ErrorBoundary language={language}><ProductDetails language={language} /></ErrorBoundary>} />
              <Route path="/products" element={<ErrorBoundary language={language}><Products language={language} /></ErrorBoundary>} />
              <Route path="/product/:categoryNum" element={<ErrorBoundary language={language}><Product language={language} /></ErrorBoundary>} />
              <Route
                path="/profile"
                element={
                  <ErrorBoundary language={language}>
                    <ProtectedRoute language={language}>
                      <Profile language={language} />
                    </ProtectedRoute>
                  </ErrorBoundary>
                }
              />
              <Route path="/returns-exchange" element={<ErrorBoundary language={language}><ReturnAndExchange language={language} /></ErrorBoundary>} />
              <Route path="/shop-details" element={<ErrorBoundary language={language}><ShopDetails language={language} /></ErrorBoundary>} />
              <Route path="/shop" element={<ErrorBoundary language={language}><Shop language={language} /></ErrorBoundary>} />
              <Route path="/signup" element={<ErrorBoundary language={language}><SignUp language={language} /></ErrorBoundary>} />
              <Route path="/usage-policy" element={<ErrorBoundary language={language}><UsagePolicy language={language} /></ErrorBoundary>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer language={language} />
        </div>
      </ShopContextProvider>
    </BrowserRouter>
  );
};

export default App;
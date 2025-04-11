import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { AiOutlineShoppingCart, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import productdetails1 from '../assets/productdetails1.svg';
import productdetails2 from '../assets/productdetails2.svg';
import ProductItem from '../components/ProductItem';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const ProductDetails = ({ language = 'en' }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const context = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Product Details');
  const [user, setUser] = useState(null);
  const [loadingSuggestedRedirect, setLoadingSuggestedRedirect] = useState(false);

  const translations = {
    en: {
      categories: 'Categories',
      productNotFound: 'Product not found',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      notReturnable: 'This product is not returned or replaced',
      inclusiveOfVAT: 'Inclusive of VAT',
      qty: 'Qty',
      addToCart: 'ADD TO CART',
      stock: 'Stock',
      outOfStock: 'Out of Stock',
      productSold: 'Product Sold',
      productDetails: 'Product Details',
      productDescription: 'Product Description',
      reviews: 'Reviews',
      genuine: '100% Genuine',
      cashOnDelivery: 'Cash on Delivery',
      rateThisProduct: 'Rate this product:',
      writeReview: 'Write your review...',
      submitReview: 'Submit Review',
      noReviews: 'No reviews yet. Be the first to review this product!',
      addReview: 'Add Review',
      suggestedProducts: 'Suggested Products',
      by: 'By',
      on: 'on',
      Barley: 'Barley',
      Corn: 'Corn',
      Soya: 'Soya',
      Wheat: 'Wheat',
      currency: 'SAR',
      addedToCart: 'Added to cart successfully!',
      addedToFavorites: 'Added to favorites!',
      removedFromFavorites: 'Removed from favorites!',
      reviewSubmitted: 'Review submitted successfully!',
    },
    ar: {
      categories: 'الفئات',
      productNotFound: 'المنتج غير موجود',
      addToFavorites: 'أضف إلى المفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      notReturnable: 'هذا المنتج لا يمكن إرجاعه أو استبداله',
      inclusiveOfVAT: 'شامل ضريبة القيمة المضافة',
      qty: 'الكمية',
      addToCart: 'أضف إلى السلة',
      stock: 'المخزون',
      outOfStock: 'نفدت الكمية',
      productSold: 'المنتج المباع',
      productDetails: 'تفاصيل المنتج',
      productDescription: 'وصف المنتج',
      reviews: 'التقييمات',
      genuine: 'أصلي 100%',
      cashOnDelivery: 'الدفع عند الاستلام',
      rateThisProduct: 'قيم هذا المنتج:',
      writeReview: 'اكتب تقييمك...',
      submitReview: 'إرسال التقييم',
      noReviews: 'لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج!',
      addReview: 'إضافة تقييم',
      suggestedProducts: 'المنتجات المقترحة',
      by: 'بواسطة',
      on: 'في',
      Barley: 'شعير',
      Corn: 'ذرة',
      Soya: 'صويا',
      Wheat: 'قمح',
      currency: 'ريال',
      addedToCart: 'تمت الإضافة إلى السلة بنجاح!',
      addedToFavorites: 'تمت الإضافة إلى المفضلة!',
      removedFromFavorites: 'تمت الإزالة من المفضلة!',
      reviewSubmitted: 'تم إرسال التقييم بنجاح!',
    },
  };

  if (!context) {
    console.error('ProductDetails must be used within a ShopContextProvider');
    return (
      <div>
        {language === 'ar' ? 'خطأ: لم يتم العثور على ShopContext' : 'Error: ShopContext not found'}
      </div>
    );
  }

  const { products, favorites, addToFavorites, removeFromFavorites, addToCart } = context;
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === productId);
    setProduct(foundProduct || null);
    if (foundProduct) {
      const related = products
        .filter((p) => p.category.en === foundProduct.category.en && p._id !== foundProduct._id)
        .slice(0, 5);
      setSuggestedProducts(related);
    }
  }, [productId, products]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, 'products', productId, 'reviews');
        const q = query(reviewsRef);
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [productId]);

  if (!product) {
    return <div className="p-4">{translations[language].productNotFound}</div>;
  }

  const isFavorited = favorites.includes(productId);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleQuantityInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(1);
    }
  };

  const handleFavoriteToggle = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isFavorited) {
      removeFromFavorites(productId);
      toast.info(translations[language].removedFromFavorites, {
        style: { direction: language === 'ar' ? 'rtl' : 'ltr' },
      });
    } else {
      addToFavorites(productId);
      toast.success(translations[language].addedToFavorites, {
        style: { direction: language === 'ar' ? 'rtl' : 'ltr' },
      });
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
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
    for (let i = 0; i < quantity; i++) {
      addToCart(productId);
    }
    toast.success(translations[language].addedToCart, {
      style: { direction: language === 'ar' ? 'rtl' : 'ltr' },
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (reviewText.trim() && reviewRating > 0) {
      try {
        const reviewData = {
          text: reviewText,
          rating: reviewRating,
          userName: user ? (user.displayName || user.email || 'Anonymous') : 'Anonymous',
          timestamp: Date.now(),
        };
        const reviewsRef = collection(db, 'products', productId, 'reviews');
        const docRef = await addDoc(reviewsRef, reviewData);
        setReviews((prev) => [...prev, { id: docRef.id, ...reviewData }]);
        setReviewText('');
        setReviewRating(0);
        setShowReviewForm(false);
        toast.success(translations[language].reviewSubmitted, {
          style: { direction: language === 'ar' ? 'rtl' : 'ltr' },
        });
      } catch (error) {
        console.error('Error submitting review:', error.message);
      }
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowReviewForm(false);
  };

  const handleStarClick = (rating) => {
    setReviewRating(rating);
  };

  const handleSuggestedProductClick = (id) => {
    setLoadingSuggestedRedirect(true);
    setTimeout(() => {
      navigate(`/product-details/${id}`);
    }, 1000);
  };

  const name = language === 'ar' ? product.name.ar : product.name.en;
  const description = language === 'ar' ? product.description.ar : product.description.en;
  const category = language === 'ar' ? product.category.ar : product.category.en;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageTransition = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      {loadingSuggestedRedirect ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
        </div>
      ) : (
        <motion.div
          className={`p-4 max-w-6xl mx-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div className="text-gray-500 text-sm mb-4" variants={fadeIn}>
            <span>{translations[language].categories}</span> {'>'}{' '}
            <span>{category}</span> {'>'}{' '}
            <span>{name}</span>
          </motion.div>

          <motion.div className="flex flex-col md:flex-row gap-8" variants={fadeIn}>
            <div className="flex flex-col gap-4 md:w-1/3">
              <motion.img
                key={currentImageIndex}
                src={product.image[currentImageIndex]}
                alt={name}
                className="w-full h-96 object-contain rounded-lg"
                initial="hidden"
                animate="visible"
                variants={imageTransition}
              />
              <div className="flex gap-2">
                {product.image.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`${name} Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-contain rounded-md border border-gray-200 ${
                      index === currentImageIndex ? 'border-2 border-[#78B833]' : ''
                    } cursor-pointer`}
                    onClick={() => handleThumbnailClick(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>

            <motion.div className="flex-1" variants={fadeIn}>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{name}</h1>
                <span className="text-yellow-400 text-xl">★ {product.stars}</span>
                <motion.button
                  onClick={handleFavoriteToggle}
                  className={`text-2xl ${language === 'ar' ? 'mr-4' : 'ml-4'}`}
                  aria-label={
                    isFavorited
                      ? translations[language].removeFromFavorites
                      : translations[language].addToFavorites
                  }
                  disabled={!user}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  {isFavorited ? (
                    <AiFillHeart className={`cursor-pointer ${user ? 'text-[#78B833]' : 'text-gray-300'}`} />
                  ) : (
                    <AiOutlineHeart
                      className={`cursor-pointer ${user ? 'text-gray-400 hover:text-[#78B833]' : 'text-gray-300'}`}
                    />
                  )}
                </motion.button>
              </div>

              <p className="text-gray-600 mt-2 text-left">{description}</p>

              <div className="bg-yellow-50 text-yellow-600 p-2 rounded-md mt-4 text-sm">
                {translations[language].notReturnable}
              </div>

              <p className="text-2xl font-bold text-gray-900 mt-4">
                {product.price} {translations[language].currency}
                <span className="text-sm font-normal text-gray-500">
                  {' '}
                  ({translations[language].inclusiveOfVAT})
                </span>
              </p>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-gray-700">{translations[language].qty}</span>
                <div className="flex items-center bg-orange-200 rounded-full">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className={`w-6 h-6 bg-white text-orange-600 text-md rounded-full items-center justify-center ${
                      language === 'ar' ? 'mr-2' : 'ml-2'
                    } my-1 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityInputChange}
                    className="w-12 text-center border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="1"
                  />
                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className={`w-6 h-6 bg-white text-orange-600 text-md rounded-full items-center justify-center ${
                      language === 'ar' ? 'ml-2' : 'mr-2'
                    } my-1 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <motion.button
                onClick={handleAddToCart}
                className={`mt-4 w-full primary text-white py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer ${
                  !product.inStock ? 'bg-gray-300 cursor-not-allowed' : ''
                }`}
                disabled={!product.inStock}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AiOutlineShoppingCart className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                {translations[language].addToCart}
              </motion.button>

              <div className="flex items-center gap-4 mt-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <HiMiniShoppingCart />
                  <span>{translations[language].stock}</span>
                  <span className="font-semibold">
                    {product.inStock ? product.size * 400 : translations[language].outOfStock}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-[#78B833]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{translations[language].productSold}</span>
                  <span className="font-semibold">{product._id === '1' ? 745154 : 0}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="mt-8" variants={fadeIn}>
            <div className="flex gap-6 border-b border-gray-200">
              <motion.button
                className={`pb-2 text-gray-700 cursor-pointer ${
                  activeTab === 'Product Details' ? 'border-b-2 border-[#78B833]' : ''
                }`}
                onClick={() => handleTabChange('Product Details')}
                whileHover={{ scale: 1.05 }}
              >
                {translations[language].productDetails}
              </motion.button>
              <motion.button
                className={`pb-2 text-gray-700 cursor-pointer ${
                  activeTab === 'Product Description' ? 'border-b-2 border-[#78B833]' : ''
                }`}
                onClick={() => handleTabChange('Product Description')}
                whileHover={{ scale: 1.05 }}
              >
                {translations[language].productDescription}
              </motion.button>
              <motion.button
                className={`pb-2 text-gray-700 cursor-pointer ${
                  activeTab === 'Reviews' ? 'border-b-2 border-[#78B833]' : ''
                }`}
                onClick={() => handleTabChange('Reviews')}
                whileHover={{ scale: 1.05 }}
              >
                {translations[language].reviews} ({reviews.length})
              </motion.button>
            </div>
            <div className="mt-4">
              {activeTab === 'Product Details' && (
                <motion.div
                  className="flex flex-col md:flex-row md:gap-30 lg:gap-40 sm:gap-20"
                  variants={fadeIn}
                >
                  <div className="flex flex-row gap-5 justify-center items-center">
                    <img className="w-15 h-15" src={productdetails1} alt="productdetails1" />
                    <p className="text-black font-semibold">{translations[language].genuine}</p>
                  </div>
                  <div className="flex flex-row gap-5 justify-center items-center">
                    <img className="w-15 h-15" src={productdetails2} alt="productdetails2" />
                    <p className="text-black font-semibold">{translations[language].cashOnDelivery}</p>
                  </div>
                </motion.div>
              )}
              {activeTab === 'Product Description' && (
                <motion.div className="text-gray-600" variants={fadeIn}>
                  <p>{description}</p>
                </motion.div>
              )}
              {activeTab === 'Reviews' && (
                <motion.div variants={fadeIn}>
                  {showReviewForm ? (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">{translations[language].rateThisProduct}</span>
                        <div className="flex cursor-pointer">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              onClick={() => handleStarClick(star)}
                              className={`text-2xl cursor-pointer ${
                                star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              disabled={!user}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              ★
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder={translations[language].writeReview}
                        rows="4"
                        disabled={!user}
                      />
                      <motion.button
                        type="submit"
                        className={`py-2 px-4 rounded-md cursor-pointer ${
                          user ? 'bg-[#78B833] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={reviewRating === 0 || !user}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {translations[language].submitReview}
                      </motion.button>
                    </form>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{translations[language].reviews}</h3>
                      {reviews.length === 0 ? (
                        <p className="text-gray-600">{translations[language].noReviews}</p>
                      ) : (
                        reviews.map((review) => (
                          <motion.div
                            key={review.id}
                            className="mb-4 p-2 border rounded-md"
                            variants={fadeIn}
                          >
                            <p className="text-gray-700">{review.text}</p>
                            <div className="text-yellow-400">
                              {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {translations[language].by} {review.userName} {translations[language].on}{' '}
                              {new Date(review.timestamp).toLocaleDateString()}
                            </p>
                          </motion.div>
                        ))
                      )}
                      <motion.button
                        onClick={() => {
                          if (!user) {
                            navigate('/login');
                            return;
                          }
                          setShowReviewForm(true);
                        }}
                        className={`mt-2 py-2 px-4 rounded-md cursor-pointer ${
                          user ? 'primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!user}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {translations[language].addReview}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {suggestedProducts.length > 0 && (
            <motion.div className="mt-12" variants={fadeIn}>
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {translations[language].suggestedProducts}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {suggestedProducts.map((suggestedProduct) => (
                  <motion.div key={suggestedProduct._id} variants={fadeIn}>
                    <ProductItem
                      id={suggestedProduct._id}
                      name_en={suggestedProduct.name.en}
                      name_ar={suggestedProduct.name.ar}
                      image={suggestedProduct.image}
                      price={suggestedProduct.price}
                      stars={suggestedProduct.stars}
                      inStock={suggestedProduct.inStock}
                      language={language}
                      onClick={() => handleSuggestedProductClick(suggestedProduct._id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ProductDetails;
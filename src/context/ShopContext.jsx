import React, { createContext, useState, useEffect } from "react";
import { products as initialProducts } from "../assets/assets";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "SAR";
  const delivery_fee = 10;

  // Add translated fields and ensure other fields are consistent
  const updatedProducts = initialProducts.map((product) => ({
    ...product,
    name: {
      en: product.name_en || 'Unnamed Product',
      ar: product.name_ar || 'منتج غير مسمى',
    },
    category: {
      en: product.category || 'Unknown',
      ar: product.category === 'Barley' ? 'شعير' : 
          product.category === 'Corn' ? 'ذرة' : 
          product.category === 'Soya' ? 'صويا' : 
          product.category === 'Wheat' ? 'قمح' : 
          product.category || 'غير معروف',
    },
    description: {
      en: product.description_en || 'No description available.',
      ar: product.description_ar || 'لا يوجد وصف متاح.',
    },
    image: Array.isArray(product.image) ? product.image : [product.image],
    inStock: product.inStock !== undefined ? product.inStock : true,
    productType: product.productType || 'Whole',
    size: product.size || 40,
    arrivalDate: product.arrivalDate || '2025-03-01',
    isDiscounted: product.isDiscounted !== undefined ? product.isDiscounted : false,
  }));

  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);

  // Listen for authentication state changes and fetch user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser.uid);
      } else {
        setFavorites([]);
        setCartItems({});
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user data (favorites and cartItems) from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFavorites(userData.favorites || []);
        setCartItems(userData.cartItems || {});
      } else {
        await setDoc(userDocRef, { favorites: [], cartItems: {} });
        setFavorites([]);
        setCartItems({});
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  // Save user data (favorites and cartItems) to Firestore
  const saveUserData = async (newFavorites, newCartItems) => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { favorites: newFavorites, cartItems: newCartItems }, { merge: true });
      } catch (error) {
        console.error('Error saving user data:', error.message);
      }
    }
  };

  const addToFavorites = (productId) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) return prev;
      const newFavorites = [...prev, productId];
      saveUserData(newFavorites, cartItems);
      return newFavorites;
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== productId);
      saveUserData(newFavorites, cartItems);
      return newFavorites;
    });
  };

  const addToCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      };
      saveUserData(favorites, updatedCart);
      console.log('Updated cart:', updatedCart); // Debug log
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId];
      }
      saveUserData(favorites, updatedCart);
      return updatedCart;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  const value = {
    products: updatedProducts,
    currency,
    delivery_fee,
    favorites,
    addToFavorites,
    removeFromFavorites,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
  };

  console.log("ShopContext products:", updatedProducts);
  console.log("ShopContext favorites:", favorites);
  console.log("ShopContext cartItems:", cartItems);

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
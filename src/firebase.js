import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq73IcEYtVahyF1DxvYGyNvw_k8O0PZo0",
  authDomain: "united-feeds.firebaseapp.com",
  projectId: "united-feeds",
  storageBucket: "united-feeds.firebasestorage.app",
  messagingSenderId: "314385939594",
  appId: "1:314385939594:web:dab03b1849ca6cc0014173",
  measurementId: "G-63MP0MEPEC"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app); // Initialize analytics (not used but kept for completeness)

// Export authentication methods and providers
export const setUpRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: 'invisible',
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber
    },
  });
};

export const phoneLogin = async (phoneNumber, appVerifier) => {
  return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export const verifyOtp = async (confirmationResult, otp) => {
  return await confirmationResult.confirm(otp);
};

export const emailLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const emailSignup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const socialLogin = async (provider) => {
    let authProvider;
    switch (provider) {
      case 'Google':
        authProvider = new GoogleAuthProvider();
        break;
      case 'Apple':
        console.warn('AppleAuthProvider not supported in this configuration. Skipping.');
        throw new Error('Apple sign-in not configured');
      case 'Twitter':
        authProvider = new TwitterAuthProvider();
        break;
      default:
        throw new Error('Unsupported provider');
    }
    return await signInWithPopup(auth, authProvider);
  };

export { auth }; // Export auth instance for persistence or other uses
export const db = getFirestore(app); // Export Firestore instance
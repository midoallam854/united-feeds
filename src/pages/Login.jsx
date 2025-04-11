import React, { useState } from 'react';
import { auth, setUpRecaptcha, phoneLogin, verifyOtp, emailLogin, socialLogin } from '../firebase';
import { useNavigate } from 'react-router-dom';
import loginBG from "../assets/loginBG.png";
import google from "../assets/google.svg";
import x from "../assets/x.svg";
import apple from "../assets/apple.svg";
import { IoCallOutline } from "react-icons/io5";

// Define test phone numbers (add the ones you registered in Firebase Console)
const TEST_PHONE_NUMBERS = new Set(['+15555550100', '+15555550200']); // Example test numbers

const Login = ({ language = 'en' }) => {
  const [loginMethod, setLoginMethod] = useState('Phone'); // 'Phone' or 'Email'
  const [phoneNumber, setPhoneNumber] = useState('+966'); // Default country code
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Translations for Arabic and English
  const translations = {
    en: {
      signIn: 'Sign In',
      phone: 'Phone',
      email: 'Email',
      enterPhoneNumber: 'Enter phone number (e.g., +15555550100 for test)',
      enterOtp: 'Enter OTP (e.g., 123456 for test)',
      sendingOtp: 'Sending OTP...',
      signInButton: 'Sign In',
      verifying: 'Verifying...',
      verifyOtp: 'Verify OTP',
      enterEmail: 'Enter email',
      enterPassword: 'Enter password',
      signingIn: 'Signing in...',
      keepSignedIn: 'Keep me signed in',
      orSignInWith: 'Or sign in with',
      signInWithGoogle: 'Sign in with Google',
      signInWithApple: 'Sign in with Apple',
      signInWithX: 'Sign in with X',
      createNewAccount: 'Create New Account',
      forgotPassword: 'Forgot Password',
      testPhoneError: 'Using test phone number. Enter the test code (e.g., 123456).',
      invalidOtp: 'Invalid OTP. Please try again.',
      invalidEmailOrPassword: 'Invalid email or password. Please try again.',
      billingNotEnabled: 'Phone authentication requires a billing account. Use a test phone number (e.g., +15555550100) for development.',
    },
    ar: {
      signIn: 'تسجيل الدخول',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      enterPhoneNumber: 'أدخل رقم الهاتف (مثال: +15555550100 للاختبار)',
      enterOtp: 'أدخل رمز التحقق (مثال: 123456 للاختبار)',
      sendingOtp: 'جاري إرسال رمز التحقق...',
      signInButton: 'تسجيل الدخول',
      verifying: 'جاري التحقق...',
      verifyOtp: 'تحقق من رمز التحقق',
      enterEmail: 'أدخل البريد الإلكتروني',
      enterPassword: 'أدخل كلمة المرور',
      signingIn: 'جاري تسجيل الدخول...',
      keepSignedIn: 'أبقني مسجلاً',
      orSignInWith: 'أو تسجيل الدخول باستخدام',
      signInWithGoogle: 'تسجيل الدخول باستخدام جوجل',
      signInWithApple: 'تسجيل الدخول باستخدام أبل',
      signInWithX: 'تسجيل الدخول باستخدام إكس',
      createNewAccount: 'إنشاء حساب جديد',
      forgotPassword: 'نسيت كلمة المرور',
      testPhoneError: 'استخدام رقم هاتف اختباري. أدخل رمز الاختبار (مثال: 123456).',
      invalidOtp: 'رمز التحقق غير صحيح. حاول مرة أخرى.',
      invalidEmailOrPassword: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.',
      billingNotEnabled: 'تسجيل الدخول عبر الهاتف يتطلب حساب فوترة. استخدم رقم هاتف اختباري (مثال: +15555550100) للتطوير.',
    },
  };

  // Handle phone login - Send OTP
  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if the phone number is a test number
      if (TEST_PHONE_NUMBERS.has(phoneNumber)) {
        setShowOtpInput(true); // Skip real SMS, prompt for test OTP
        setError(translations[language].testPhoneError);
      } else {
        setUpRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const result = await phoneLogin(phoneNumber, appVerifier);
        setConfirmationResult(result);
        setShowOtpInput(true);
      }
    } catch (err) {
      setError(err.message === 'Firebase: Error (auth/billing-not-enabled)' 
        ? translations[language].billingNotEnabled 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP for phone login
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (TEST_PHONE_NUMBERS.has(phoneNumber) && otp === '123456') { // Match test code
        // Simulate successful verification for test numbers
        if (keepSignedIn) {
          auth.setPersistence('local');
        } else {
          auth.setPersistence('session');
        }
        navigate('/');
      } else {
        await verifyOtp(confirmationResult, otp);
        if (keepSignedIn) {
          auth.setPersistence('local');
        } else {
          auth.setPersistence('session');
        }
        navigate('/'); // Redirect after successful login
      }
    } catch (err) {
      setError(translations[language].invalidOtp);
    } finally {
      setLoading(false);
    }
  };

  // Handle email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await emailLogin(email, password);
      if (keepSignedIn) {
        auth.setPersistence('local');
      } else {
        auth.setPersistence('session');
      }
      navigate('/'); // Redirect after successful login
    } catch (err) {
      setError(translations[language].invalidEmailOrPassword);
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);

    try {
      await socialLogin(provider);
      if (keepSignedIn) {
        auth.setPersistence('local');
      } else {
        auth.setPersistence('session');
      }
      navigate('/'); // Redirect after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden">
      <div className="absolute inset-0 bg-overlay" /> {/* Dark overlay for readability */}
      <div className={`p-6 rounded-lg w-full max-w-md z-10 fade-in ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Title */}
        <h2 className="text-3xl font-medium text-center mb-6 text-white">
          {translations[language].signIn}
        </h2>

        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 rounded-tl-lg cursor-pointer font-medium transition-all duration-200 ${
              loginMethod === 'Phone' ? 'primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => {
              setLoginMethod('Phone');
              setShowOtpInput(false); // Reset OTP input when switching
            }}
          >
            {translations[language].phone}
          </button>
          <button
            className={`flex-1 py-2 rounded-tr-lg cursor-pointer font-medium transition-all duration-200 ${
              loginMethod === 'Email' ? 'primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => {
              setLoginMethod('Email');
              setShowOtpInput(false); // Reset OTP input when switching
            }}
          >
            {translations[language].email}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Phone Login Form */}
        {loginMethod === 'Phone' && !showOtpInput && (
          <form onSubmit={handlePhoneLogin}>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-gray-100 h-12">
                <span className="p-1 text-gray-500"><IoCallOutline size={20} /></span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#78B833] h-12 text-gray-800"
                  placeholder={translations[language].enterPhoneNumber}
                  required
                />
              </div>
            </div>
            <div id="recaptcha-container" className="mb-4"></div>
            <button
              type="submit"
              className="w-full primary text-white py-3 rounded-lg mb-2 font-medium transition-all duration-200 hover:bg-[#78B833]/90"
              disabled={loading}
            >
              {loading ? translations[language].sendingOtp : translations[language].signInButton}
            </button>
          </form>
        )}

        {/* OTP Verification Form */}
        {loginMethod === 'Phone' && showOtpInput && (
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#78B833]"
                placeholder={translations[language].enterOtp}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full primary text-white py-3 rounded-lg mb-2 font-medium transition-all duration-200 hover:bg-[#78B833]/90"
              disabled={loading}
            >
              {loading ? translations[language].verifying : translations[language].verifyOtp}
            </button>
          </form>
        )}

        {/* Email Login Form */}
        {loginMethod === 'Email' && (
          <form onSubmit={handleEmailLogin}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] bg-gray-100 text-gray-800"
                placeholder={translations[language].enterEmail}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] bg-gray-100 text-gray-800"
                placeholder={translations[language].enterPassword}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full primary text-white py-3 rounded-lg mb-2 font-medium transition-all duration-200 hover:bg-[#78B833]/90"
              disabled={loading}
            >
              {loading ? translations[language].signingIn : translations[language].signInButton}
            </button>
          </form>
        )}

        {/* Keep me signed in */}
        <div className="flex items-center justify-end mb-4">
          <input
            type="checkbox"
            checked={keepSignedIn}
            onChange={(e) => setKeepSignedIn(e.target.checked)}
            className="mr-1 w-4 h-4 rounded-sm cursor-pointer accent-[#78B833]"
          />
          <label className="text-gray-400 text-sm">&nbsp; {translations[language].keepSignedIn}</label>
        </div>

        {/* Social Login Options */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="px-7 text-gray-400 text-sm">{translations[language].orSignInWith}</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full bg-white text-gray-800 py-3 rounded-lg flex items-center justify-center cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100"
          >
            <img className="mr-3 w-5 h-5" src={google} alt="Google" />
            &nbsp;{translations[language].signInWithGoogle}
          </button>
          <button
            onClick={() => handleSocialLogin('Apple')}
            className="w-full bg-white text-gray-800 py-3 rounded-lg flex items-center justify-center cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100"
            disabled
          >
            <img className="mr-3 w-5 h-5" src={apple} alt="Apple" />
            &nbsp;{translations[language].signInWithApple}
          </button>
          <button
            onClick={() => handleSocialLogin('Twitter')}
            className="w-full bg-white text-gray-800 py-3 rounded-lg flex items-center justify-center cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100"
          >
            <img className="mr-3 w-5 h-5" src={x} alt="X" />
            &nbsp;{translations[language].signInWithX}
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <a href="/signup" className="hover:underline mb-2 block text-gray-400 text-sm">
            {translations[language].createNewAccount}
          </a>
          <a href="/forgot-password" className="text-gray-400 hover:underline text-sm">
            {translations[language].forgotPassword}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
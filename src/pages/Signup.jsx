import React, { useState } from 'react';
import { auth, emailSignup, socialLogin } from '../firebase';
import { useNavigate } from 'react-router-dom';
import loginBG from "../assets/loginBG.png";
import google from "../assets/google.svg";
import x from "../assets/x.svg";
import apple from "../assets/apple.svg";

const Signup = ({ language = 'en' }) => {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Translations for Arabic and English
  const translations = {
    en: {
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      rePassword: 'Re-Password',
      signUpButton: 'Sign Up',
      signingUp: 'Signing Up...',
      passwordsDoNotMatch: 'Passwords do not match.',
      signupFailed: 'Signup failed. Please try again.',
      orSignUpWith: 'Or sign up with',
      signUpWithGoogle: 'Sign up with Google',
      signUpWithApple: 'Sign up with Apple',
      signUpWithX: 'Sign up with X',
      alreadyHaveAccount: 'Already have an account? Sign In',
    },
    ar: {
      signUp: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      rePassword: 'تأكيد كلمة المرور',
      signUpButton: 'إنشاء حساب',
      signingUp: 'جاري إنشاء الحساب...',
      passwordsDoNotMatch: 'كلمات المرور غير متطابقة.',
      signupFailed: 'فشل إنشاء الحساب. حاول مرة أخرى.',
      orSignUpWith: 'أو إنشاء حساب باستخدام',
      signUpWithGoogle: 'إنشاء حساب باستخدام جوجل',
      signUpWithApple: 'إنشاء حساب باستخدام أبل',
      signUpWithX: 'إنشاء حساب باستخدام إكس',
      alreadyHaveAccount: 'لديك حساب بالفعل؟ تسجيل الدخول',
    },
  };

  // Handle email/password signup
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== rePassword) {
      setError(translations[language].passwordsDoNotMatch);
      setLoading(false);
      return;
    }

    try {
      await emailSignup(email, password);
      if (true) { // Replace with actual persistence logic if needed
        auth.setPersistence('local');
      } else {
        auth.setPersistence('session');
      }
      navigate('/dashboard'); // Redirect after successful signup
    } catch (err) {
      setError(translations[language].signupFailed);
      console.error('Signup error:', err.message, err.code);
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialSignup = async (provider) => {
    setError('');
    setLoading(true);

    try {
      await socialLogin(provider);
      if (true) { // Replace with actual persistence logic if needed
        auth.setPersistence('local');
      } else {
        auth.setPersistence('session');
      }
      navigate('/dashboard'); // Redirect after successful signup
    } catch (err) {
      setError(err.message);
      console.error('Social signup error:', err.message, err.code);
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
          {translations[language].signUp}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Email Signup Form */}
        <form onSubmit={handleEmailSignup}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] bg-gray-100 text-gray-800"
              placeholder={translations[language].email}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] bg-gray-100 text-gray-800"
              placeholder={translations[language].password}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] bg-gray-100 text-gray-800"
              placeholder={translations[language].rePassword}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full primary text-white py-3 rounded-lg mb-2 font-medium transition-all duration-200 hover:bg-[#78B833]/90"
            disabled={loading}
          >
            {loading ? translations[language].signingUp : translations[language].signUpButton}
          </button>
        </form>

        {/* Social Login Options */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="px-7 text-gray-400 text-sm">{translations[language].orSignUpWith}</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <button
            onClick={() => handleSocialSignup('Google')}
            className="w-full bg-white text-gray-800 py-3 rounded-lg flex items-center justify-center cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100"
          >
            <img className="mr-3 w-5 h-5" src={google} alt="Google" />
            &nbsp; {translations[language].signUpWithGoogle}
          </button>
          <button
            onClick={() => handleSocialSignup('Apple')}
            className="w-full bg-white text-gray-800 py-3 rounded-lg flex items-center justify-center cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100"
            disabled
          >
            <img className="mr-3 w-5 h-5" src={apple} alt="Apple" />
            &nbsp; {translations[language].signUpWithApple}
          </button>
          <button
            onClick={() => handleSocialSignup('Twitter')}
            className="w-full bg-white text-gray-800 py-3 rounded-lg flex items-center justify-center cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100"
          >
            <img className="mr-3 w-5 h-5" src={x} alt="X" />
            &nbsp; {translations[language].signUpWithX}
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <a href="/login" className="hover:underline mb-2 block text-gray-400 text-sm">
            {translations[language].alreadyHaveAccount}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
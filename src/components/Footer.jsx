import React from "react";
import Vector from "../assets/Vector.svg";
import Email from "../assets/Email.svg";
import Call from "../assets/Call.svg";
import facebooklogo from "../assets/facebooklogo.svg";
import intstagramlogo from "../assets/instagramlogo.svg";
import linkedinlogo from "../assets/linkedinlogo.svg";
import snapchatlogo from "../assets/snapchatlogo.svg";
import xlogo from "../assets/xlogo.svg";
import youtubelogo from "../assets/youtubelogo.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import AppStore from "../assets/AppStore.svg";
import visa from "../assets/visa.svg";
import tamara from "../assets/tamara.svg";
import mada from "../assets/mada.svg";
import ApplePay from "../assets/ApplePay.svg";
import mastercard from "../assets/mastercard.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Translation dictionaries
  const translations = {
    en: {
      needHelp: "Do you need help?",
      helpOptions: "You can get help by choosing from any of these options",
      askUs: "Ask Us",
      emailUs: "Email Us",
      callUs: "Call Us",
      topCategories: "Top Categories",
      barley: "Barley",
      corn: "Corn",
      soya: "Soya",
      wheat: "Wheat",
      home: "Home",
      aboutUs: "About Us",
      usagePolicy: "Usage Policy",
      privacyPolicy: "Privacy Policy",
      returnExchangePolicy: "Return & Exchange Policy",
      station: "Station",
      contactUs: "Contact Us",
      account: "Account",
      profile: "Profile",
      orders: "Orders",
      favorites: "Favorites",
      downloadApp: "Download Our App",
      paymentMethods: "Payment Methods",
      copyright: "©2023 UnitedFeeds. All rights reserved",
      subscribeNewsletter: "Subscribe To Our Newsletter",
      emailPlaceholder: "Enter your email address",
      subscribe: "Subscribe",
    },
    ar: {
      needHelp: "هل تحتاج إلى مساعدة؟",
      helpOptions: "يمكنك الحصول على المساعدة عن طريق اختيار أي من هذه الخيارات",
      askUs: "اسألنا",
      emailUs: "راسلنا عبر البريد الإلكتروني",
      callUs: "اتصل بنا",
      topCategories: "أفضل الفئات",
      barley: "شعير",
      corn: "ذرة",
      soya: "صويا",
      wheat: "قمح",
      home: "الرئيسية",
      aboutUs: "معلومات عنا",
      usagePolicy: "سياسة الاستخدام",
      privacyPolicy: "سياسة الخصوصية",
      returnExchangePolicy: "سياسة الإرجاع والاستبدال",
      station: "محطة",
      contactUs: "تواصل معنا",
      account: "الحساب",
      profile: "الملف الشخصي",
      orders: "الطلبات",
      favorites: "المفضلة",
      downloadApp: "قم بتنزيل تطبيقنا",
      paymentMethods: "طرق الدفع",
      copyright: "©2023 يونايتد فييدز. جميع الحقوق محفوظة",
      subscribeNewsletter: "اشترك في نشرتنا الإخبارية",
      emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
      subscribe: "اشترك",
    },
  };

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate(path, { replace: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="w-full primary py-4 md:py-6 md:px-20">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center">
          <div className="w-full md:w-1/6 px-4 md:px-0">
            <p className="text-white text-sm font-medium mb-1">
              {translations[language].needHelp}
            </p>
            <p className="text-gray-200 text-xs font-light leading-relaxed">
              {translations[language].helpOptions}
            </p>
          </div>

          <div className="flex items-center w-full md:w-1/5 gap-3 px-4 md:px-0">
            <div className="rounded-full p-2 flex-shrink-0">
              <a href="">
                <img src={Vector} alt="Ask Us" className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-300">{translations[language].askUs}</p>
              <a href="" className="text-sm text-white">
                help.ufc.com
              </a>
            </div>
          </div>

          <div className="flex items-center w-full md:w-1/5 gap-3 px-4 md:px-0">
            <div className="rounded-full p-2 flex-shrink-0">
              <a href="mailto:INFO@ufc.com.sa">
                <img src={Email} alt="Email Us" className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-300">{translations[language].emailUs}</p>
              <a href="mailto:INFO@ufc.com.sa" className="text-sm text-white">
                INFO@ufc.com.sa
              </a>
            </div>
          </div>

          <div className="flex items-center w-full md:w-1/5 gap-3 px-4 md:px-0">
            <div className="rounded-full p-2 flex-shrink-0">
              <a href="tel:+920006839">
                <img src={Call} alt="Call Us" className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-300">{translations[language].callUs}</p>
              <a href="tel:+920006839" className="text-sm text-white">
                +920 006 839
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 pt-4 md:px-8 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-12">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl text-gray-700">{translations[language].topCategories}</h1>
            <div className="flex flex-col gap-1">
              <p
                onClick={() => handleNavigation("/product/1")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].barley}
              </p>
              <p
                onClick={() => handleNavigation("/product/2")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].corn}
              </p>
              <p
                onClick={() => handleNavigation("/product/3")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].soya}
              </p>
              <p
                onClick={() => handleNavigation("/product/4")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].wheat}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl text-gray-700">{translations[language].home}</h1>
            <div className="flex flex-col gap-1">
              <p
                onClick={() => handleNavigation("/about")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].aboutUs}
              </p>
              <p
                onClick={() => handleNavigation("/usage-policy")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].usagePolicy}
              </p>
              <p
                onClick={() => handleNavigation("/privacy-policy")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].privacyPolicy}
              </p>
              <p
                onClick={() => handleNavigation("/returns-exchange")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].returnExchangePolicy}
              </p>
              <p
                onClick={() => handleNavigation("/shop")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].station}
              </p>
              <p
                onClick={() => handleNavigation("/contact")}
                className="text-base text-gray-500 cursor-pointer"
              >
                {translations[language].contactUs}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl text-gray-700">{translations[language].account}</h1>
            <div className="flex flex-col gap-1">
             <a href="/profile"> <p className="text-base text-gray-500 cursor-pointer">{translations[language].profile}</p> </a>
              <a href="/cart"><p className="text-base text-gray-500 cursor-pointer">{translations[language].orders}</p></a>
             <a href="/favorites"><p className="text-base text-gray-500 cursor-pointer">{translations[language].favorites}</p></a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl text-gray-700">{translations[language].contactUs}</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <a
                  href="https://x.com/unitedfeedsa?s=11"
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={xlogo} alt="X" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={facebooklogo} alt="Facebook" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/"
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={youtubelogo} alt="YouTube" className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-row gap-2">
                <a
                  href="https://www.snapchat.com/add/unitedfeed_sa"
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={snapchatlogo} alt="Snapchat" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/unitedfeedsa/"
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={intstagramlogo} alt="Instagram" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/unitedfeed/"
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={linkedinlogo} alt="LinkedIn" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl text-gray-700">{translations[language].downloadApp}</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <a href="https://apps.apple.com/us/app/united-feeds">
                <img src={AppStore} alt="App Store" className="w-28" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=sa.com.ufc.mobile">
                <img src={GooglePlay} alt="Google Play" className="w-28" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-lg text-gray-700">{translations[language].paymentMethods}</h1>
            <div className="flex flex-wrap gap-2">
              <img src={visa} alt="Visa" className="h-7" />
              <img src={mada} alt="Mada" className="h-7" />
              <img src={tamara} alt="Tamara" className="h-7" />
              <img src={mastercard} alt="Mastercard" className="h-7" />
              <img src={ApplePay} alt="Apple Pay" className="h-7" />
            </div>
            <p className="text-sm text-gray-500">{translations[language].copyright}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-lg text-gray-700">{translations[language].subscribeNewsletter}</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="rounded-full px-4 py-2 w-full sm:w-80 border border-gray-300"
                type="text"
                placeholder={translations[language].emailPlaceholder}
              />
              <button className="primary text-white rounded-full px-4 py-2 cursor-pointer">
                {translations[language].subscribe}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
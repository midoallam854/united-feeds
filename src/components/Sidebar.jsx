import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import FilterSection from './FilterSection';

const Sidebar = ({
  productTypeFilters,
  handleProductTypeChange,
  sizeFilters,
  handleSizeChange,
  priceFilters,
  handlePriceChange,
  arrivalFilters,
  handleArrivalChange,
  specialOfferFilters,
  handleSpecialOfferChange,
  productType,
  size,
  price,
  newArrivals,
  specialOffers,
  language = 'en',
}) => {
  const navigate = useNavigate(); // Hook for navigation

  // Translation dictionaries
  const translations = {
    en: {
      categoriesAll: 'Categories / All',
      ourProducts: 'Our Products',
      productType: 'Product Type',
      size: 'Size',
      price: 'Price',
      newArrivals: 'New Arrivals',
      specialOffers: 'Special Offers',
      whole: 'Whole',
      loose: 'Loose',
      thisWeek: 'This week',
      lastWeek: 'Last week',
      thisMonth: 'This month',
      discountedOnly: 'Discounted Only',
      kg: 'Kg', // Unit translation
    },
    ar: {
      categoriesAll: 'الفئات / الكل',
      ourProducts: 'منتجاتنا',
      productType: 'نوع المنتج',
      size: 'الحجم',
      price: 'السعر',
      newArrivals: 'الوافدون الجدد',
      specialOffers: 'العروض الخاصة',
      whole: 'كامل',
      loose: 'سائب',
      thisWeek: 'هذا الأسبوع',
      lastWeek: 'الأسبوع الماضي',
      thisMonth: 'هذا الشهر',
      discountedOnly: 'الخصم فقط',
      kg: 'كجم', // Unit translation
    },
  };

  // Filter options with translations
  const productTypeOptions = [
    { en: 'Whole', ar: translations.ar.whole, key: 'Whole' },
    { en: 'Loose', ar: translations.ar.loose, key: 'Loose' },
  ];

  const sizeOptions = [
    { en: `40 ${translations.en.kg}`, ar: `40 ${translations.ar.kg}`, key: '40 Kg' },
    { en: `50 ${translations.en.kg}`, ar: `50 ${translations.ar.kg}`, key: '50 Kg' },
    { en: `60 ${translations.en.kg}`, ar: `60 ${translations.ar.kg}`, key: '60 Kg' },
    { en: `100 ${translations.en.kg}`, ar: `100 ${translations.ar.kg}`, key: '100 Kg' },
  ];

  const priceOptions = [
    { en: 'Under 100 SAR', ar: 'أقل من 100 ريال', key: 'Under 100 SAR' },
    { en: '100 SAR to 150 SAR', ar: 'من 100 إلى 150 ريال', key: '100 SAR to 150 SAR' },
    { en: '150 SAR to 200 SAR', ar: 'من 150 إلى 200 ريال', key: '150 SAR to 200 SAR' },
    { en: '200 SAR to 300 SAR', ar: 'من 200 إلى 300 ريال', key: '200 SAR to 300 SAR' },
    { en: '300 SAR to 500 SAR', ar: 'من 300 إلى 500 ريال', key: '300 SAR to 500 SAR' },
    { en: '500 SAR to 1000 SAR', ar: 'من 500 إلى 1000 ريال', key: '500 SAR to 1000 SAR' },
  ];

  const arrivalOptions = [
    { en: 'This week', ar: translations.ar.thisWeek, key: 'This week' },
    { en: 'Last week', ar: translations.ar.lastWeek, key: 'Last week' },
    { en: 'This month', ar: translations.ar.thisMonth, key: 'This month' },
  ];

  const specialOfferOptions = [
    { en: 'Discounted Only', ar: translations.ar.discountedOnly, key: 'Discounted Only' },
  ];

  return (
    <div
      className={`w-64 bg-white p-6 hidden md:block shadow-md transition-all duration-300 ${
        language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      {/* Breadcrumb */}
      <p
        className="text-gray-400 text-sm mb-6 font-medium hover:text-[#78B833] transition-colors duration-200 cursor-pointer"
        onClick={() => navigate('/products')} // Navigate to /products
      >
        {translations[language].categoriesAll}
      </p>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        {translations[language].ourProducts}
      </h2>

      {/* Filter Sections */}
      <div className="space-y-8">
        <FilterSection
          title={translations[language].productType}
          filters={productTypeFilters}
          onChange={handleProductTypeChange}
          icon={productType}
          options={productTypeOptions}
          language={language}
        />
        <FilterSection
          title={translations[language].size}
          filters={sizeFilters}
          onChange={handleSizeChange}
          icon={size}
          options={sizeOptions}
          language={language}
        />
        <FilterSection
          title={translations[language].price}
          filters={priceFilters}
          onChange={handlePriceChange}
          icon={price}
          options={priceOptions}
          language={language}
        />
        <FilterSection
          title={translations[language].newArrivals}
          filters={arrivalFilters}
          onChange={handleArrivalChange}
          icon={newArrivals}
          options={arrivalOptions}
          language={language}
        />
        <FilterSection
          title={translations[language].specialOffers}
          filters={specialOfferFilters}
          onChange={handleSpecialOfferChange}
          icon={specialOffers}
          options={specialOfferOptions}
          language={language}
        />
      </div>
    </div>
  );
};

export default Sidebar;
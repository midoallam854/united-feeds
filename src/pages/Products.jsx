import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Sidebar from '../components/Sidebar';
import FilterBar from '../components/FilterBar';
import productType from '../assets/productType.svg';
import price from '../assets/price.svg';
import size from '../assets/size.svg';
import newArrivals from '../assets/newArrivals.svg';
import specialOffers from '../assets/specialOffers.svg';
import { useLocation } from 'react-router-dom';

const Products = ({ language = 'en' }) => {
  const context = useContext(ShopContext);
  const location = useLocation();

  if (!context) {
    console.error('Products must be used within a ShopContextProvider');
    return (
      <div className="text-center text-red-600 p-4">
        {language === 'ar' ? 'خطأ: لم يتم العثور على ShopContext' : 'Error: ShopContext not found'}
      </div>
    );
  }

  const { products } = context;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [productTypeFilters, setProductTypeFilters] = useState({
    Whole: false,
    Loose: false,
  });
  const [sizeFilters, setSizeFilters] = useState({
    '40 Kg': false,
    '50 Kg': false,
    '60 Kg': false,
    '100 Kg': false,
  });
  const [priceFilters, setPriceFilters] = useState({
    'Under 100 SAR': false,
    '100 SAR to 150 SAR': false,
    '150 SAR to 200 SAR': false,
    '200 SAR to 300 SAR': false,
    '300 SAR to 500 SAR': false,
    '500 SAR to 1000 SAR': false,
  });
  const [arrivalFilters, setArrivalFilters] = useState({
    'This week': false,
    'Last week': false,
    'This month': false,
  });
  const [specialOfferFilters, setSpecialOfferFilters] = useState({
    'Discounted Only': false,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [suggestedOption, setSuggestedOption] = useState('Suggested');

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const translations = {
    en: {
      product: 'Product',
      products: 'Products',
      noProductsFound: 'No products found matching your criteria.',
      loading: 'Loading products...',
    },
    ar: {
      product: 'منتج',
      products: 'منتجات',
      noProductsFound: 'لم يتم العثور على منتجات تطابق معاييرك.',
      loading: 'جارٍ تحميل المنتجات...',
    },
  };

  const filters = [
    { en: 'ALL', ar: 'الكل' },
    { en: 'Barley', ar: 'شعير' },
    { en: 'Corn', ar: 'ذرة' },
    { en: 'Soya', ar: 'صويا' },
    { en: 'Wheat', ar: 'قمح' },
  ];

  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.name.ar.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter && activeFilter !== 'ALL') {
      filtered = filtered.filter((item) => item.category && item.category.en === activeFilter);
    }

    const selectedProductTypes = Object.keys(productTypeFilters).filter(
      (type) => productTypeFilters[type]
    );
    if (selectedProductTypes.length > 0) {
      filtered = filtered.filter((item) => selectedProductTypes.includes(item.productType));
    }

    const selectedSizes = Object.keys(sizeFilters).filter((size) => sizeFilters[size]);
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((item) => selectedSizes.includes(`${item.size} Kg`));
    }

    const selectedPriceRanges = Object.keys(priceFilters).filter((range) => priceFilters[range]);
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((item) => {
        const price = item.price;
        return selectedPriceRanges.some((range) => {
          if (range === 'Under 100 SAR') return price < 100;
          if (range === '100 SAR to 150 SAR') return price >= 100 && price <= 150;
          if (range === '150 SAR to 200 SAR') return price > 150 && price <= 200;
          if (range === '200 SAR to 300 SAR') return price > 200 && price <= 300;
          if (range === '300 SAR to 500 SAR') return price > 300 && price <= 500;
          if (range === '500 SAR to 1000 SAR') return price > 500 && price <= 1000;
          return false;
        });
      });
    }

    const selectedArrivals = Object.keys(arrivalFilters).filter((range) => arrivalFilters[range]);
    if (selectedArrivals.length > 0) {
      filtered = filtered.filter((item) => {
        const arrivalDate = new Date(item.arrivalDate);
        const currentDate = new Date('2025-04-07');
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = (currentDate - arrivalDate) / oneDay;

        return selectedArrivals.some((range) => {
          if (range === 'This week') return diffDays <= 7;
          if (range === 'Last week') return diffDays > 7 && diffDays <= 14;
          if (range === 'This month') return diffDays <= 30;
          return false;
        });
      });
    }

    const selectedSpecialOffers = Object.keys(specialOfferFilters).filter(
      (offer) => specialOfferFilters[offer]
    );
    if (selectedSpecialOffers.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSpecialOffers.some((offer) => {
          if (offer === 'Discounted Only') return item.isDiscounted;
          return false;
        })
      );
    }

    switch (suggestedOption) {
      case 'New Arrivals':
        filtered = filtered.sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate));
        break;
      case 'Price High to Low':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Price Low to High':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Discount':
        filtered = filtered.filter((item) => item.isDiscounted);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [
    activeFilter,
    productTypeFilters,
    sizeFilters,
    priceFilters,
    arrivalFilters,
    specialOfferFilters,
    suggestedOption,
    products,
    searchQuery,
  ]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleProductTypeChange = (type) => {
    setProductTypeFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSizeChange = (size) => {
    setSizeFilters((prev) => ({
      ...prev,
      [size]: !prev[size],
    }));
  };

  const handlePriceChange = (range) => {
    setPriceFilters((prev) => ({
      ...prev,
      [range]: !prev[range],
    }));
  };

  const handleArrivalChange = (range) => {
    setArrivalFilters((prev) => ({
      ...prev,
      [range]: !prev[range],
    }));
  };

  const handleSpecialOfferChange = (offer) => {
    setSpecialOfferFilters((prev) => ({
      ...prev,
      [offer]: !prev[offer],
    }));
  };

  const handleSuggestedChange = (option) => {
    setSuggestedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`flex min-h-screen w-full max-w-full overflow-x-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="hidden md:block">
        <Sidebar
          productTypeFilters={productTypeFilters}
          handleProductTypeChange={handleProductTypeChange}
          sizeFilters={sizeFilters}
          handleSizeChange={handleSizeChange}
          priceFilters={priceFilters}
          handlePriceChange={handlePriceChange}
          arrivalFilters={arrivalFilters}
          handleArrivalChange={handleArrivalChange}
          specialOfferFilters={specialOfferFilters}
          handleSpecialOfferChange={handleSpecialOfferChange}
          productType={productType}
          size={size}
          price={price}
          newArrivals={newArrivals}
          specialOffers={specialOffers}
          language={language}
        />
      </div>
      <div className="flex-1 w-full max-w-full px-4 py-6 sm:px-6 md:px-8 overflow-x-hidden">
        <div className="mb-6 w-full max-w-full flex justify-between items-center">
          <div className="flex-1">
            <FilterBar
              filters={filters}
              activeFilter={activeFilter}
              handleFilterChange={handleFilterChange}
              isDropdownOpen={isDropdownOpen}
              suggestedOption={suggestedOption}
              setIsDropdownOpen={setIsDropdownOpen}
              handleSuggestedChange={handleSuggestedChange}
              language={language}
            />
          </div>
          <div className="text-gray-400 text-xs font-light">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1
              ? translations[language].product
              : translations[language].products}
          </div>
        </div>
        <div className="w-full max-w-full">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {filteredProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  name_en={item.name.en}
                  name_ar={item.name.ar}
                  image={item.image}
                  price={item.price}
                  stars={item.stars || 0}
                  inStock={item.inStock}
                  language={language}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              {translations[language].noProductsFound}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
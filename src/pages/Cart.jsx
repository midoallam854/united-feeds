import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Modal from '../components/Modal'; // Import the Modal component

const Cart = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const context = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Pick Up');
  const [shippingMethod, setShippingMethod] = useState('Delivery');
  const [sadadNumber, setSadadNumber] = useState('');
  const [stationAddress, setStationAddress] = useState('Jumum Station');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [tempPhoneNumber, setTempPhoneNumber] = useState(''); // Temporary state for modal input

  if (!context) {
    console.error('Cart must be used within a ShopContextProvider');
    return (
      <div className="text-center text-red-600 p-4">
        {language === 'ar' ? 'خطأ: لم يتم العثور على ShopContext' : 'Error: ShopContext not found'}
      </div>
    );
  }

  const { products, cartItems, addToCart, removeFromCart, currency } = context;

  // Translation dictionaries
  const translations = {
    en: {
      account: 'Account',
      myBag: 'My Bag',
      cart: 'My Cart',
      emptyCart: 'Your cart is empty.',
      continueShopping: 'Continue Shopping',
      product: 'Product',
      description: 'Description',
      price: 'Price',
      quantity: 'Quantity',
      action: 'Action',
      totalPrice: 'Total Price',
      delete: 'Delete',
      clearCart: 'Clear Cart',
      confirmRemove: 'Are you sure you want to remove this item from your cart?',
      confirmClear: 'Are you sure you want to clear your cart?',
      subTotal: 'Sub Total',
      vat: 'VAT',
      total: 'Total',
      grandTotal: 'Grand Total',
      paymentMethod: 'Payment Method',
      cashOnPickUp: 'Cash on Pick Up',
      myWallet: 'My Wallet',
      sadad: 'Sadad',
      enterSadadNumber: 'Enter your SADA number',
      edit: 'Edit',
      editPhoneNumber: 'Edit Phone Number',
      phoneNumber: 'Phone Number',
      update: 'Update',
      shippingMethod: 'Shipping Method',
      delivery: 'Delivery',
      pickUp: 'Pick Up',
      stationAddress: 'Station Address',
      addCouponCode: 'Add Coupon Code',
      apply: 'Apply',
      checkout: 'Checkout',
      invalidSadad: 'Please enter a valid Sadad number.',
      invalidPhoneNumber: 'Please enter a valid phone number starting with +966 followed by 9 digits.',
      phoneNumberUpdated: 'Phone number updated successfully!',
      couponApplied: 'Coupon applied successfully!',
      invalidCoupon: 'Invalid coupon code.',
      itemRemoved: 'Item removed from cart.',
      cartCleared: 'Cart cleared successfully.',
      currency: currency || 'SAR',
    },
    ar: {
      account: 'الحساب',
      myBag: 'سلتي',
      cart: 'سلتي',
      emptyCart: 'سلتك فارغة.',
      continueShopping: 'متابعة التسوق',
      product: 'المنتج',
      description: 'الوصف',
      price: 'السعر',
      quantity: 'الكمية',
      action: 'الإجراء',
      totalPrice: 'السعر الإجمالي',
      delete: 'حذف',
      clearCart: 'مسح السلة',
      confirmRemove: 'هل أنت متأكد من إزالة هذا العنصر من سلتك؟',
      confirmClear: 'هل أنت متأكد من مسح سلتك؟',
      subTotal: 'المجموع الفرعي',
      vat: 'ضريبة القيمة المضافة',
      total: 'المجموع',
      grandTotal: 'المJموع الكلي',
      paymentMethod: 'طريقة الدفع',
      cashOnPickUp: 'الدفع عند الاستلام',
      myWallet: 'محفظتي',
      sadad: 'سداد',
      enterSadadNumber: 'أدخل رقم سداد الخاص بك',
      edit: 'تعديل',
      editPhoneNumber: 'تعديل رقم الهاتف',
      phoneNumber: 'رقم الهاتف',
      update: 'تحديث',
      shippingMethod: 'طريقة الشحن',
      delivery: 'التوصيل',
      pickUp: 'الاستلام',
      stationAddress: 'عنوان المحطة',
      addCouponCode: 'إضافة رمز خصم',
      apply: 'تطبيق',
      checkout: 'الدفع',
      invalidSadad: 'يرجى إدخال رقم سداد صالح.',
      invalidPhoneNumber: 'يرجى إدخال رقم هاتف صالح يبدأ بـ +966 ويتبعه 9 أرقام.',
      phoneNumberUpdated: 'تم تحديث رقم الهاتف بنجاح!',
      couponApplied: 'تم تطبيق الكوبون بنجاح!',
      invalidCoupon: 'رمز الكوبون غير صالح.',
      itemRemoved: 'تم إزالة العنصر من السلة.',
      cartCleared: 'تم مسح السلة بنجاح.',
      currency: 'ريال',
    },
  };

  // Listen for authentication state changes and fetch phone number
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/login');
      } else {
        // Fetch the user's phone number from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.phoneNumber) {
            setSadadNumber(userData.phoneNumber);
            setTempPhoneNumber(userData.phoneNumber);
          }
        }
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  // Calculate cart totals
  const calculateSubtotal = () => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p._id === productId);
      if (!product) return total;
      return total + product.price * quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const vat = subtotal * 0.15; // 15% VAT
  const discountedSubtotal = subtotal - discount;
  const total = discountedSubtotal + vat;
  const grandTotal = total;

  // Handle quantity increase
  const handleIncreaseQuantity = (productId) => {
    addToCart(productId);
  };

  // Handle quantity decrease or remove
  const handleDecreaseQuantity = (productId) => {
    removeFromCart(productId);
  };

  // Handle remove item with confirmation
  const handleRemoveItem = (productId) => {
    if (window.confirm(translations[language].confirmRemove)) {
      const quantity = cartItems[productId] || 0;
      for (let i = 0; i < quantity; i++) {
        removeFromCart(productId);
      }
      toast.success(translations[language].itemRemoved);
    }
  };

  // Handle clear cart with confirmation
  const handleClearCart = () => {
    if (window.confirm(translations[language].confirmClear)) {
      Object.keys(cartItems).forEach((productId) => {
        const quantity = cartItems[productId] || 0;
        for (let i = 0; i < quantity; i++) {
          removeFromCart(productId);
        }
      });
      setDiscount(0); // Reset discount
      toast.success(translations[language].cartCleared);
    }
  };

  // Handle navigate to product details
  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  // Handle proceed to checkout with validation
  const handleProceedToCheckout = () => {
    if (paymentMethod === 'Sadad' && !sadadNumber.trim()) {
      toast.error(translations[language].invalidSadad);
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      navigate('/checkout');
    }, 1500);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate('/products');
  };

  // Handle apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1); // 10% discount
      toast.success(translations[language].couponApplied);
    } else {
      setDiscount(0);
      toast.error(translations[language].invalidCoupon);
    }
  };

  // Handle opening the modal
  const handleOpenModal = () => {
    setTempPhoneNumber(sadadNumber || '+966'); // Prefill with current number or default to +966
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle updating the phone number
  const handleUpdatePhoneNumber = async () => {
    // Validate phone number (must start with +966 and be followed by 9 digits)
    const phoneRegex = /^\+966\d{9}$/;
    if (!phoneRegex.test(tempPhoneNumber)) {
      toast.error(translations[language].invalidPhoneNumber);
      return;
    }

    try {
      // Save the phone number to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { phoneNumber: tempPhoneNumber }, { merge: true });

      // Update the sadadNumber state
      setSadadNumber(tempPhoneNumber);
      toast.success(translations[language].phoneNumberUpdated);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating phone number:', error);
      toast.error(language === 'ar' ? 'فشل في تحديث رقم الهاتف.' : 'Failed to update phone number.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Render nothing while redirecting to login
  }

  return (
    <div className={`p-6 max-w-7xl mx-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/account" className="hover:underline">
          {translations[language].account}
        </Link>{' '}
        / {translations[language].myBag}
      </div>

      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{translations[language].cart}</h1>
        {Object.keys(cartItems).length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            {translations[language].clearCart}
          </button>
        )}
      </div>

      {Object.keys(cartItems).length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">{translations[language].emptyCart}</p>
          <button
            onClick={handleContinueShopping}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            {translations[language].continueShopping}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Cart Table */}
          <div className="w-full overflow-x-auto shadow-md rounded-lg">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">
                    {translations[language].product}
                  </th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">
                    {translations[language].description}
                  </th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">
                    {translations[language].price}
                  </th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">
                    {translations[language].quantity}
                  </th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">
                    {translations[language].action}
                  </th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold">
                    {translations[language].totalPrice}
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cartItems).map(([productId, quantity]) => {
                  const product = products.find((p) => p._id === productId);
                  if (!product) return null;

                  const name = language === 'ar' ? product.name.ar : product.name.en;
                  const itemTotal = product.price * quantity;

                  return (
                    <tr
                      key={productId}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                    >
                      {/* Product Image */}
                      <td className="py-4 px-6">
                        <img
                          src={Array.isArray(product.image) ? product.image[0] : product.image}
                          alt={name}
                          className="w-16 h-16 object-contain cursor-pointer rounded-md hover:opacity-80 transition duration-200"
                          onClick={() => handleProductClick(productId)}
                        />
                      </td>
                      {/* Description */}
                      <td className="py-4 px-6 text-gray-800">{name}</td>
                      {/* Price */}
                      <td className="py-4 px-6 text-gray-600">
                        {product.price.toFixed(2)} {translations[language].currency}
                      </td>
                      {/* Quantity */}
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecreaseQuantity(productId)}
                            className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition duration-200"
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-3 text-gray-800">{quantity}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(productId)}
                            className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition duration-200"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      {/* Action */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleRemoveItem(productId)}
                          className="bg-red-500 text-white py-1 px-4 rounded-full text-sm hover:bg-red-600 transition duration-200"
                        >
                          {translations[language].delete}
                        </button>
                      </td>
                      {/* Total Price */}
                      <td className="py-4 px-6 text-gray-600">
                        {itemTotal.toFixed(2)} {translations[language].currency}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="flex justify-end">
            <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {translations[language].total}
              </h3>
              <div className="text-gray-600 space-y-3">
                <div className="flex justify-between">
                  <span>{translations[language].subTotal}:</span>
                  <span>
                    {subtotal.toFixed(2)} {translations[language].currency}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>
                      -{discount.toFixed(2)} {translations[language].currency}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{translations[language].vat}:</span>
                  <span>
                    {vat.toFixed(2)} {translations[language].currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{translations[language].total}:</span>
                  <span>
                    {total.toFixed(2)} {translations[language].currency}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 border-t pt-3">
                  <span>{translations[language].grandTotal}:</span>
                  <span>
                    {grandTotal.toFixed(2)} {translations[language].currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="flex flex-col md:flex-row gap-8 mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Payment Method */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {translations[language].paymentMethod}
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Pick Up"
                    checked={paymentMethod === 'Cash on Pick Up'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  {translations[language].cashOnPickUp}
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="My Wallet"
                    checked={paymentMethod === 'My Wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  {translations[language].myWallet}
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Sadad"
                    checked={paymentMethod === 'Sadad'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  {translations[language].sadad}
                </label>
                {paymentMethod === 'Sadad' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={sadadNumber}
                      onChange={(e) => setSadadNumber(e.target.value)}
                      placeholder={translations[language].enterSadadNumber}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      readOnly // Make the input read-only since we edit via the modal
                    />
                    <button
                      onClick={handleOpenModal}
                      className="mt-2 text-green-600 hover:underline"
                    >
                      {translations[language].edit}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Method */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {translations[language].shippingMethod}
              </h3>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition duration-200">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="Delivery"
                    checked={shippingMethod === 'Delivery'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="mr-3"
                  />
                  {translations[language].delivery}
                </label>
                <label className="flex-1 flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition duration-200">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="Pick Up"
                    checked={shippingMethod === 'Pick Up'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="mr-3"
                  />
                  {translations[language].pickUp}
                </label>
              </div>

              {/* Station Address */}
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
                {translations[language].stationAddress}
              </h3>
              <input
                type="text"
                value={stationAddress}
                onChange={(e) => setStationAddress(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Coupon Code and Checkout Button */}
          <div className="flex flex-col md:flex-row gap-4 items-center mt-6">
            <div className="flex-1 flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {translations[language].addCouponCode}
              </h3>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
              >
                {translations[language].apply}
              </button>
            </div>
            <button
              onClick={handleProceedToCheckout}
              disabled={isCheckingOut}
              className={`bg-orange-500 text-white py-3 px-8 rounded-md hover:bg-orange-600 transition duration-200 flex items-center justify-center ${
                isCheckingOut ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isCheckingOut ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              ) : null}
              {translations[language].checkout}
            </button>
          </div>
        </div>
      )}

      {/* Edit Phone Number Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} language={language}>
        <h3 className="text-lg font-semibold text-green-600 mb-4">
          {translations[language].editPhoneNumber}
        </h3>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">{translations[language].phoneNumber}</label>
          <div className="flex items-center border rounded-md">
            <span className="bg-gray-100 px-3 py-2 border-r text-gray-600">+966</span>
            <input
              type="text"
              value={tempPhoneNumber.startsWith('+966') ? tempPhoneNumber.slice(4) : tempPhoneNumber}
              onChange={(e) => setTempPhoneNumber('+966' + e.target.value)}
              placeholder="123456789"
              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-600 rounded-r-md"
              maxLength={9}
              pattern="\d*"
            />
          </div>
        </div>
        <button
          onClick={handleUpdatePhoneNumber}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200 w-full"
        >
          {translations[language].update}
        </button>
      </Modal>
    </div>
  );
};

export default Cart;
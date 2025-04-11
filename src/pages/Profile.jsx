import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateProfile } from 'firebase/auth';

const Profile = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
    occupation: '',
    preferredStation: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [countryCode, setCountryCode] = useState('+966');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const translations = {
    en: {
      breadcrumb: 'Account / My Profile',
      accountDetails: 'Account Details',
      name: 'Name',
      gender: 'Gender',
      phoneNo: 'Phone No',
      dateOfBirth: 'Date of Birth',
      email: 'Email',
      occupation: 'Occupation',
      password: 'Password',
      preferredStation: 'Preferred Station',
      updateProfile: 'Update Profile',
      firstName: 'First Name',
      lastName: 'Last Name',
      mobileNumber: 'Mobile Number',
      selectGender: '-- Select Gender --',
      male: 'Male',
      female: 'Female',
      enterOccupation: 'Enter occupation',
      currentPassword: 'Current Password (required to change password)',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      enterCurrentPassword: 'Enter current password',
      enterNewPassword: 'Enter new password',
      confirmNewPasswordPlaceholder: 'Confirm new password',
      update: 'Update',
      saving: 'Saving...',
      deleteConfirm: 'Are you sure you want to delete your account?',
    },
    ar: {
      breadcrumb: 'الحساب / ملفي الشخصي',
      accountDetails: 'تفاصيل الحساب',
      name: 'الاسم',
      gender: 'الجنس',
      phoneNo: 'رقم الهاتف',
      dateOfBirth: 'تاريخ الميلاد',
      email: 'البريد الإلكتروني',
      occupation: 'المهنة',
      password: 'كلمة المرور',
      preferredStation: 'المحطة المفضلة',
      updateProfile: 'تحديث الملف الشخصي',
      firstName: 'الاسم الأول',
      lastName: 'الاسم الأخير',
      mobileNumber: 'رقم الجوال',
      selectGender: '-- اختر الجنس --',
      male: 'ذكر',
      female: 'أنثى',
      enterOccupation: 'أدخل المهنة',
      currentPassword: 'كلمة المرور الحالية (مطلوبة لتغيير كلمة المرور)',
      newPassword: 'كلمة المرور الجديدة',
      confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
      enterCurrentPassword: 'أدخل كلمة المرور الحالية',
      enterNewPassword: 'أدخل كلمة المرور الجديدة',
      confirmNewPasswordPlaceholder: 'تأكيد كلمة المرور الجديدة',
      update: 'تحديث',
      saving: 'جاري الحفظ...',
      deleteConfirm: 'هل أنت متأكد أنك تريد حذف حسابك؟',
    },
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      const userDocRef = doc(db, 'users', currentUser.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              firstName: data.firstName || currentUser.displayName?.split(' ')[0] || 'Mido',
              lastName: data.lastName || currentUser.displayName?.split(' ')[1] || 'Allam',
              email: data.email || currentUser.email || 'midoallam47@gmail.com',
              mobileNumber: data.mobileNumber || currentUser.phoneNumber || '',
              gender: data.gender || '',
              dateOfBirth: data.dateOfBirth || '',
              occupation: data.occupation || '',
              preferredStation: data.preferredStation || (language === 'ar' ? 'محطة جموم' : 'Jumum Station'),
              currentPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            });
          } else {
            setFormData({
              firstName: currentUser.displayName?.split(' ')[0] || 'Mido',
              lastName: currentUser.displayName?.split(' ')[1] || 'Allam',
              email: currentUser.email || 'midoallam47@gmail.com',
              mobileNumber: currentUser.phoneNumber || '',
              gender: '',
              dateOfBirth: '',
              occupation: '',
              preferredStation: language === 'ar' ? 'محطة جموم' : 'Jumum Station',
              currentPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.message, error.code);
          setError(translations[language].error || 'Failed to load user data. Please try again.');
        });
    } else {
      navigate('/login');
    }
  }, [navigate, language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'currentPassword' || name === 'newPassword' || name === 'confirmNewPassword') {
      setError('');
      setSuccessMessage('');
    }
  };

  const handleMobileChange = (e) => {
    setFormData((prev) => ({ ...prev, mobileNumber: `${countryCode} ${e.target.value}` }));
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    setFormData((prev) => ({
      ...prev,
      mobileNumber: `${e.target.value} ${prev.mobileNumber.split(' ')[1] || ''}`,
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError('');
    setSuccessMessage('');
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setError('');
    setSuccessMessage('');

    if (formData.newPassword || formData.confirmNewPassword) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError(translations[language].passwordMismatch || 'New passwords do not match.');
        setIsSaving(false);
        return;
      }
      if (!formData.currentPassword) {
        setError(
          translations[language].currentPasswordRequired ||
            'Please enter your current password to change your password.'
        );
        setIsSaving(false);
        return;
      }
    }

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      occupation: formData.occupation,
      preferredStation: formData.preferredStation,
    };

    const userDocRef = doc(db, 'users', user.uid);
    try {
      if (formData.newPassword && formData.currentPassword) {
        const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, formData.newPassword);
        console.log('Password updated successfully');
        setSuccessMessage(translations[language].passwordUpdated || 'Password updated successfully.');
      }

      await setDoc(userDocRef, profileData, { merge: true });
      console.log('Firestore updated successfully');

      const fullName = `${formData.firstName} ${formData.lastName}`;
      await updateProfile(user, { displayName: fullName });
      console.log('Display name updated successfully');

      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
      setIsModalOpen(false);
      setSuccessMessage(translations[language].profileUpdated || 'Profile updated successfully.');
    } catch (error) {
      console.error('Detailed error saving profile:', error.message, error.code);
      if (error.code === 'auth/wrong-password') {
        setError(translations[language].wrongPassword || 'Current password is incorrect. Please try again.');
      } else if (error.code === 'auth/requires-recent-login') {
        setError(
          translations[language].sessionExpired ||
            'Session expired. Please log out and log in again to update your password.'
        );
      } else if (error.code === 'permission-denied') {
        setError(
          translations[language].permissionDenied || 'Permission denied. Check Firestore security rules.'
        );
      } else if (error.code === 'auth/weak-password') {
        setError(
          translations[language].weakPassword || 'New password is too weak. It must be at least 6 characters long.'
        );
      } else {
        setError(
          `${translations[language].failedToSave || 'Failed to save profile'}: ${error.message}`
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(translations[language].deleteConfirm)) {
      if (user) {
        user.delete().catch((error) => console.error('Delete error:', error.message));
      }
      auth.signOut().then(() => navigate('/login'));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className={`mb-6 md:mb-8 lg:mb-10 ml-4 md:ml-6 lg:ml-8 fade-in ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <p className="text-gray-400 text-sm md:text-base cursor-pointer hover:text-[#78B833] transition-colors">
          {translations[language].breadcrumb}
        </p>
      </div>

      <div
        className={`max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10 transition-all duration-300 fade-in ${
          isModalOpen ? 'blur-sm' : ''
        } ${language === 'ar' ? 'rtl' : 'ltr'}`}
      >
        {successMessage && (
          <p className="text-[#78B833] text-sm mb-4">{successMessage}</p>
        )}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#78B833]">
            {translations[language].accountDetails}
          </h2>
          <div className="flex gap-2">
            <FaPencilAlt
              className="text-gray-500 cursor-pointer hover:text-[#78B833] transition-colors"
              onClick={toggleModal}
            />
            <FaTrash
              className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
              onClick={handleDelete}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].name}</label>
            <p className="text-black text-base md:text-lg">
              {`${formData.firstName} ${formData.lastName}`}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].gender}</label>
            <p className="text-black text-base md:text-lg">{formData.gender || translations[language].selectGender}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].phoneNo}</label>
            <p className="text-black text-base md:text-lg">{formData.mobileNumber}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].dateOfBirth}</label>
            <p className="text-black text-base md:text-lg">{formData.dateOfBirth || 'dd/mm/yyyy'}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].email}</label>
            <p className="text-black text-base md:text-lg">{formData.email}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].occupation}</label>
            <p className="text-black text-base md:text-lg">{formData.occupation || translations[language].enterOccupation}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].password}</label>
            <p className="text-black text-base md:text-lg">********</p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm md:text-base mb-2">{translations[language].preferredStation}</label>
            <p className="text-black text-base md:text-lg">{formData.preferredStation}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`bg-white rounded-xl shadow-2xl p-6 md:p-8 lg:p-10 w-full max-w-md max-h-[80vh] overflow-y-auto relative scrollbar-hide z-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={toggleModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#78B833] mb-6">
                {translations[language].updateProfile}
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].firstName}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].lastName}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].mobileNumber}
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                    >
                      <option value="+966">+966</option>
                      <option value="+971">+971</option>
                    </select>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber.split(' ')[1] || ''}
                      onChange={handleMobileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                      placeholder="123456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].gender}
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  >
                    <option value="">{translations[language].selectGender}</option>
                    <option value={language === 'ar' ? 'ذكر' : 'Male'}>{translations[language].male}</option>
                    <option value={language === 'ar' ? 'أنثى' : 'Female'}>{translations[language].female}</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].dateOfBirth}
                  </label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].occupation}
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder={translations[language].enterOccupation}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].preferredStation}
                  </label>
                  <input
                    type="text"
                    name="preferredStation"
                    value={formData.preferredStation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].currentPassword}
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder={translations[language].enterCurrentPassword}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].newPassword}
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder={translations[language].enterNewPassword}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm md:text-base mb-2 block font-medium">
                    {translations[language].confirmNewPassword}
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    placeholder={translations[language].confirmNewPasswordPlaceholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78B833] transition-all duration-200"
                  />
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {successMessage && (
                  <p className="text-[#78B833] text-sm mt-2">{successMessage}</p>
                )}
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`mt-6 w-full bg-[#78B833] text-white py-3 rounded-full hover:bg-[#78B833]/90 transition-all duration-200 font-medium cursor-pointer ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? translations[language].saving : translations[language].update}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
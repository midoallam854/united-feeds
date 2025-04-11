import React from 'react';

const Modal = ({ isOpen, onClose, children, language = 'en' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with blur effect */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        onClick={onClose} // Allow closing the modal by clicking outside
        aria-hidden="true"
      />
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
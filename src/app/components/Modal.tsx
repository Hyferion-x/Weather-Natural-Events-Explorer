'use client';

import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Add small delay to trigger animation
      setTimeout(() => setFadeIn(true), 10);
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
    } else {
      setFadeIn(false);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div 
        className={`relative bg-[#232946] max-w-lg w-full mx-4 rounded-lg border border-blue-500/30 shadow-lg transition-all duration-300 transform ${
          fadeIn ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white animated-gradient-title">
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-lg focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Modal body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] text-gray-200">
          {children}
        </div>
        
        {/* Modal footer */}
        <div className="p-4 border-t border-gray-700 text-right">
          <button 
            onClick={onClose} 
            className="glass-btn text-sm py-1 px-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 
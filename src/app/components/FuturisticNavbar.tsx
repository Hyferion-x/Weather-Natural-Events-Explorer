'use client';

import React, { useState, useEffect } from 'react';
import { FaCloudSun, FaBars, FaTimes, FaGlobe, FaBolt, FaUserAstronaut, FaInfoCircle } from 'react-icons/fa';
import WorldClock from './WorldClock';
import AboutModal from './AboutModal';
import GlobalEventsModal from './GlobalEventsModal';
import WeatherAlertsModal from './WeatherAlertsModal';

interface NavbarProps {
  onUseMyLocation: () => void;
  onEventSelect?: (lat: number, lng: number, title: string) => void;
}

const FuturisticNavbar: React.FC<NavbarProps> = ({ onUseMyLocation, onEventSelect }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal states
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [globalEventsModalOpen, setGlobalEventsModalOpen] = useState(false);
  const [weatherAlertsModalOpen, setWeatherAlertsModalOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Handle button clicks
  const handleAboutClick = () => {
    setAboutModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleGlobalEventsClick = () => {
    setGlobalEventsModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleWeatherAlertsClick = () => {
    setWeatherAlertsModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Add scan lines overlay for cyberpunk effect */}
      <div className="scan-lines"></div>
      
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur-lg nav-glow-effect' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and title */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FaCloudSun className="h-8 w-8 text-blue-400 mr-2 text-glow" />
                <span className="text-white font-bold text-xl tracking-tight animated-gradient-title">
                  Weather Explorer
                </span>
              </div>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <button 
                  className="text-gray-200 hover:text-white hover:bg-blue-800/30 px-3 py-2 rounded-md text-sm font-medium flex items-center transition nav-button-hover"
                  onClick={onUseMyLocation}
                >
                  <FaUserAstronaut className="mr-2 text-glow" />
                  Your Location
                </button>
                <button 
                  className="text-gray-200 hover:text-white hover:bg-blue-800/30 px-3 py-2 rounded-md text-sm font-medium flex items-center transition nav-button-hover"
                  onClick={handleGlobalEventsClick}
                >
                  <FaGlobe className="mr-2 text-glow" />
                  Global Events
                </button>
                <button 
                  className="text-gray-200 hover:text-white hover:bg-blue-800/30 px-3 py-2 rounded-md text-sm font-medium flex items-center transition nav-button-hover"
                  onClick={handleWeatherAlertsClick}
                >
                  <FaBolt className="mr-2 text-glow" />
                  Weather Alerts
                </button>
                <button 
                  className="text-gray-200 hover:text-white hover:bg-blue-800/30 px-3 py-2 rounded-md text-sm font-medium flex items-center transition nav-button-hover"
                  onClick={handleAboutClick}
                >
                  <FaInfoCircle className="mr-2 text-glow" />
                  About
                </button>
              </div>
            </div>

            {/* Time display */}
            <div className="hidden md:flex items-center">
              <div className="ml-3">
                <WorldClock small={true} />
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-800/30 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="block h-6 w-6 text-glow" />
                ) : (
                  <FaBars className="block h-6 w-6 text-glow" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/80 backdrop-blur-lg">
            <button
              className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-800/30 nav-button-hover"
              onClick={() => {
                onUseMyLocation();
                setMobileMenuOpen(false);
              }}
            >
              <FaUserAstronaut className="inline mr-2 text-glow" />
              Your Location
            </button>
            <button
              className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-800/30 nav-button-hover"
              onClick={handleGlobalEventsClick}
            >
              <FaGlobe className="inline mr-2 text-glow" />
              Global Events
            </button>
            <button
              className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-800/30 nav-button-hover"
              onClick={handleWeatherAlertsClick}
            >
              <FaBolt className="inline mr-2 text-glow" />
              Weather Alerts
            </button>
            <button
              className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-800/30 nav-button-hover"
              onClick={handleAboutClick}
            >
              <FaInfoCircle className="inline mr-2 text-glow" />
              About
            </button>
            <div className="px-3 py-2">
              <WorldClock small={true} />
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <AboutModal 
        isOpen={aboutModalOpen} 
        onClose={() => setAboutModalOpen(false)} 
      />
      
      <GlobalEventsModal 
        isOpen={globalEventsModalOpen} 
        onClose={() => setGlobalEventsModalOpen(false)}
        onEventSelect={onEventSelect}
      />
      
      <WeatherAlertsModal 
        isOpen={weatherAlertsModalOpen} 
        onClose={() => setWeatherAlertsModalOpen(false)} 
      />
    </>
  );
};

export default FuturisticNavbar; 
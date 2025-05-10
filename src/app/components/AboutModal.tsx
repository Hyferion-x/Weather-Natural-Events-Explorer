'use client';

import React from 'react';
import Modal from './Modal';
import { FaGithub, FaLinkedin, FaCode, FaReact, FaCloud, FaGlobe } from 'react-icons/fa';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About">
      <div className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl text-white font-bold mb-4">
            UW
          </div>
          <h2 className="text-2xl font-bold text-white">Udantha Weliwatta</h2>
          <p className="text-blue-300 italic">Developer & Weather Enthusiast</p>
        </div>

        <div className="mb-6">
          <p className="mb-4">
            I created this Weather & Natural Events Explorer as a hobby project to combine my interests in meteorology, 
            natural phenomena, and web development. The application uses modern web technologies to display current 
            weather conditions and track natural events happening around the globe.
          </p>
          <p>
            This project demonstrates the power of combining multiple data sources (NASA EONET, Open-Meteo, 
            and OpenStreetMap) into a cohesive, user-friendly interface that provides valuable information in real-time.
          </p>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <FaReact className="text-blue-400 mr-2" />
              <span>React & Next.js</span>
            </div>
            <div className="flex items-center">
              <FaCode className="text-blue-400 mr-2" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center">
              <FaCloud className="text-blue-400 mr-2" />
              <span>Open-Meteo API</span>
            </div>
            <div className="flex items-center">
              <FaGlobe className="text-blue-400 mr-2" />
              <span>NASA EONET API</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-white mb-2">Connect With Me</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/Hyferion-x" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition flex items-center">
              <FaGithub className="text-2xl" />
              <span className="ml-2">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/utgw/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition flex items-center">
              <FaLinkedin className="text-2xl" />
              <span className="ml-2">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="text-sm text-gray-400 mt-6 italic">
          This project is for educational and demonstration purposes. Data is sourced from public APIs.
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal; 
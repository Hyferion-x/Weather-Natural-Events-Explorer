'use client';

import React from 'react';
import Modal from './Modal';
import { AirQualityData } from '../types';
import { FaCloud, FaSmog, FaLeaf, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

interface AirQualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  airQualityData: AirQualityData | null;
  loading: boolean;
}

const AirQualityModal: React.FC<AirQualityModalProps> = ({ 
  isOpen, 
  onClose, 
  airQualityData, 
  loading 
}) => {
  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-400', bgColor: 'bg-green-900/20', borderColor: 'border-green-900/30' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', borderColor: 'border-yellow-900/30' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-400', bgColor: 'bg-orange-900/20', borderColor: 'border-orange-900/30' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-400', bgColor: 'bg-red-900/20', borderColor: 'border-red-900/30' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-400', bgColor: 'bg-purple-900/20', borderColor: 'border-purple-900/30' };
    return { level: 'Hazardous', color: 'text-red-600', bgColor: 'bg-red-900/30', borderColor: 'border-red-900/50' };
  };

  const getHealthAdvice = (aqi: number) => {
    if (aqi <= 50) return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
    if (aqi <= 100) return 'Air quality is acceptable; however, some pollutants may be a concern for a small number of people.';
    if (aqi <= 150) return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    if (aqi <= 200) return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects.';
    if (aqi <= 300) return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    return 'Health alert: everyone may experience more serious health effects.';
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Air Quality">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Modal>
    );
  }

  if (!airQualityData || !airQualityData.current) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Air Quality">
        <div className="text-center py-6 text-gray-400">
          No air quality data available for this location
        </div>
      </Modal>
    );
  }

  const current = airQualityData.current;
  const europeanAQI = current.european_aqi;
  const usAQI = current.us_aqi;
  const europeanCategory = getAQICategory(europeanAQI);
  const usCategory = getAQICategory(usAQI);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Air Quality">
      <div className="space-y-6">
        {/* European AQI */}
        <div className={`${europeanCategory.bgColor} p-4 rounded-lg border ${europeanCategory.borderColor}`}>
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaCloud className="mr-2 text-blue-400" />
            European Air Quality Index
          </h3>
          <div className="text-center mb-3">
            <div className={`text-4xl font-bold ${europeanCategory.color}`}>{europeanAQI}</div>
            <div className={`text-lg font-semibold ${europeanCategory.color}`}>{europeanCategory.level}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-300">PM2.5</div>
              <div className="text-white font-semibold">{current.european_aqi_pm2_5}</div>
            </div>
            <div>
              <div className="text-gray-300">PM10</div>
              <div className="text-white font-semibold">{current.european_aqi_pm10}</div>
            </div>
            <div>
              <div className="text-gray-300">NO₂</div>
              <div className="text-white font-semibold">{current.european_aqi_no2}</div>
            </div>
            <div>
              <div className="text-gray-300">O₃</div>
              <div className="text-white font-semibold">{current.european_aqi_o3}</div>
            </div>
          </div>
        </div>

        {/* US AQI */}
        <div className={`${usCategory.bgColor} p-4 rounded-lg border ${usCategory.borderColor}`}>
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaSmog className="mr-2 text-gray-400" />
            US Air Quality Index
          </h3>
          <div className="text-center mb-3">
            <div className={`text-4xl font-bold ${usCategory.color}`}>{usAQI}</div>
            <div className={`text-lg font-semibold ${usCategory.color}`}>{usCategory.level}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-300">PM2.5</div>
              <div className="text-white font-semibold">{current.us_aqi_pm2_5}</div>
            </div>
            <div>
              <div className="text-gray-300">PM10</div>
              <div className="text-white font-semibold">{current.us_aqi_pm10}</div>
            </div>
            <div>
              <div className="text-gray-300">NO₂</div>
              <div className="text-white font-semibold">{current.us_aqi_no2}</div>
            </div>
            <div>
              <div className="text-gray-300">O₃</div>
              <div className="text-white font-semibold">{current.us_aqi_o3}</div>
            </div>
            <div>
              <div className="text-gray-300">SO₂</div>
              <div className="text-white font-semibold">{current.us_aqi_so2}</div>
            </div>
            <div>
              <div className="text-gray-300">CO</div>
              <div className="text-white font-semibold">{current.us_aqi_co}</div>
            </div>
          </div>
        </div>

        {/* Health Advice */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaLeaf className="mr-2 text-green-400" />
            Health Advice
          </h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>{getHealthAdvice(Math.max(europeanAQI, usAQI))}</p>
            {Math.max(europeanAQI, usAQI) > 100 && (
              <div className="flex items-start mt-3">
                <FaExclamationTriangle className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-400 font-semibold">Recommendations:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Limit outdoor activities</li>
                    <li>Keep windows closed</li>
                    <li>Use air purifiers if available</li>
                    <li>Monitor symptoms if you have respiratory conditions</li>
                  </ul>
                </div>
              </div>
            )}
            {Math.max(europeanAQI, usAQI) <= 50 && (
              <div className="flex items-center mt-3">
                <FaCheckCircle className="text-green-400 mr-2" />
                <span className="text-green-400">Good conditions for outdoor activities</span>
              </div>
            )}
          </div>
        </div>

        {/* AQI Scale */}
        <div className="bg-gray-900/20 p-4 rounded-lg border border-gray-900/30">
          <h3 className="text-lg font-medium text-white mb-3">AQI Scale</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-300">0-50: Good</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span className="text-gray-300">51-100: Moderate</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
              <span className="text-gray-300">101-150: Unhealthy for Sensitive Groups</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-300">151-200: Unhealthy</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
              <span className="text-gray-300">201-300: Very Unhealthy</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-700 rounded mr-2"></div>
              <span className="text-gray-300">301+: Hazardous</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AirQualityModal;

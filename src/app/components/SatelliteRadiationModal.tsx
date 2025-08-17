'use client';

import React from 'react';
import Modal from './Modal';
import { SatelliteRadiationData } from '../types';
import { FaSun, FaRadiation, FaShieldAlt, FaChartLine, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

interface SatelliteRadiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  radiationData: SatelliteRadiationData | null;
  loading: boolean;
}

const SatelliteRadiationModal: React.FC<SatelliteRadiationModalProps> = ({ 
  isOpen, 
  onClose, 
  radiationData, 
  loading 
}) => {
  const getUVIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400', bgColor: 'bg-green-900/20', borderColor: 'border-green-900/30' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', borderColor: 'border-yellow-900/30' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400', bgColor: 'bg-orange-900/20', borderColor: 'border-orange-900/30' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400', bgColor: 'bg-red-900/20', borderColor: 'border-red-900/30' };
    return { level: 'Extreme', color: 'text-purple-400', bgColor: 'bg-purple-900/20', borderColor: 'border-purple-900/30' };
  };

  const getUVProtectionAdvice = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        protection: 'Low protection required',
        advice: 'You can safely stay outside using minimal sun protection.',
        recommendations: ['Wear sunglasses on bright days', 'Use sunscreen if outdoors for more than 1 hour']
      };
    } else if (uvIndex <= 5) {
      return {
        protection: 'Moderate protection required',
        advice: 'Take precautions during midday hours when the sun is most intense.',
        recommendations: ['Seek shade during midday hours', 'Wear protective clothing', 'Apply sunscreen SPF 30+', 'Wear a wide-brimmed hat']
      };
    } else if (uvIndex <= 7) {
      return {
        protection: 'High protection required',
        advice: 'Reduce time in the sun between 10 a.m. and 4 p.m.',
        recommendations: ['Minimize sun exposure during midday', 'Apply sunscreen SPF 30+ every 2 hours', 'Wear protective clothing', 'Seek shade']
      };
    } else if (uvIndex <= 10) {
      return {
        protection: 'Very high protection required',
        advice: 'Minimize sun exposure during midday hours.',
        recommendations: ['Avoid sun exposure during midday', 'Apply sunscreen SPF 50+ every 2 hours', 'Wear protective clothing', 'Seek shade', 'Use extra caution']
      };
    } else {
      return {
        protection: 'Extreme protection required',
        advice: 'Avoid sun exposure during midday hours.',
        recommendations: ['Avoid all sun exposure during midday', 'Apply sunscreen SPF 50+ every 2 hours', 'Wear protective clothing', 'Seek shade', 'Take all precautions']
      };
    }
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Satellite Radiation Data">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Modal>
    );
  }

  if (!radiationData || !radiationData.current) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Satellite Radiation Data">
        <div className="text-center py-6 text-gray-400">
          No radiation data available for this location
        </div>
      </Modal>
    );
  }

  const current = radiationData.current;
  const uvCategory = getUVIndexCategory(current.uv_index);
  const protectionAdvice = getUVProtectionAdvice(current.uv_index);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Satellite Radiation Data">
      <div className="space-y-6">
        {/* UV Index */}
        <div className={`${uvCategory.bgColor} p-4 rounded-lg border ${uvCategory.borderColor}`}>
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaSun className="mr-2 text-yellow-400" />
            UV Index
          </h3>
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold ${uvCategory.color}`}>{current.uv_index}</div>
            <div className={`text-lg font-semibold ${uvCategory.color}`}>{uvCategory.level}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-300">Clear Sky UV</div>
              <div className="text-white font-semibold">{current.uv_index_clear_sky}</div>
            </div>
            <div>
              <div className="text-gray-300">Current Time</div>
              <div className="text-white font-semibold">{new Date(current.time).toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Solar Radiation */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaRadiation className="mr-2 text-blue-400" />
            Solar Radiation
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-300">Direct Normal</div>
              <div className="text-white font-semibold">{(current.direct_normal_irradiance / 1000).toFixed(2)} kW/m²</div>
            </div>
            <div>
              <div className="text-gray-300">Diffuse</div>
              <div className="text-white font-semibold">{(current.diffuse_radiation / 1000).toFixed(2)} kW/m²</div>
            </div>
            <div>
              <div className="text-gray-300">Terrestrial</div>
              <div className="text-white font-semibold">{(current.terrestrial_radiation / 1000).toFixed(2)} kW/m²</div>
            </div>
            <div>
              <div className="text-gray-300">Shortwave</div>
              <div className="text-white font-semibold">{(current.shortwave_radiation / 1000).toFixed(2)} kW/m²</div>
            </div>
            <div>
              <div className="text-gray-300">Global Tilted</div>
              <div className="text-white font-semibold">{(current.global_tilted_irradiance / 1000).toFixed(2)} kW/m²</div>
            </div>
            <div>
              <div className="text-gray-300">Instant</div>
              <div className="text-white font-semibold">{(current.shortwave_radiation_instant / 1000).toFixed(2)} kW/m²</div>
            </div>
          </div>
        </div>

        {/* UV Protection Advice */}
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaShieldAlt className="mr-2 text-yellow-400" />
            Sun Protection Advice
          </h3>
          <div className="text-sm text-gray-300 space-y-3">
            <div>
              <p className="text-yellow-400 font-semibold">{protectionAdvice.protection}</p>
              <p className="mt-1">{protectionAdvice.advice}</p>
            </div>
            <div>
              <p className="text-yellow-400 font-semibold mb-2">Recommendations:</p>
              <ul className="list-disc list-inside space-y-1">
                {protectionAdvice.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* UV Index Scale */}
        <div className="bg-gray-900/20 p-4 rounded-lg border border-gray-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaChartLine className="mr-2 text-blue-400" />
            UV Index Scale
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-300">0-2: Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span className="text-gray-300">3-5: Moderate</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
              <span className="text-gray-300">6-7: High</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-300">8-10: Very High</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
              <span className="text-gray-300">11+: Extreme</span>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className={`${current.uv_index > 7 ? 'bg-red-900/20 border-red-900/30' : 'bg-green-900/20 border-green-900/30'} p-4 rounded-lg border`}>
          <div className="flex items-center">
            {current.uv_index > 7 ? (
              <FaExclamationTriangle className="text-red-400 mr-2" />
            ) : (
              <FaCheckCircle className="text-green-400 mr-2" />
            )}
            <div className="text-sm text-gray-300">
              <p className="font-semibold">
                {current.uv_index > 7 ? 'High UV Alert' : 'Safe UV Levels'}
              </p>
              <p className="text-xs mt-1">
                {current.uv_index > 7 
                  ? 'Take extra precautions to protect your skin from UV radiation.'
                  : 'UV levels are currently safe for outdoor activities with normal precautions.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SatelliteRadiationModal;

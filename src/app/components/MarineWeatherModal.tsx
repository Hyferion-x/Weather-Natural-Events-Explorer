'use client';

import React from 'react';
import Modal from './Modal';
import { MarineWeather } from '../types';
import { FaWater, FaWind, FaCompass, FaClock, FaChartLine } from 'react-icons/fa';

interface MarineWeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  marineData: MarineWeather | null;
  loading: boolean;
}

const MarineWeatherModal: React.FC<MarineWeatherModalProps> = ({ 
  isOpen, 
  onClose, 
  marineData, 
  loading 
}) => {
  const getWaveDirectionText = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getWaveHeightCategory = (height: number) => {
    if (height < 0.5) return { category: 'Calm', color: 'text-green-400' };
    if (height < 1.25) return { category: 'Slight', color: 'text-blue-400' };
    if (height < 2.5) return { category: 'Moderate', color: 'text-yellow-400' };
    if (height < 4) return { category: 'Rough', color: 'text-orange-400' };
    return { category: 'High', color: 'text-red-400' };
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Marine Weather">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Modal>
    );
  }

  if (!marineData || !marineData.current) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Marine Weather">
        <div className="text-center py-6 text-gray-400">
          No marine weather data available for this location
        </div>
      </Modal>
    );
  }

  const current = marineData.current;
  const waveHeightCategory = getWaveHeightCategory(current.wave_height);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Marine Weather">
      <div className="space-y-6">
        {/* Current Conditions */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaWater className="mr-2 text-blue-400" />
            Current Wave Conditions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{current.wave_height.toFixed(1)}m</div>
              <div className="text-sm text-gray-300">Wave Height</div>
              <div className={`text-xs ${waveHeightCategory.color}`}>{waveHeightCategory.category}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{current.wave_period}s</div>
              <div className="text-sm text-gray-300">Wave Period</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-lg font-semibold text-white flex items-center justify-center">
              <FaCompass className="mr-2 text-blue-400" />
              {getWaveDirectionText(current.wave_direction)} ({current.wave_direction}°)
            </div>
            <div className="text-sm text-gray-300">Wave Direction</div>
          </div>
        </div>

        {/* Wind Waves */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaWind className="mr-2 text-blue-400" />
            Wind Waves
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{current.wind_wave_height.toFixed(1)}m</div>
              <div className="text-sm text-gray-300">Height</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{current.wind_wave_period}s</div>
              <div className="text-sm text-gray-300">Period</div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm text-white">
              Direction: {getWaveDirectionText(current.wind_wave_direction)} ({current.wind_wave_direction}°)
            </div>
          </div>
        </div>

        {/* Swell Waves */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaChartLine className="mr-2 text-blue-400" />
            Swell Waves
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{current.swell_wave_height.toFixed(1)}m</div>
              <div className="text-sm text-gray-300">Height</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{current.swell_wave_period}s</div>
              <div className="text-sm text-gray-300">Period</div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm text-white">
              Direction: {getWaveDirectionText(current.swell_wave_direction)} ({current.swell_wave_direction}°)
            </div>
          </div>
        </div>

        {/* Safety Information */}
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-900/30">
          <h3 className="text-lg font-medium text-white mb-2 flex items-center">
            <FaClock className="mr-2 text-yellow-400" />
            Marine Safety
          </h3>
          <div className="text-sm text-gray-300 space-y-1">
            {current.wave_height > 3 && (
              <p className="text-red-400">⚠️ High waves - Exercise extreme caution</p>
            )}
            {current.wave_height > 2 && current.wave_height <= 3 && (
              <p className="text-orange-400">⚠️ Moderate waves - Use caution</p>
            )}
            {current.wave_height <= 2 && (
              <p className="text-green-400">✅ Safe conditions for most vessels</p>
            )}
            <p>Always check local marine forecasts before heading out</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MarineWeatherModal;

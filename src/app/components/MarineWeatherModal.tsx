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

const isFiniteNumber = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const formatNumber = (value: number | null | undefined, digits = 1, suffix = '') =>
  isFiniteNumber(value) ? `${value.toFixed(digits)}${suffix}` : 'N/A';

const getWaveDirectionText = (degrees: number | null | undefined) => {
  if (!isFiniteNumber(degrees)) return 'N/A';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const getWaveHeightCategory = (height: number | null | undefined) => {
  if (!isFiniteNumber(height)) return { category: 'Unavailable', color: 'text-gray-400' };
  if (height < 0.5) return { category: 'Calm', color: 'text-green-400' };
  if (height < 1.25) return { category: 'Slight', color: 'text-blue-400' };
  if (height < 2.5) return { category: 'Moderate', color: 'text-yellow-400' };
  if (height < 4) return { category: 'Rough', color: 'text-orange-400' };
  return { category: 'High', color: 'text-red-400' };
};

const MarineWeatherModal: React.FC<MarineWeatherModalProps> = ({
  isOpen,
  onClose,
  marineData,
  loading,
}) => {
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
  const waveHeight = current.wave_height;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Marine Weather">
      <div className="space-y-6">
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaWater className="mr-2 text-blue-400" />
            Current Wave Conditions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(current.wave_height, 1, 'm')}</div>
              <div className="text-sm text-gray-300">Wave Height</div>
              <div className={`text-xs ${waveHeightCategory.color}`}>{waveHeightCategory.category}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(current.wave_period, 1, 's')}</div>
              <div className="text-sm text-gray-300">Wave Period</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-lg font-semibold text-white flex items-center justify-center">
              <FaCompass className="mr-2 text-blue-400" />
              {getWaveDirectionText(current.wave_direction)} ({formatNumber(current.wave_direction, 0, ' deg')})
            </div>
            <div className="text-sm text-gray-300">Wave Direction</div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaWind className="mr-2 text-blue-400" />
            Wind Waves
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{formatNumber(current.wind_wave_height, 1, 'm')}</div>
              <div className="text-sm text-gray-300">Height</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{formatNumber(current.wind_wave_period, 1, 's')}</div>
              <div className="text-sm text-gray-300">Period</div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm text-white">
              Direction: {getWaveDirectionText(current.wind_wave_direction)} ({formatNumber(current.wind_wave_direction, 0, ' deg')})
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaChartLine className="mr-2 text-blue-400" />
            Swell Waves
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{formatNumber(current.swell_wave_height, 1, 'm')}</div>
              <div className="text-sm text-gray-300">Height</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{formatNumber(current.swell_wave_period, 1, 's')}</div>
              <div className="text-sm text-gray-300">Period</div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm text-white">
              Direction: {getWaveDirectionText(current.swell_wave_direction)} ({formatNumber(current.swell_wave_direction, 0, ' deg')})
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-900/30">
          <h3 className="text-lg font-medium text-white mb-2 flex items-center">
            <FaClock className="mr-2 text-yellow-400" />
            Marine Safety
          </h3>
          <div className="text-sm text-gray-300 space-y-1">
            {isFiniteNumber(waveHeight) && waveHeight > 3 && (
              <p className="text-red-400">High waves - exercise extreme caution</p>
            )}
            {isFiniteNumber(waveHeight) && waveHeight > 2 && waveHeight <= 3 && (
              <p className="text-orange-400">Moderate waves - use caution</p>
            )}
            {isFiniteNumber(waveHeight) && waveHeight <= 2 && (
              <p className="text-green-400">Safe conditions for most vessels</p>
            )}
            {!isFiniteNumber(waveHeight) && (
              <p className="text-gray-400">Wave safety guidance is unavailable for this location.</p>
            )}
            <p>Always check local marine forecasts before heading out</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MarineWeatherModal;

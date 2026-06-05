import React from 'react';
import { MarineWeather } from '../types';
import { FaWater, FaWind, FaArrowUp, FaClock } from 'react-icons/fa';

interface MarineWeatherCardProps {
  marineData: MarineWeather | null;
  loading: boolean;
}

const isFiniteNumber = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const formatNumber = (value: number | null | undefined, digits = 0, suffix = '') =>
  isFiniteNumber(value) ? `${value.toFixed(digits)}${suffix}` : 'N/A';

const getDirectionText = (direction: number | null | undefined) => {
  if (!isFiniteNumber(direction)) return 'N/A';

  if (direction >= 337.5 || direction < 22.5) return 'N';
  if (direction >= 22.5 && direction < 67.5) return 'NE';
  if (direction >= 67.5 && direction < 112.5) return 'E';
  if (direction >= 112.5 && direction < 157.5) return 'SE';
  if (direction >= 157.5 && direction < 202.5) return 'S';
  if (direction >= 202.5 && direction < 247.5) return 'SW';
  if (direction >= 247.5 && direction < 292.5) return 'W';
  return 'NW';
};

const MarineWeatherCard: React.FC<MarineWeatherCardProps> = ({ marineData, loading }) => {
  if (loading) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaWater className="text-blue-400 text-glow" />
          <h3 className="text-white font-semibold">Marine Weather</h3>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!marineData || !marineData.current) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaWater className="text-blue-400 text-glow" />
          <h3 className="text-white font-semibold">Marine Weather</h3>
        </div>
        <p className="text-gray-400 text-sm">No marine data available</p>
      </div>
    );
  }

  const { current } = marineData;

  const getWaveHeightCategory = (height: number | null) => {
    if (!isFiniteNumber(height)) return { category: 'Unavailable', color: 'text-gray-400' };
    if (height < 0.5) return { category: 'Calm', color: 'text-green-400' };
    if (height < 1.25) return { category: 'Slight', color: 'text-blue-400' };
    if (height < 2.5) return { category: 'Moderate', color: 'text-yellow-400' };
    if (height < 4) return { category: 'Rough', color: 'text-orange-400' };
    return { category: 'High', color: 'text-red-400' };
  };

  const waveHeightInfo = getWaveHeightCategory(current.wave_height);

  return (
    <div className="glass-container p-4 rounded-xl">
      <div className="flex items-center space-x-2 mb-3">
        <FaWater className="text-blue-400 text-glow" />
        <h3 className="text-white font-semibold">Marine Weather</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaWater className="text-blue-300" />
            <span className="text-gray-300 text-sm">Wave Height</span>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${waveHeightInfo.color}`}>
              {formatNumber(current.wave_height, 1, 'm')}
            </div>
            <div className="text-xs text-gray-400">{waveHeightInfo.category}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaArrowUp className="text-green-300" />
            <span className="text-gray-300 text-sm">Direction</span>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">
              {formatNumber(current.wave_direction, 0, ' deg')}
            </div>
            <div className="text-xs text-gray-400">
              {getDirectionText(current.wave_direction)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaClock className="text-purple-300" />
            <span className="text-gray-300 text-sm">Period</span>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">
              {formatNumber(current.wave_period, 1, 's')}
            </div>
            <div className="text-xs text-gray-400">
              {!isFiniteNumber(current.wave_period) ? 'N/A' :
                current.wave_period < 5 ? 'Short' :
                  current.wave_period < 8 ? 'Medium' : 'Long'}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <FaWind className="text-cyan-300" />
            <span className="text-gray-300 text-sm">Wind Waves</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">Height:</span>
              <span className="text-white ml-1">{formatNumber(current.wind_wave_height, 1, 'm')}</span>
            </div>
            <div>
              <span className="text-gray-400">Period:</span>
              <span className="text-white ml-1">{formatNumber(current.wind_wave_period, 1, 's')}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <FaWater className="text-blue-300" />
            <span className="text-gray-300 text-sm">Swell Waves</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">Height:</span>
              <span className="text-white ml-1">{formatNumber(current.swell_wave_height, 1, 'm')}</span>
            </div>
            <div>
              <span className="text-gray-400">Period:</span>
              <span className="text-white ml-1">{formatNumber(current.swell_wave_period, 1, 's')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineWeatherCard;

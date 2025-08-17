import React from 'react';
import { MarineWeather } from '../types';
import { FaWater, FaWind, FaArrowUp, FaClock } from 'react-icons/fa';

interface MarineWeatherCardProps {
  marineData: MarineWeather | null;
  loading: boolean;
}

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

  if (!marineData) {
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

  const getWaveHeightCategory = (height: number) => {
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
        {/* Wave Height */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaWater className="text-blue-300" />
            <span className="text-gray-300 text-sm">Wave Height</span>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${waveHeightInfo.color}`}>
              {current.wave_height.toFixed(1)}m
            </div>
            <div className="text-xs text-gray-400">{waveHeightInfo.category}</div>
          </div>
        </div>

        {/* Wave Direction */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaArrowUp className="text-green-300" />
            <span className="text-gray-300 text-sm">Direction</span>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">
              {current.wave_direction}°
            </div>
            <div className="text-xs text-gray-400">
              {current.wave_direction >= 337.5 || current.wave_direction < 22.5 ? 'N' :
               current.wave_direction >= 22.5 && current.wave_direction < 67.5 ? 'NE' :
               current.wave_direction >= 67.5 && current.wave_direction < 112.5 ? 'E' :
               current.wave_direction >= 112.5 && current.wave_direction < 157.5 ? 'SE' :
               current.wave_direction >= 157.5 && current.wave_direction < 202.5 ? 'S' :
               current.wave_direction >= 202.5 && current.wave_direction < 247.5 ? 'SW' :
               current.wave_direction >= 247.5 && current.wave_direction < 292.5 ? 'W' : 'NW'}
            </div>
          </div>
        </div>

        {/* Wave Period */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaClock className="text-purple-300" />
            <span className="text-gray-300 text-sm">Period</span>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold">
              {current.wave_period}s
            </div>
            <div className="text-xs text-gray-400">
              {current.wave_period < 5 ? 'Short' : 
               current.wave_period < 8 ? 'Medium' : 'Long'}
            </div>
          </div>
        </div>

        {/* Wind Waves */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <FaWind className="text-cyan-300" />
            <span className="text-gray-300 text-sm">Wind Waves</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">Height:</span>
              <span className="text-white ml-1">{current.wind_wave_height.toFixed(1)}m</span>
            </div>
            <div>
              <span className="text-gray-400">Period:</span>
              <span className="text-white ml-1">{current.wind_wave_period}s</span>
            </div>
          </div>
        </div>

        {/* Swell Waves */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <FaWater className="text-blue-300" />
            <span className="text-gray-300 text-sm">Swell Waves</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">Height:</span>
              <span className="text-white ml-1">{current.swell_wave_height.toFixed(1)}m</span>
            </div>
            <div>
              <span className="text-gray-400">Period:</span>
              <span className="text-white ml-1">{current.swell_wave_period}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineWeatherCard;

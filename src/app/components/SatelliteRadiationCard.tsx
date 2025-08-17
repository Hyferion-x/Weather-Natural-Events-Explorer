import React from 'react';
import { SatelliteRadiationData } from '../types';
import { FaSun, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

interface SatelliteRadiationCardProps {
  radiationData: SatelliteRadiationData | null;
  loading: boolean;
}

const SatelliteRadiationCard: React.FC<SatelliteRadiationCardProps> = ({ radiationData, loading }) => {
  if (loading) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaSun className="text-yellow-400 text-glow" />
          <h3 className="text-white font-semibold">Solar Radiation</h3>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!radiationData) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaSun className="text-yellow-400 text-glow" />
          <h3 className="text-white font-semibold">Solar Radiation</h3>
        </div>
        <p className="text-gray-400 text-sm">No radiation data available</p>
      </div>
    );
  }

  const { current } = radiationData;

  const getUVIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400', bgColor: 'bg-green-500/20', advice: 'No protection required' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', advice: 'Take precautions' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400', bgColor: 'bg-orange-500/20', advice: 'Protection required' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400', bgColor: 'bg-red-500/20', advice: 'Extra protection needed' };
    return { level: 'Extreme', color: 'text-purple-400', bgColor: 'bg-purple-500/20', advice: 'Avoid sun exposure' };
  };

  const uvInfo = getUVIndexCategory(current.uv_index);

  const formatRadiation = (value: number) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)} kW/m²`;
    return `${value.toFixed(0)} W/m²`;
  };

  return (
    <div className="glass-container p-4 rounded-xl">
      <div className="flex items-center space-x-2 mb-3">
        <FaSun className="text-yellow-400 text-glow" />
        <h3 className="text-white font-semibold">Solar Radiation</h3>
      </div>
      
      <div className="space-y-3">
        {/* UV Index */}
        <div className={`p-3 rounded-lg ${uvInfo.bgColor}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">UV Index</span>
            <div className={`font-bold text-lg ${uvInfo.color}`}>
              {current.uv_index.toFixed(1)}
            </div>
          </div>
          <div className={`text-xs ${uvInfo.color}`}>
            {uvInfo.level}
          </div>
        </div>

        {/* UV Protection Advice */}
        <div className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded-lg">
          {current.uv_index <= 5 ? (
            <FaShieldAlt className="text-green-400" />
          ) : (
            <FaExclamationTriangle className="text-orange-400" />
          )}
          <div>
            <div className="text-white text-sm font-medium">
              {uvInfo.advice}
            </div>
            <div className="text-xs text-gray-400">
              UV Protection
            </div>
          </div>
        </div>

        {/* Solar Radiation Values */}
        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-300 text-sm mb-2">Solar Radiation</div>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Direct Normal:</span>
              <span className="text-white">{formatRadiation(current.direct_normal_irradiance)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Diffuse:</span>
              <span className="text-white">{formatRadiation(current.diffuse_radiation)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Global Tilted:</span>
              <span className="text-white">{formatRadiation(current.global_tilted_irradiance)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Terrestrial:</span>
              <span className="text-white">{formatRadiation(current.terrestrial_radiation)}</span>
            </div>
          </div>
        </div>

        {/* Protection Tips */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <FaShieldAlt className="text-blue-400" />
            <span className="text-gray-300 text-sm">Protection Tips</span>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            {current.uv_index > 3 && (
              <>
                <div>• Use sunscreen (SPF 30+)</div>
                <div>• Wear protective clothing</div>
                <div>• Seek shade during peak hours</div>
                <div>• Wear UV-blocking sunglasses</div>
              </>
            )}
            {current.uv_index <= 3 && (
              <div>UV levels are low. Normal outdoor activities are safe.</div>
            )}
          </div>
        </div>

        {/* UV Scale */}
        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-300 text-sm mb-2">UV Index Scale</div>
          <div className="flex space-x-1">
            <div className="flex-1 h-2 bg-green-500 rounded-l"></div>
            <div className="flex-1 h-2 bg-yellow-500"></div>
            <div className="flex-1 h-2 bg-orange-500"></div>
            <div className="flex-1 h-2 bg-red-500"></div>
            <div className="flex-1 h-2 bg-purple-500 rounded-r"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0-2</span>
            <span>3-5</span>
            <span>6-7</span>
            <span>8-10</span>
            <span>11+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteRadiationCard;

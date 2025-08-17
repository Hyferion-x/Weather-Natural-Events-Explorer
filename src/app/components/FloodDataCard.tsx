import React from 'react';
import { FloodData } from '../types';
import { FaExclamationTriangle, FaWater, FaShieldAlt } from 'react-icons/fa';

interface FloodDataCardProps {
  floodData: FloodData | null;
  loading: boolean;
}

const FloodDataCard: React.FC<FloodDataCardProps> = ({ floodData, loading }) => {
  if (loading) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaExclamationTriangle className="text-orange-400 text-glow" />
          <h3 className="text-white font-semibold">Flood Risk</h3>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!floodData) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaExclamationTriangle className="text-orange-400 text-glow" />
          <h3 className="text-white font-semibold">Flood Risk</h3>
        </div>
        <p className="text-gray-400 text-sm">No flood data available</p>
      </div>
    );
  }

  const { current } = floodData;

  const getFloodRiskCategory = (index: number, risk: string) => {
    if (index <= 1 || risk.toLowerCase().includes('low')) {
      return { 
        level: 'Low Risk', 
        color: 'text-green-400', 
        bgColor: 'bg-green-500/20',
        icon: <FaShieldAlt className="text-green-400" />
      };
    }
    if (index <= 3 || risk.toLowerCase().includes('moderate')) {
      return { 
        level: 'Moderate Risk', 
        color: 'text-yellow-400', 
        bgColor: 'bg-yellow-500/20',
        icon: <FaExclamationTriangle className="text-yellow-400" />
      };
    }
    if (index <= 5 || risk.toLowerCase().includes('high')) {
      return { 
        level: 'High Risk', 
        color: 'text-orange-400', 
        bgColor: 'bg-orange-500/20',
        icon: <FaExclamationTriangle className="text-orange-400" />
      };
    }
    return { 
      level: 'Extreme Risk', 
      color: 'text-red-400', 
      bgColor: 'bg-red-500/20',
      icon: <FaExclamationTriangle className="text-red-400" />
    };
  };

  const riskInfo = getFloodRiskCategory(current.flood_index, current.flood_risk);

  const getSafetyAdvice = (index: number) => {
    if (index <= 1) {
      return 'Normal conditions. No immediate flood risk.';
    }
    if (index <= 3) {
      return 'Monitor weather updates. Be prepared for potential flooding.';
    }
    if (index <= 5) {
      return 'High risk of flooding. Avoid low-lying areas and watercourses.';
    }
    return 'Extreme flood risk. Evacuate if advised. Stay on higher ground.';
  };

  return (
    <div className="glass-container p-4 rounded-xl">
      <div className="flex items-center space-x-2 mb-3">
        <FaExclamationTriangle className="text-orange-400 text-glow" />
        <h3 className="text-white font-semibold">Flood Risk</h3>
      </div>
      
      <div className="space-y-3">
        {/* Flood Index */}
        <div className={`p-3 rounded-lg ${riskInfo.bgColor}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <FaWater className="text-blue-300" />
              <span className="text-gray-300 text-sm">Flood Index</span>
            </div>
            <div className={`font-bold text-lg ${riskInfo.color}`}>
              {current.flood_index.toFixed(1)}
            </div>
          </div>
          <div className={`text-xs ${riskInfo.color}`}>
            {riskInfo.level}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded-lg">
          {riskInfo.icon}
          <div>
            <div className="text-white text-sm font-medium">
              {current.flood_risk}
            </div>
            <div className="text-xs text-gray-400">
              Risk Assessment
            </div>
          </div>
        </div>

        {/* Safety Advice */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <FaShieldAlt className="text-blue-400" />
            <span className="text-gray-300 text-sm">Safety Advice</span>
          </div>
          <div className="text-xs text-gray-400">
            {getSafetyAdvice(current.flood_index)}
          </div>
        </div>

        {/* Emergency Info */}
        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-300 text-sm mb-2">Emergency Information</div>
          <div className="text-xs text-gray-400 space-y-1">
            <div>• Monitor local weather alerts</div>
            <div>• Have emergency kit ready</div>
            <div>• Know evacuation routes</div>
            <div>• Stay informed via radio/TV</div>
          </div>
        </div>

        {/* Risk Level Scale */}
        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-300 text-sm mb-2">Risk Scale</div>
          <div className="flex space-x-1">
            <div className="flex-1 h-2 bg-green-500 rounded-l"></div>
            <div className="flex-1 h-2 bg-yellow-500"></div>
            <div className="flex-1 h-2 bg-orange-500"></div>
            <div className="flex-1 h-2 bg-red-500 rounded-r"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
            <span>Extreme</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodDataCard;

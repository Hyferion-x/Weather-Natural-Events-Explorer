'use client';

import React from 'react';
import Modal from './Modal';
import { FloodData } from '../types';
import { FaWater, FaExclamationTriangle, FaShieldAlt, FaChartBar, FaInfoCircle } from 'react-icons/fa';

interface FloodDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  floodData: FloodData | null;
  loading: boolean;
}

const FloodDataModal: React.FC<FloodDataModalProps> = ({ 
  isOpen, 
  onClose, 
  floodData, 
  loading 
}) => {
  const getFloodRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return { color: 'text-red-400', bgColor: 'bg-red-900/20', borderColor: 'border-red-900/30' };
      case 'medium':
        return { color: 'text-orange-400', bgColor: 'bg-orange-900/20', borderColor: 'border-orange-900/30' };
      case 'low':
        return { color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', borderColor: 'border-yellow-900/30' };
      default:
        return { color: 'text-green-400', bgColor: 'bg-green-900/20', borderColor: 'border-green-900/30' };
    }
  };

  const getFloodAdvice = (risk: string, index: number) => {
    if (risk.toLowerCase() === 'high' || index >= 3) {
      return {
        title: 'High Flood Risk',
        advice: 'Immediate action required. Monitor local authorities for evacuation orders.',
        recommendations: [
          'Move to higher ground immediately',
          'Avoid walking or driving through floodwaters',
          'Follow local emergency instructions',
          'Keep emergency supplies ready',
          'Stay informed through local news'
        ]
      };
    } else if (risk.toLowerCase() === 'medium' || index >= 2) {
      return {
        title: 'Moderate Flood Risk',
        advice: 'Be prepared for potential flooding. Monitor weather conditions closely.',
        recommendations: [
          'Prepare emergency supplies',
          'Move valuable items to higher ground',
          'Monitor local weather updates',
          'Have an evacuation plan ready',
          'Avoid low-lying areas'
        ]
      };
    } else {
      return {
        title: 'Low Flood Risk',
        advice: 'Current conditions show minimal flood risk, but stay informed.',
        recommendations: [
          'Monitor weather forecasts',
          'Keep emergency contacts handy',
          'Know your evacuation routes',
          'Stay informed about local conditions'
        ]
      };
    }
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Flood Risk Assessment">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Modal>
    );
  }

  if (!floodData || !floodData.current) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Flood Risk Assessment">
        <div className="text-center py-6 text-gray-400">
          No flood risk data available for this location
        </div>
      </Modal>
    );
  }

  const current = floodData.current;
  const riskColors = getFloodRiskColor(current.flood_risk);
  const advice = getFloodAdvice(current.flood_risk, current.flood_index);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Flood Risk Assessment">
      <div className="space-y-6">
        {/* Current Risk Level */}
        <div className={`${riskColors.bgColor} p-4 rounded-lg border ${riskColors.borderColor}`}>
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaWater className="mr-2 text-blue-400" />
            Current Flood Risk
          </h3>
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold ${riskColors.color}`}>{current.flood_risk}</div>
            <div className="text-sm text-gray-300 mt-1">Risk Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{current.flood_index}/3</div>
            <div className="text-sm text-gray-300">Flood Index</div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaChartBar className="mr-2 text-blue-400" />
            Risk Assessment
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-300">Flood Index Scale:</div>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-full"
                    style={{ width: `${(current.flood_index / 3) * 100}%` }}
                  ></div>
                </div>
                <span className="text-white font-semibold ml-2">{current.flood_index}/3</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded mx-auto mb-1"></div>
                <span className="text-gray-300">Low (0-1)</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mx-auto mb-1"></div>
                <span className="text-gray-300">Medium (2)</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-red-500 rounded mx-auto mb-1"></div>
                <span className="text-gray-300">High (3)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Advice */}
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaShieldAlt className="mr-2 text-yellow-400" />
            {advice.title}
          </h3>
          <div className="text-sm text-gray-300 space-y-3">
            <p>{advice.advice}</p>
            <div>
              <p className="text-yellow-400 font-semibold mb-2">Recommendations:</p>
              <ul className="list-disc list-inside space-y-1">
                {advice.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-400" />
            Emergency Information
          </h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p><strong>Emergency Numbers:</strong></p>
            <ul className="space-y-1">
              <li>• Emergency Services: 911 (US) / 112 (EU)</li>
              <li>• Local Weather Service</li>
              <li>• Local Emergency Management</li>
            </ul>
            <div className="mt-3 p-2 bg-black/20 rounded">
              <p className="text-yellow-400 font-semibold">⚠️ Remember:</p>
              <p className="text-xs">Turn around, don't drown! Never walk or drive through floodwaters.</p>
            </div>
          </div>
        </div>

        {/* Information Note */}
        <div className="bg-gray-900/20 p-4 rounded-lg border border-gray-900/30">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-300">
              <p><strong>Note:</strong> This flood risk assessment is based on precipitation data and local conditions. 
              Always follow official warnings from local authorities and emergency services.</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FloodDataModal;

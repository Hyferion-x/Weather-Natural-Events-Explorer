'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { FaExclamationCircle, FaBolt, FaWind, FaThermometerFull, FaSnowflake, FaCloudRain } from 'react-icons/fa';

interface WeatherAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample weather alerts data for demonstration purposes
const sampleAlerts = [
  {
    id: 1,
    type: 'severe',
    title: 'Severe Thunderstorm Warning',
    region: 'Eastern United States',
    description: 'Severe thunderstorms capable of producing damaging winds and large hail moving through the region.',
    icon: <FaBolt className="text-yellow-400" />,
    time: '2023-07-15T14:30:00Z',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Extreme Heat Advisory',
    region: 'Southern Europe',
    description: 'Temperatures exceeding 40°C (104°F) expected over the next 3 days. Take precautions to avoid heat-related illness.',
    icon: <FaThermometerFull className="text-red-500" />,
    time: '2023-07-14T09:00:00Z',
  },
  {
    id: 3,
    type: 'warning',
    title: 'Hurricane Watch',
    region: 'Gulf of Mexico',
    description: 'Hurricane conditions possible within the next 48 hours. Prepare for potential evacuation.',
    icon: <FaWind className="text-blue-400" />,
    time: '2023-07-13T20:15:00Z',
  },
  {
    id: 4,
    type: 'advisory',
    title: 'Winter Storm Advisory',
    region: 'Northern Canada',
    description: 'Snowfall of 10-15 cm expected overnight with reduced visibility. Exercise caution while driving.',
    icon: <FaSnowflake className="text-blue-200" />,
    time: '2023-07-12T18:45:00Z',
  },
  {
    id: 5,
    type: 'watch',
    title: 'Flood Watch',
    region: 'Southeast Asia',
    description: 'Heavy rainfall may lead to flooding in low-lying areas. Stay informed about rising water levels.',
    icon: <FaCloudRain className="text-blue-500" />,
    time: '2023-07-11T11:30:00Z',
  },
];

const WeatherAlertsModal: React.FC<WeatherAlertsModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredAlerts = filter === 'all' 
    ? sampleAlerts 
    : sampleAlerts.filter(alert => alert.type === filter);

  const getAlertBackground = (type: string) => {
    switch (type) {
      case 'severe': return 'bg-red-900/20 border-red-900/30';
      case 'warning': return 'bg-orange-900/20 border-orange-900/30';
      case 'watch': return 'bg-yellow-900/20 border-yellow-900/30';
      case 'advisory': return 'bg-blue-900/20 border-blue-900/30';
      default: return 'bg-gray-900/20 border-gray-900/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Weather Alerts">
      <div>
        <div className="mb-4">
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 rounded-full text-xs ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              All Alerts
            </button>
            <button 
              onClick={() => setFilter('severe')} 
              className={`px-3 py-1 rounded-full text-xs ${filter === 'severe' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Severe
            </button>
            <button 
              onClick={() => setFilter('warning')} 
              className={`px-3 py-1 rounded-full text-xs ${filter === 'warning' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Warning
            </button>
            <button 
              onClick={() => setFilter('watch')} 
              className={`px-3 py-1 rounded-full text-xs ${filter === 'watch' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Watch
            </button>
            <button 
              onClick={() => setFilter('advisory')} 
              className={`px-3 py-1 rounded-full text-xs ${filter === 'advisory' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Advisory
            </button>
          </div>
        </div>
        
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-6 text-gray-400">No alerts match your filter</div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border ${getAlertBackground(alert.type)}`}
              >
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-xl">
                    {alert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white">{alert.title}</h3>
                      <span className="text-xs bg-black/20 px-2 py-1 rounded capitalize text-gray-300">
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-sm text-blue-200 mb-2">{alert.region}</p>
                    <p className="text-sm mb-2">{alert.description}</p>
                    <p className="text-xs text-gray-400">Issued: {formatDate(alert.time)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default WeatherAlertsModal; 
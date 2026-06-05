import React from 'react';
import { AirQualityData } from '../types';
import { FaCloud, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

interface AirQualityCardProps {
  airQualityData: AirQualityData | null;
  loading: boolean;
}

const isFiniteNumber = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const formatAqi = (value: number | null | undefined) =>
  isFiniteNumber(value) ? Math.round(value).toString() : 'N/A';

const getAQICategory = (aqi: number | null | undefined) => {
  if (!isFiniteNumber(aqi)) {
    return { level: 'Unavailable', color: 'text-gray-400', bgColor: 'bg-gray-500/20' };
  }
  if (aqi <= 50) return { level: 'Good', color: 'text-green-400', bgColor: 'bg-green-500/20' };
  if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-400', bgColor: 'bg-orange-500/20' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-400', bgColor: 'bg-red-500/20' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-400', bgColor: 'bg-purple-500/20' };
  return { level: 'Hazardous', color: 'text-red-600', bgColor: 'bg-red-600/20' };
};

const getHealthAdvice = (aqi: number | null | undefined) => {
  if (!isFiniteNumber(aqi)) return 'Air quality data is unavailable for this location.';
  if (aqi <= 50) return 'Air quality is good. Enjoy outdoor activities.';
  if (aqi <= 100) return 'Air quality is acceptable. Sensitive individuals may experience minor symptoms.';
  if (aqi <= 150) return 'Sensitive groups should reduce outdoor activities.';
  if (aqi <= 200) return 'Everyone should reduce outdoor activities.';
  if (aqi <= 300) return 'Avoid outdoor activities. Stay indoors.';
  return 'Emergency conditions. Avoid all outdoor activities.';
};

const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQualityData, loading }) => {
  if (loading) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaCloud className="text-blue-400 text-glow" />
          <h3 className="text-white font-semibold">Air Quality</h3>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!airQualityData || !airQualityData.current) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaCloud className="text-blue-400 text-glow" />
          <h3 className="text-white font-semibold">Air Quality</h3>
        </div>
        <p className="text-gray-400 text-sm">No air quality data available</p>
      </div>
    );
  }

  const { current } = airQualityData;
  const usAQI = getAQICategory(current.us_aqi);
  const euAQI = getAQICategory(current.european_aqi);
  const primaryAqi = isFiniteNumber(current.us_aqi) ? current.us_aqi : current.european_aqi;

  return (
    <div className="glass-container p-4 rounded-xl">
      <div className="flex items-center space-x-2 mb-3">
        <FaCloud className="text-blue-400 text-glow" />
        <h3 className="text-white font-semibold">Air Quality</h3>
      </div>

      <div className="space-y-3">
        <div className={`p-3 rounded-lg ${usAQI.bgColor}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">US AQI</span>
            <div className={`font-bold text-lg ${usAQI.color}`}>
              {formatAqi(current.us_aqi)}
            </div>
          </div>
          <div className={`text-xs ${usAQI.color}`}>
            {usAQI.level}
          </div>
        </div>

        <div className={`p-3 rounded-lg ${euAQI.bgColor}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">European AQI</span>
            <div className={`font-bold text-lg ${euAQI.color}`}>
              {formatAqi(current.european_aqi)}
            </div>
          </div>
          <div className={`text-xs ${euAQI.color}`}>
            {euAQI.level}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-300 text-sm mb-2">Key Pollutants</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">PM2.5:</span>
              <span className="text-white">{formatAqi(current.us_aqi_pm2_5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">PM10:</span>
              <span className="text-white">{formatAqi(current.us_aqi_pm10)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">NO2:</span>
              <span className="text-white">{formatAqi(current.us_aqi_no2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">O3:</span>
              <span className="text-white">{formatAqi(current.us_aqi_o3)}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            {isFiniteNumber(primaryAqi) && primaryAqi <= 100 ? (
              <FaCheckCircle className="text-green-400" />
            ) : (
              <FaExclamationTriangle className="text-yellow-400" />
            )}
            <span className="text-gray-300 text-sm">Health Advice</span>
          </div>
          <div className="text-xs text-gray-400">
            {getHealthAdvice(primaryAqi)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;

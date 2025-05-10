'use client';

import React from 'react';
import { FaTemperatureLow, FaTemperatureHigh, FaWind, FaTint, FaSun, FaMoon } from 'react-icons/fa';

// Helper for Open-Meteo weathercode
const weatherCodeMap: Record<number, { desc: string; icon: string }> = {
  0: { desc: 'Clear sky', icon: '☀️' },
  1: { desc: 'Mainly clear', icon: '🌤️' },
  2: { desc: 'Partly cloudy', icon: '⛅' },
  3: { desc: 'Overcast', icon: '☁️' },
  45: { desc: 'Fog', icon: '🌫️' },
  48: { desc: 'Depositing rime fog', icon: '🌫️' },
  51: { desc: 'Drizzle: Light', icon: '🌦️' },
  53: { desc: 'Drizzle: Moderate', icon: '🌦️' },
  55: { desc: 'Drizzle: Dense', icon: '🌧️' },
  56: { desc: 'Freezing Drizzle: Light', icon: '🌧️' },
  57: { desc: 'Freezing Drizzle: Dense', icon: '🌧️' },
  61: { desc: 'Rain: Slight', icon: '🌦️' },
  63: { desc: 'Rain: Moderate', icon: '🌧️' },
  65: { desc: 'Rain: Heavy', icon: '🌧️' },
  66: { desc: 'Freezing Rain: Light', icon: '🌧️' },
  67: { desc: 'Freezing Rain: Heavy', icon: '🌧️' },
  71: { desc: 'Snow fall: Slight', icon: '🌨️' },
  73: { desc: 'Snow fall: Moderate', icon: '🌨️' },
  75: { desc: 'Snow fall: Heavy', icon: '❄️' },
  77: { desc: 'Snow grains', icon: '❄️' },
  80: { desc: 'Rain showers: Slight', icon: '🌦️' },
  81: { desc: 'Rain showers: Moderate', icon: '🌧️' },
  82: { desc: 'Rain showers: Violent', icon: '🌧️' },
  85: { desc: 'Snow showers: Slight', icon: '🌨️' },
  86: { desc: 'Snow showers: Heavy', icon: '❄️' },
  95: { desc: 'Thunderstorm: Slight/Moderate', icon: '⛈️' },
  96: { desc: 'Thunderstorm w/ slight hail', icon: '⛈️' },
  99: { desc: 'Thunderstorm w/ heavy hail', icon: '⛈️' },
};

interface WeatherCardProps {
  weatherData: any;
  forecastData?: any | null;
  yesterdayData?: any | null;
  loading: boolean;
  locationName?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, forecastData, yesterdayData, loading, locationName }) => {
  if (loading) {
    return (
      <div className="glass-card animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weatherData || !weatherData.current_weather) {
    return (
      <div className="glass-card">
        <p className="text-center text-gray-300">Select a location on the map to see weather data</p>
      </div>
    );
  }

  // Current weather
  const current = weatherData.current_weather;
  const displayLocation = locationName || weatherData.name || '';
  const weatherCode = weatherCodeMap[current.weathercode] || { desc: 'Unknown', icon: '❓' };

  // Tomorrow's forecast (from forecastData.daily)
  let tomorrow = null;
  if (forecastData && forecastData.daily && forecastData.daily.time && forecastData.daily.time.length > 1) {
    tomorrow = {
      temp_max: forecastData.daily.temperature_2m_max[1],
      temp_min: forecastData.daily.temperature_2m_min[1],
      weathercode: forecastData.daily.weathercode[1],
      date: forecastData.daily.time[1],
    };
  }

  // Yesterday's weather (from yesterdayData.daily)
  let yesterday = null;
  if (yesterdayData && yesterdayData.daily && yesterdayData.daily.time && yesterdayData.daily.time.length > 0) {
    yesterday = {
      temp_max: yesterdayData.daily.temperature_2m_max[0],
      temp_min: yesterdayData.daily.temperature_2m_min[0],
      weathercode: yesterdayData.daily.weathercode[0],
      date: yesterdayData.daily.time[0],
    };
  }

  return (
    <div className="glass-card animate-fadeIn">
      {/* Current Weather */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white truncate max-w-[70%]" title={displayLocation}>{displayLocation}</h2>
        <span className="text-4xl" title={weatherCode.desc}>{weatherCode.icon}</span>
      </div>
      <div className="mb-6">
        <p className="text-4xl font-bold mb-2 text-white flex items-center gap-2">
          <FaTemperatureHigh className="inline-block text-yellow-300" />
          {Math.round(current.temperature)}°C
        </p>
        <p className="text-gray-300 capitalize">{weatherCode.desc}</p>
        <div className="flex gap-4 mt-2">
          <span className="flex items-center gap-1 text-blue-200"><FaTemperatureLow />Min: --°C</span>
          <span className="flex items-center gap-1 text-pink-200"><FaTemperatureHigh />Max: --°C</span>
        </div>
      </div>
      {/* Unified grid for all info cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-2">
        <div className="bg-white/5 backdrop-blur p-3 rounded flex items-center gap-2 text-white h-full min-h-[120px]">
          <FaWind className="text-blue-300" />
          <div>
            <p className="text-gray-400 mb-1">Wind</p>
            <p className="font-medium">{current.windspeed} m/s</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur p-3 rounded flex items-center gap-2 text-white h-full min-h-[120px]">
          <FaTint className="text-blue-200" />
          <div>
            <p className="text-gray-400 mb-1">Humidity</p>
            <p className="font-medium">--%</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur p-3 rounded flex items-center gap-2 text-white h-full min-h-[120px]">
          <FaSun className="text-yellow-200" />
          <div>
            <p className="text-gray-400 mb-1">Sunrise</p>
            <p className="font-medium">--</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur p-3 rounded flex items-center gap-2 text-white h-full min-h-[120px]">
          <FaMoon className="text-indigo-200" />
          <div>
            <p className="text-gray-400 mb-1">Sunset</p>
            <p className="font-medium">--</p>
          </div>
        </div>
        {tomorrow && (
          <div className="flex flex-col justify-center items-center bg-white/5 backdrop-blur rounded p-3 h-full min-h-[120px]">
            <h3 className="text-base font-semibold mb-1 text-white">Tomorrow</h3>
            <span className="text-2xl mb-1" title={weatherCodeMap[tomorrow.weathercode]?.desc}>{weatherCodeMap[tomorrow.weathercode]?.icon}</span>
            <p className="text-xl font-bold text-white flex items-center gap-2"><FaTemperatureHigh className="text-yellow-300" />{Math.round(tomorrow.temp_max)}°C</p>
            <p className="text-gray-300 text-xs text-center">{weatherCodeMap[tomorrow.weathercode]?.desc}</p>
          </div>
        )}
        {yesterday && (
          <div className="flex flex-col justify-center items-center bg-white/5 backdrop-blur rounded p-3 h-full min-h-[120px]">
            <h3 className="text-base font-semibold mb-1 text-white">Yesterday</h3>
            <span className="text-2xl mb-1" title={weatherCodeMap[yesterday.weathercode]?.desc}>{weatherCodeMap[yesterday.weathercode]?.icon}</span>
            <p className="text-xl font-bold text-white flex items-center gap-2"><FaTemperatureHigh className="text-yellow-300" />{Math.round(yesterday.temp_max)}°C</p>
            <p className="text-gray-300 text-xs text-center">{weatherCodeMap[yesterday.weathercode]?.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard; 
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import NaturalEvents from './components/NaturalEvents';
import { getWeatherData, getForecastWeather, getHistoricalWeather, reverseGeocode } from './services/api';
import WeatherBackground from './components/WeatherBackground';
import WorldClock from './components/WorldClock';

// Import Map component dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p>Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  } | null>(null);
  
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [forecastData, setForecastData] = useState<any | null>(null);
  const [yesterdayData, setYesterdayData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historicalError, setHistoricalError] = useState<string | null>(null);

  // Fetch weather data when a location is selected
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!selectedLocation) return;
      setLoading(true);
      setHistoricalError(null);
      try {
        // Current
        const data = await getWeatherData(selectedLocation.lat, selectedLocation.lng);
        setWeatherData(data);
        // Forecast
        const forecast = await getForecastWeather(selectedLocation.lat, selectedLocation.lng);
        setForecastData(forecast);
        // Yesterday (historical)
        const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // YYYY-MM-DD
        try {
          const yesterday = await getHistoricalWeather(selectedLocation.lat, selectedLocation.lng, yesterdayDate);
          setYesterdayData(yesterday);
        } catch (err: any) {
          setHistoricalError('Failed to fetch historical weather.');
          setYesterdayData(null);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data. Please try again.');
        setWeatherData(null);
        setForecastData(null);
        setYesterdayData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [selectedLocation]);

  // Handle selecting a location from the map
  const handleMapLocationSelect = async (lat: number, lng: number) => {
    try {
      // Get location name from coordinates using reverse geocoding
      const geocodeData = await reverseGeocode(lat, lng);
      const locationName = geocodeData?.display_name || 'Unknown location';
      
      setSelectedLocation({
        lat,
        lng,
        name: locationName,
      });
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      setSelectedLocation({
        lat,
        lng,
      });
    }
  };

  // Handle selecting a location from search
  const handleSearchLocationSelect = (lat: number, lng: number, locationName: string) => {
    setSelectedLocation({
      lat,
      lng,
      name: locationName,
    });
  };

  // Handle selecting an event from the list
  const handleEventSelect = (lat: number, lng: number, title: string) => {
    setSelectedLocation({
      lat,
      lng,
      name: title,
    });
  };

  // Add geolocation support
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const geocodeData = await reverseGeocode(latitude, longitude);
            const locationName = geocodeData?.display_name || 'Your Location';
            setSelectedLocation({ lat: latitude, lng: longitude, name: locationName });
          } catch {
            setSelectedLocation({ lat: latitude, lng: longitude, name: 'Your Location' });
          }
          setLoading(false);
        },
        (error) => {
          setError('Unable to get your location.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col bg-[#10131a] bg-gradient-to-br from-[#10131a] to-[#232946] p-0 relative overflow-x-hidden">
      <WeatherBackground weathercode={weatherData?.current_weather?.weathercode} />
      {/* Header */}
      <header className="w-full flex flex-row items-center justify-between py-6 px-2 md:px-8 gap-4 md:gap-0">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-left whitespace-nowrap animated-gradient-title drop-shadow-lg">
          Weather & Natural Events Explorer
        </h1>
      </header>
      {/* Search Bar Row - full width above map */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 px-2 md:px-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <SearchBox onLocationSelect={handleSearchLocationSelect} />
          <button className="glass-btn w-full sm:w-auto transition hover:scale-105 active:scale-95" onClick={handleUseMyLocation}>Use My Location</button>
        </div>
        {error && <p className="mt-2 text-red-400 text-xs text-center md:text-left w-full">{error}</p>}
      </div>
      {/* Main 2-column layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-2 md:px-4 pb-12">
        {/* Left: Map (spans 2 columns on desktop) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col h-full">
          <div className="glass-container overflow-hidden rounded-2xl h-[400px] md:h-[600px] w-full flex-1 min-h-[350px]">
            <Map 
              center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : undefined}
              zoom={selectedLocation ? 8 : 2}
              onLocationSelect={handleMapLocationSelect}
            />
          </div>
        </div>
        {/* Right: World Clock, Weather Card, Natural Events stacked */}
        <div className="col-span-1 flex flex-col h-full gap-6">
          <div className="flex flex-col items-end mb-2">
            <WorldClock small />
          </div>
          <div className="flex flex-col items-end">
            <div className="w-full">
              <WeatherCard weatherData={weatherData} forecastData={forecastData} yesterdayData={yesterdayData} loading={loading} locationName={selectedLocation?.name} />
              {historicalError && <div className="text-xs text-red-400 mt-2">{historicalError}</div>}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-full">
              <NaturalEvents onEventSelect={handleEventSelect} />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full text-center text-sm text-gray-400 py-8 mt-auto">
        <div className="mb-2">
          Data provided by <span className="font-semibold text-blue-300">NASA EONET</span>, <span className="font-semibold text-blue-300">Open-Meteo</span>, and <span className="font-semibold text-blue-300">OpenStreetMap</span>.
        </div>
        <div className="mb-2">
          Built with <span className="font-semibold text-blue-300">Next.js</span>, <span className="font-semibold text-blue-300">Tailwind CSS</span>, <span className="font-semibold text-blue-300">Leaflet</span>, and <span className="font-semibold text-blue-300">React</span>.
        </div>
        <div className="mt-2">
          &copy; {new Date().getFullYear()} <span className="font-bold text-white">Zesky</span>
        </div>
      </footer>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import NaturalEvents from './components/NaturalEvents';
import { 
  getWeatherData, 
  getForecastWeather, 
  getHistoricalWeather, 
  reverseGeocode,
  getMarineWeather,
  getAirQuality,
  getFloodData,
  getSatelliteRadiation
} from './services/api';
import WeatherBackground from './components/WeatherBackground';
import FuturisticNavbar from './components/FuturisticNavbar';
import MarineWeatherCard from './components/MarineWeatherCard';
import AirQualityCard from './components/AirQualityCard';
import FloodDataCard from './components/FloodDataCard';
import SatelliteRadiationCard from './components/SatelliteRadiationCard';
import LocationDetailsCard from './components/LocationDetailsCard';
import { 
  WeatherData, 
  ForecastData, 
  MarineWeather, 
  AirQualityData, 
  FloodData, 
  SatelliteRadiationData, 
  EnhancedGeocodeResult 
} from './types';

// Dynamic Map (Leaflet SSR-safe)
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

  // Weather data states
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [yesterdayData, setYesterdayData] = useState<ForecastData | null>(null);

  // Feature data states
  const [marineData, setMarineData] = useState<MarineWeather | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [floodData, setFloodData] = useState<FloodData | null>(null);
  const [radiationData, setRadiationData] = useState<SatelliteRadiationData | null>(null);
  const [geocodeData, setGeocodeData] = useState<EnhancedGeocodeResult | null>(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historicalError, setHistoricalError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      if (!selectedLocation) return;
      setLoading(true);
      setHistoricalError(null);
      setError(null);

      try {
        const [
          basicResult,
          marineResult,
          airQualityResult,
          floodResult,
          radiationResult,
          geoResult
        ] = await Promise.allSettled([
          getWeatherData(selectedLocation.lat, selectedLocation.lng),
          getMarineWeather(selectedLocation.lat, selectedLocation.lng),
          getAirQuality(selectedLocation.lat, selectedLocation.lng),
          getFloodData(selectedLocation.lat, selectedLocation.lng),
          getSatelliteRadiation(selectedLocation.lat, selectedLocation.lng),
          reverseGeocode(selectedLocation.lat, selectedLocation.lng)
        ]);

        if (basicResult.status === 'fulfilled') {
          setWeatherData(basicResult.value);

          try {
            const [forecast, yesterday] = await Promise.allSettled([
              getForecastWeather(selectedLocation.lat, selectedLocation.lng),
              getHistoricalWeather(
                selectedLocation.lat,
                selectedLocation.lng,
                new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
              )
            ]);

            if (forecast.status === 'fulfilled') setForecastData(forecast.value);
            if (yesterday.status === 'fulfilled') setYesterdayData(yesterday.value);
            else setHistoricalError('Failed to fetch historical weather.');
          } catch {
            setHistoricalError('Failed to fetch forecast data.');
          }
        }

        if (marineResult.status === 'fulfilled') setMarineData(marineResult.value);
        if (airQualityResult.status === 'fulfilled') setAirQualityData(airQualityResult.value);
        if (floodResult.status === 'fulfilled') setFloodData(floodResult.value);
        if (radiationResult.status === 'fulfilled') setRadiationData(radiationResult.value);
        if (geoResult.status === 'fulfilled') setGeocodeData(geoResult.value);

      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data. Please try again.');
        setWeatherData(null);
        setForecastData(null);
        setYesterdayData(null);
        setMarineData(null);
        setAirQualityData(null);
        setFloodData(null);
        setRadiationData(null);
        setGeocodeData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWeatherData();
  }, [selectedLocation]);

  const handleMapLocationSelect = async (lat: number, lng: number) => {
    try {
      const geo = await reverseGeocode(lat, lng);
      setSelectedLocation({ lat, lng, name: geo?.display_name || 'Unknown location' });
    } catch {
      setSelectedLocation({ lat, lng });
    }
  };

  const handleSearchLocationSelect = (lat: number, lng: number, locationName: string) => {
    setSelectedLocation({ lat, lng, name: locationName });
  };

  const handleEventSelect = (lat: number, lng: number, title: string) => {
    setSelectedLocation({ lat, lng, name: title });
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const geo = await reverseGeocode(latitude, longitude);
            setSelectedLocation({ lat: latitude, lng: longitude, name: geo?.display_name || 'Your Location' });
          } catch {
            setSelectedLocation({ lat: latitude, lng: longitude, name: 'Your Location' });
          }
          setLoading(false);
        },
        () => {
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

      {/* Navbar */}
      <FuturisticNavbar 
        onUseMyLocation={handleUseMyLocation} 
        onEventSelect={handleEventSelect}
      />

      {/* Content */}
      <div className="pt-20 flex-1 flex flex-col">
        {/* Search */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 px-2 md:px-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <SearchBox onLocationSelect={handleSearchLocationSelect} />
          </div>
          {error && <p className="mt-2 text-red-400 text-xs text-center md:text-left w-full">{error}</p>}
        </div>

        {/* === Layout === */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-4 pb-12">

          {/* Mobile: stacked layout */}
          <div className="block lg:hidden space-y-6">
            {/* Map */}
            <div className="glass-container overflow-hidden rounded-2xl h-[440px] w-full">
              <Map
                center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : undefined}
                zoom={selectedLocation ? 8 : 2}
                onLocationSelect={handleMapLocationSelect}
              />
            </div>

            {/* Under the map: Weather + Events */}
            <div className="space-y-6">
              <WeatherCard
                weatherData={weatherData}
                forecastData={forecastData}
                yesterdayData={yesterdayData}
                loading={loading}
                locationName={selectedLocation?.name}
              />
              {historicalError && <div className="text-xs text-red-400">{historicalError}</div>}
              <NaturalEvents onEventSelect={handleEventSelect} />
            </div>

            {/* Sidecards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <LocationDetailsCard geocodeData={geocodeData} loading={loading} />
                <FloodDataCard floodData={floodData} loading={loading} />
              </div>
              <div className="flex flex-col gap-4">
                <SatelliteRadiationCard radiationData={radiationData} loading={loading} />
                <AirQualityCard airQualityData={airQualityData} loading={loading} />
                <MarineWeatherCard marineData={marineData} loading={loading} />
              </div>
            </div>
          </div>

          {/* Desktop: three columns + bottom row */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6">
            {/* LEFT of map */}
            <div className="col-span-3 flex flex-col gap-4">
              <LocationDetailsCard geocodeData={geocodeData} loading={loading} />
              <FloodDataCard floodData={floodData} loading={loading} />
            </div>

            {/* CENTER: Map */}
            <div className="col-span-6">
              <div className="glass-container overflow-hidden rounded-2xl h-[780px] xl:h-[880px] 2xl:h-[960px] w-full">
                <Map
                  center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : undefined}
                  zoom={selectedLocation ? 8 : 2}
                  onLocationSelect={handleMapLocationSelect}
                />
              </div>
            </div>

            {/* RIGHT of map */}
            <div className="col-span-3 flex flex-col gap-4">
              <SatelliteRadiationCard radiationData={radiationData} loading={loading} />
              <AirQualityCard airQualityData={airQualityData} loading={loading} />
              <MarineWeatherCard marineData={marineData} loading={loading} />
            </div>

                         {/* UNDER THE MAP: Weather (smaller) + Natural Events (wider) */}
             <div className="col-span-12 grid grid-cols-12 gap-6 mt-0">
                               {/* Weather (left - smaller) */}
                <div className="col-span-12 xl:col-span-4">
                  <div className="h-full min-h-[700px] [&>div]:w-full [&>div]:max-w-none [&>div]:mx-0 [&>div]:mb-0">
                    <WeatherCard
                      weatherData={weatherData}
                      forecastData={forecastData}
                      yesterdayData={yesterdayData}
                      loading={loading}
                      locationName={selectedLocation?.name}
                    />
                    {historicalError && <div className="text-xs text-red-400 mt-2">{historicalError}</div>}
                  </div>
                </div>

                {/* Natural Events (right - wider) */}
                <div className="col-span-12 xl:col-span-8">
                  <div className="h-full min-h-[700px] [&>div]:w-full [&>div]:max-w-none [&>div]:mx-0 [&>div]:mb-0">
                    <NaturalEvents onEventSelect={handleEventSelect} />
                  </div>
                </div>
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

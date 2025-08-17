import axios from 'axios';

// NASA EONET API for natural events
const nasaEonetApi = axios.create({
  baseURL: 'https://eonet.gsfc.nasa.gov/api/v3',
});

// OpenStreetMap Nominatim API for geocoding
const nominatimApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'WeatherApp/1.0',
  },
});

// Open-Meteo API base URL
const openMeteoBase = 'https://api.open-meteo.com/v1/forecast';

export const getNaturalEvents = async () => {
  try {
    const response = await nasaEonetApi.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching NASA EONET events:', error);
    throw error;
  }
};

export const getLocationFromSearch = async (searchQuery: string) => {
  try {
    const response = await nominatimApi.get('/search', {
      params: {
        q: searchQuery,
        format: 'json',
        limit: 5,
        addressdetails: 1,
        extratags: 1,
        namedetails: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

// Get current weather from Open-Meteo
export const getWeatherData = async (lat: number, lon: number) => {
  try {
    const url = `${openMeteoBase}?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get forecast (tomorrow) from Open-Meteo
export const getForecastWeather = async (lat: number, lon: number) => {
  try {
    const url = `${openMeteoBase}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast weather:', error);
    throw error;
  }
};

// Get historical weather (yesterday) from Open-Meteo
export const getHistoricalWeather = async (lat: number, lon: number, date: string) => {
  try {
    // date format: YYYY-MM-DD
    const url = `${openMeteoBase}?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};

// Get Marine Weather from Open-Meteo
export const getMarineWeather = async (lat: number, lon: number) => {
  try {
    const url = `${openMeteoBase}?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&hourly=wave_height,wave_direction,wave_period&timezone=auto`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching marine weather:', error);
    throw error;
  }
};

// Get Air Quality from Open-Meteo
export const getAirQuality = async (lat: number, lon: number) => {
  try {
    const url = `${openMeteoBase}?latitude=${lat}&longitude=${lon}&current=european_aqi,us_aqi&hourly=european_aqi,us_aqi&timezone=auto`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
};

// Get Flood Data from Open-Meteo (simulated - using precipitation data)
export const getFloodData = async (lat: number, lon: number) => {
  try {
    const url = `${openMeteoBase}?latitude=${lat}&longitude=${lon}&current=precipitation&daily=precipitation_sum&timezone=auto`;
    const response = await axios.get(url);
    
    // Calculate flood risk based on precipitation
    const data = response.data;
    const currentPrecip = data.current?.precipitation || 0;
    const dailyPrecip = data.daily?.precipitation_sum?.[0] || 0;
    
    // Simple flood risk calculation
    let floodRisk = 'Low';
    let floodIndex = 0;
    
    if (currentPrecip > 10 || dailyPrecip > 50) {
      floodRisk = 'High';
      floodIndex = 3;
    } else if (currentPrecip > 5 || dailyPrecip > 25) {
      floodRisk = 'Medium';
      floodIndex = 2;
    } else if (currentPrecip > 2 || dailyPrecip > 10) {
      floodRisk = 'Low';
      floodIndex = 1;
    }
    
    return {
      ...data,
      current: {
        ...data.current,
        flood_index: floodIndex,
        flood_risk: floodRisk,
      },
      daily: {
        ...data.daily,
        flood_index: [floodIndex],
        flood_risk: [floodRisk],
      },
    };
  } catch (error) {
    console.error('Error fetching flood data:', error);
    throw error;
  }
};

// Get Satellite Radiation Data from Open-Meteo
export const getSatelliteRadiation = async (lat: number, lon: number) => {
  try {
    const url = `${openMeteoBase}?latitude=${lat}&longitude=${lon}&current=uv_index,uv_index_clear_sky,direct_normal_irradiance,diffuse_radiation,terrestrial_radiation,terrestrial_radiation_instant,shortwave_radiation,shortwave_radiation_instant,global_tilted_irradiance,global_tilted_irradiance_instant&hourly=uv_index,uv_index_clear_sky,direct_normal_irradiance,diffuse_radiation&timezone=auto`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching satellite radiation:', error);
    throw error;
  }
};

// Enhanced reverse geocoding with additional details
export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const response = await nominatimApi.get('/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
        addressdetails: 1,
        extratags: 1,
        namedetails: 1,
        zoom: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
};

// Get comprehensive weather data (all types)
export const getComprehensiveWeatherData = async (lat: number, lon: number) => {
  try {
    const [basic, marine, airQuality, flood, radiation] = await Promise.allSettled([
      getWeatherData(lat, lon),
      getMarineWeather(lat, lon),
      getAirQuality(lat, lon),
      getFloodData(lat, lon),
      getSatelliteRadiation(lat, lon),
    ]);

    return {
      basic: basic.status === 'fulfilled' ? basic.value : null,
      marine: marine.status === 'fulfilled' ? marine.value : null,
      airQuality: airQuality.status === 'fulfilled' ? airQuality.value : null,
      flood: flood.status === 'fulfilled' ? flood.value : null,
      radiation: radiation.status === 'fulfilled' ? radiation.value : null,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching comprehensive weather data:', error);
    throw error;
  }
}; 
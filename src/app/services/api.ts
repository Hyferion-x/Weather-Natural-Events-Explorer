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

export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const response = await nominatimApi.get('/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
}; 
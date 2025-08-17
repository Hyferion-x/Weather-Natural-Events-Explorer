// Weather API types
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  name?: string;
}

export interface DailyWeatherUnit {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weathercode: string;
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface ForecastData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyWeatherUnit;
  daily: DailyWeather;
}

// Marine Weather types
export interface MarineWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    wave_height: number;
    wave_direction: number;
    wave_period: number;
    wind_wave_height: number;
    wind_wave_direction: number;
    wind_wave_period: number;
    swell_wave_height: number;
    swell_wave_direction: number;
    swell_wave_period: number;
  };
  hourly?: {
    time: string[];
    wave_height: number[];
    wave_direction: number[];
    wave_period: number[];
  };
}

// Air Quality types
export interface AirQualityData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    european_aqi: number;
    european_aqi_pm2_5: number;
    european_aqi_pm10: number;
    european_aqi_no2: number;
    european_aqi_o3: number;
    european_aqi_so2: number;
    us_aqi: number;
    us_aqi_pm2_5: number;
    us_aqi_pm10: number;
    us_aqi_no2: number;
    us_aqi_o3: number;
    us_aqi_so2: number;
    us_aqi_co: number;
  };
  hourly?: {
    time: string[];
    european_aqi: number[];
    us_aqi: number[];
  };
}

// Flood types
export interface FloodData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    flood_index: number;
    flood_risk: string;
  };
  daily?: {
    time: string[];
    flood_index: number[];
    flood_risk: string[];
  };
}

// Satellite Radiation types
export interface SatelliteRadiationData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    uv_index: number;
    uv_index_clear_sky: number;
    direct_normal_irradiance: number;
    diffuse_radiation: number;
    terrestrial_radiation: number;
    terrestrial_radiation_instant: number;
    shortwave_radiation: number;
    shortwave_radiation_instant: number;
    global_tilted_irradiance: number;
    global_tilted_irradiance_instant: number;
  };
  hourly?: {
    time: string[];
    uv_index: number[];
    uv_index_clear_sky: number[];
    direct_normal_irradiance: number[];
    diffuse_radiation: number[];
  };
}

// Natural events types
export interface EventCategory {
  id: string;
  title: string;
}

export interface EventGeometry {
  date: string;
  type: string;
  coordinates: number[];
}

export interface NaturalEvent {
  id: string;
  title: string;
  description: string;
  link: string;
  closed: string | null;
  categories: EventCategory[];
  sources: Array<{ id: string, url: string }>;
  geometry: EventGeometry[];
  created: string;
}

export interface NaturalEventsResponse {
  title: string;
  description: string;
  link: string;
  events: NaturalEvent[];
}

// Enhanced Location search types
export interface LocationSearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface ReverseGeocodeResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: Record<string, string>;
  boundingbox: string[];
}

// Enhanced Geocoding with additional details
export interface EnhancedGeocodeResult extends ReverseGeocodeResult {
  address: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  extratags?: Record<string, string>;
  namedetails?: Record<string, string>;
}

// Combined Weather Data for comprehensive view
export interface ComprehensiveWeatherData {
  basic: WeatherData | null;
  marine: MarineWeather | null;
  airQuality: AirQualityData | null;
  flood: FloodData | null;
  radiation: SatelliteRadiationData | null;
  loading: boolean;
  error: string | null;
} 
// Weather API types
export type NullableNumber = number | null;
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
    wave_height: NullableNumber;
    wave_direction: NullableNumber;
    wave_period: NullableNumber;
    wind_wave_height: NullableNumber;
    wind_wave_direction: NullableNumber;
    wind_wave_period: NullableNumber;
    swell_wave_height: NullableNumber;
    swell_wave_direction: NullableNumber;
    swell_wave_period: NullableNumber;
  };
  hourly?: {
    time: string[];
    wave_height: NullableNumber[];
    wave_direction: NullableNumber[];
    wave_period: NullableNumber[];
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
    european_aqi: NullableNumber;
    european_aqi_pm2_5: NullableNumber;
    european_aqi_pm10: NullableNumber;
    european_aqi_no2: NullableNumber;
    european_aqi_o3: NullableNumber;
    european_aqi_so2: NullableNumber;
    us_aqi: NullableNumber;
    us_aqi_pm2_5: NullableNumber;
    us_aqi_pm10: NullableNumber;
    us_aqi_no2: NullableNumber;
    us_aqi_o3: NullableNumber;
    us_aqi_so2: NullableNumber;
    us_aqi_co: NullableNumber;
  };
  hourly?: {
    time: string[];
    european_aqi: NullableNumber[];
    us_aqi: NullableNumber[];
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
    uv_index: NullableNumber;
    uv_index_clear_sky: NullableNumber;
    direct_normal_irradiance: NullableNumber;
    diffuse_radiation: NullableNumber;
    terrestrial_radiation: NullableNumber;
    terrestrial_radiation_instant: NullableNumber;
    shortwave_radiation: NullableNumber;
    shortwave_radiation_instant: NullableNumber;
    global_tilted_irradiance: NullableNumber;
    global_tilted_irradiance_instant: NullableNumber;
  };
  hourly?: {
    time: string[];
    uv_index: NullableNumber[];
    uv_index_clear_sky: NullableNumber[];
    direct_normal_irradiance: NullableNumber[];
    diffuse_radiation: NullableNumber[];
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
  class?: string;
  type?: string;
  importance?: number;
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

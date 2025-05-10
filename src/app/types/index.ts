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

// Location search types
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
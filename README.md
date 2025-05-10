# Weather & Natural Events Explorer

A modern web application that combines weather data with natural events from NASA's EONET API, using OpenStreetMap for location search and mapping.

## Features

- Interactive map display using Leaflet
- NASA EONET API integration to show natural events (wildfires, storms, etc.)
- OpenStreetMap Nominatim integration for geocoding and search
- Weather data display for selected locations
- Responsive design that works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet
- **API Requests**: Axios
- **APIs Used**:
  - NASA EONET API (Earth Observatory Natural Event Tracker)
  - OpenStreetMap Nominatim (geocoding)
  - OpenWeatherMap (weather data)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. Get an API key from [OpenWeatherMap](https://openweathermap.org/api) and add it to your `.env.local` file

5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Keys Required

- **OpenWeatherMap API Key**: Required for weather data. Get it from [here](https://openweathermap.org/api).
- **Google Maps API Key**: Optional if using Google Maps instead of OpenStreetMap. Get it from [Google Cloud Console](https://console.cloud.google.com/).

## Deployment

This app can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel project settings
4. Deploy!

## License

MIT

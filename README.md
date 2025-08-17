# Weather & Natural Events Explorer

A comprehensive modern web application that combines weather data with natural events from NASA's EONET API, using OpenStreetMap for location search and mapping. Features advanced weather analytics including marine conditions, air quality, flood risk assessment, and satellite radiation data.

## 🌟 Features

### Core Weather & Events
- **Interactive Map Display**: Using Leaflet with OpenStreetMap tiles
- **NASA EONET API Integration**: Real-time natural events tracking (wildfires, storms, volcanic activity, etc.)
- **OpenStreetMap Nominatim Integration**: Advanced geocoding and location search
- **Comprehensive Weather Data**: Current conditions, forecasts, and historical data
- **Responsive Design**: Optimized for both desktop and mobile devices

### Advanced Weather Analytics
- **Marine Weather**: Wave heights, directions, periods, wind waves, and swell data
- **Air Quality Monitoring**: European and US Air Quality Index with detailed pollutant breakdown
- **Flood Risk Assessment**: Real-time flood risk evaluation based on precipitation data
- **Satellite Radiation Data**: UV index, solar radiation, and sun protection recommendations
- **Enhanced Geocoding**: Detailed location information with address components and metadata

### User Experience
- **Futuristic UI Design**: Cyberpunk-inspired interface with glass morphism effects
- **Real-time Data**: Live updates from multiple weather and environmental APIs
- **Mobile-First Responsive**: Tabbed interface on mobile, side-by-side layout on desktop
- **Interactive Modals**: Detailed information displays for each weather category
- **Geolocation Support**: Automatic location detection with user permission

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 4 with custom animations
- **Mapping**: Leaflet with OpenStreetMap
- **API Requests**: Axios for HTTP client
- **Icons**: React Icons (FontAwesome)
- **State Management**: React Hooks with useState/useEffect

## 🌐 APIs Used

- **NASA EONET API**: Earth Observatory Natural Event Tracker
- **Open-Meteo API**: Weather, marine, air quality, and radiation data
- **OpenStreetMap Nominatim**: Geocoding and reverse geocoding
- **OpenStreetMap Tiles**: Map display and navigation

## 📱 Responsive Design

### Desktop Layout (lg+)
- **3-column grid**: Map spans 2 columns, weather cards in sidebar
- **Full navbar**: All features accessible in horizontal navigation
- **Side-by-side**: Weather and events displayed simultaneously

### Mobile Layout (< lg)
- **Stacked layout**: Map, then tabbed content below
- **Tab navigation**: Switch between Weather and Natural Events
- **Collapsible navbar**: Hamburger menu with all features
- **Optimized touch**: Larger touch targets and scrollable content

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Weather-Natural-Events-Explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Data Sources

### Weather Data (Open-Meteo)
- Current weather conditions
- 7-day forecasts
- Historical weather data
- Marine weather conditions
- Air quality indices
- Solar radiation and UV data

### Natural Events (NASA EONET)
- Wildfires
- Severe storms
- Volcanic eruptions
- Iceberg events
- Drought conditions
- And many more natural phenomena

### Location Data (OpenStreetMap)
- Global geocoding
- Reverse geocoding
- Detailed address information
- Administrative boundaries
- Points of interest

## 🎨 UI/UX Features

### Visual Design
- **Dark Theme**: Cyberpunk-inspired dark interface
- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Dynamic weather-based backgrounds
- **Glow Effects**: Animated text and button highlights
- **Scan Lines**: Subtle CRT monitor effect overlay

### Animations
- **Fade-in Effects**: Smooth component transitions
- **Hover States**: Interactive button and card animations
- **Loading States**: Skeleton screens and spinners
- **Weather Backgrounds**: Dynamic backgrounds based on conditions

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML structure
- **Color Contrast**: High contrast text and backgrounds
- **Touch Friendly**: Optimized for mobile interaction

## 🔧 Customization

### Environment Variables
No API keys required - all services use free public APIs.

### Styling
- Modify `src/app/globals.css` for custom animations and effects
- Update Tailwind classes in components for layout changes
- Customize color scheme in CSS variables

### Adding New Features
- Extend the types in `src/app/types/index.ts`
- Add new API functions in `src/app/services/api.ts`
- Create modal components in `src/app/components/`
- Update navbar and main page for integration

## 📈 Performance

- **Lazy Loading**: Map component loaded dynamically
- **Parallel API Calls**: Multiple data sources fetched simultaneously
- **Error Handling**: Graceful degradation when APIs fail
- **Caching**: Browser-level caching for static assets
- **Optimized Images**: SVG icons and optimized graphics

## 🌍 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
- **Netlify**: Compatible with static export
- **AWS Amplify**: Full Next.js support
- **Docker**: Containerized deployment available

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check the documentation
- Review existing discussions

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

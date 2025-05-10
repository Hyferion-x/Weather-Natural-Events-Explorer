import React from 'react';

// Helper for Open-Meteo weathercode to type
function getWeatherType(weathercode: number): 'sunny' | 'cloudy' | 'rainy' | 'default' {
  if (weathercode === 0) return 'sunny';
  if ([1, 2, 3, 45, 48].includes(weathercode)) return 'cloudy';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weathercode)) return 'rainy';
  return 'default';
}

const Sunny = () => (
  <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
    <div className="animate-spin-slow rounded-full bg-yellow-300/20 blur-2xl w-[400px] h-[400px] shadow-2xl" />
    <div className="absolute w-40 h-40 bg-yellow-200/60 rounded-full blur-2xl animate-pulse" />
  </div>
);

const Cloudy = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute left-1/4 top-1/3 w-64 h-24 bg-white/20 rounded-full blur-2xl animate-cloud-move" />
    <div className="absolute left-1/2 top-1/2 w-80 h-28 bg-white/10 rounded-full blur-2xl animate-cloud-move2" />
    <div className="absolute left-2/3 top-1/4 w-48 h-16 bg-white/15 rounded-full blur-2xl animate-cloud-move3" />
    <style jsx>{`
      @keyframes cloud-move {
        0% { transform: translateX(0); }
        100% { transform: translateX(100px); }
      }
      .animate-cloud-move { animation: cloud-move 16s linear infinite alternate; }
      .animate-cloud-move2 { animation: cloud-move 22s linear infinite alternate-reverse; }
      .animate-cloud-move3 { animation: cloud-move 18s linear infinite alternate; }
    `}</style>
  </div>
);

const Rainy = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute top-0 w-0.5 h-16 bg-blue-300/30 rounded-full animate-raindrop"
        style={{
          left: `${(i * 3.3) % 100}%`,
          animationDelay: `${(i % 10) * 0.7}s`,
          animationDuration: `${1.5 + (i % 5) * 0.2}s`,
        }}
      />
    ))}
    <style jsx>{`
      @keyframes raindrop {
        0% { top: -40px; opacity: 0; }
        10% { opacity: 1; }
        100% { top: 100vh; opacity: 0; }
      }
      .animate-raindrop { animation: raindrop linear infinite; }
    `}</style>
  </div>
);

const DefaultBG = () => (
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#10131a] to-[#232946]" />
);

const WeatherBackground = ({ weathercode }: { weathercode?: number }) => {
  const type = getWeatherType(weathercode ?? -1);
  if (type === 'sunny') return <Sunny />;
  if (type === 'cloudy') return <Cloudy />;
  if (type === 'rainy') return <Rainy />;
  return <DefaultBG />;
};

export default WeatherBackground; 
import React, { useEffect, useState } from 'react';

const pad = (n: number) => n.toString().padStart(2, '0');

function getTimeStrings() {
  const now = new Date();
  const utc = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
  const local = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return { utc, local };
}

interface WorldClockProps {
  small?: boolean;
}

const WorldClock: React.FC<WorldClockProps> = ({ small }) => {
  const [time, setTime] = useState(getTimeStrings());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeStrings()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`glass-card ${small ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-xs md:text-sm'} flex flex-col md:flex-row gap-1 md:gap-4 items-center font-mono shadow-lg`}>
      <span className="text-blue-200">UTC: <span className="text-white font-semibold">{time.utc}</span></span>
      <span className="text-blue-200">Local: <span className="text-white font-semibold">{time.local}</span></span>
    </div>
  );
};

export default WorldClock; 
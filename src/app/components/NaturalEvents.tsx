'use client';

import React, { useEffect, useState } from 'react';
import { getNaturalEvents } from '../services/api';

interface NaturalEventsProps {
  onEventSelect?: (lat: number, lng: number, title: string) => void;
}

const NaturalEvents: React.FC<NaturalEventsProps> = ({ onEventSelect }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getNaturalEvents();
        setEvents(data.events || []);
        setError(null);
      } catch (err) {
        setError('Failed to load natural events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: any) => {
    if (onEventSelect && event.geometry && event.geometry.length > 0) {
      const geometry = event.geometry[0];
      if (geometry.coordinates && geometry.coordinates.length >= 2) {
        const [lng, lat] = geometry.coordinates;
        onEventSelect(lat, lng, event.title);
      }
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => 
        event.categories.some((category: any) => 
          category.id.toLowerCase() === filter.toLowerCase()
        )
      );
  
  const categories = Array.from(new Set(
    events.flatMap(event => event.categories.map((cat: any) => cat.id))
  ));

  if (loading) {
    return (
      <div className="glass-card">
        <div className="animate-pulse">
          <div className="h-7 bg-white/10 rounded w-1/2 mb-4"></div>
          <div className="h-5 bg-white/10 rounded w-full mb-2"></div>
          <div className="h-5 bg-white/10 rounded w-full mb-2"></div>
          <div className="h-5 bg-white/10 rounded w-full mb-2"></div>
          <div className="h-5 bg-white/10 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="text-xl font-bold mb-4 text-white">Natural Events (NASA EONET)</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Filter by type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 bg-[#232946] text-white border border-white/10 rounded-md"
        >
          <option value="all">All Events</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No events found</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {filteredEvents.map((event) => (
              <li 
                key={event.id} 
                className="py-3 hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => handleEventClick(event)}
              >
                <h3 className="font-medium text-white">{event.title}</h3>
                <div className="text-sm text-gray-300 flex flex-wrap gap-1 mt-1">
                  {event.categories.map((category: any) => (
                    <span 
                      key={`${event.id}-${category.id}`}
                      className="inline-block bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs"
                    >
                      {category.title}
                    </span>
                  ))}
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(event.geometry[0]?.date || event.created).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NaturalEvents; 
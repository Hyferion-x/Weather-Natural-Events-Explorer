'use client';

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { getNaturalEvents } from '../services/api';
import { NaturalEvent } from '../types';
import { FaExclamationTriangle, FaInfoCircle, FaFilter } from 'react-icons/fa';

interface GlobalEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventSelect?: (lat: number, lng: number, title: string) => void;
}

const GlobalEventsModal: React.FC<GlobalEventsModalProps> = ({ 
  isOpen, 
  onClose,
  onEventSelect 
}) => {
  const [events, setEvents] = useState<NaturalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'stats'>('all');

  useEffect(() => {
    if (isOpen) {
      fetchEvents();
    }
  }, [isOpen]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getNaturalEvents();
      setEvents(data.events || []);
      
      // Calculate category statistics
      const stats: Record<string, number> = {};
      data.events.forEach((event: NaturalEvent) => {
        event.categories.forEach(cat => {
          if (stats[cat.title]) {
            stats[cat.title]++;
          } else {
            stats[cat.title] = 1;
          }
        });
      });
      setCategoryStats(stats);
      
      setError(null);
    } catch (err) {
      setError('Failed to load global events data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (event: NaturalEvent) => {
    if (onEventSelect && event.geometry && event.geometry.length > 0) {
      const geometry = event.geometry[0];
      if (geometry.coordinates && geometry.coordinates.length >= 2) {
        const [lng, lat] = geometry.coordinates;
        onEventSelect(lat, lng, event.title);
        onClose(); // Close modal after selection
      }
    }
  };

  // Get most active event type
  const getMostActiveEvent = () => {
    if (Object.keys(categoryStats).length === 0) return null;
    return Object.entries(categoryStats).reduce((max, [category, count]) => 
      count > max[1] ? [category, count] : max, ['', 0]);
  };

  const mostActive = getMostActiveEvent();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Natural Events">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-400 flex items-center">
          <FaExclamationTriangle className="mr-2" /> {error}
        </div>
      ) : (
        <div>
          <div className="flex border-b border-gray-700 mb-4">
            <button 
              className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('all')}
            >
              All Events ({events.length})
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'stats' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('stats')}
            >
              Statistics
            </button>
          </div>
          
          {activeTab === 'all' ? (
            <div className="max-h-96 overflow-y-auto pr-2">
              <p className="mb-4 text-sm">
                <FaInfoCircle className="inline mr-2 text-blue-400" />
                Click on any event to view its location on the map
              </p>
              
              <ul className="divide-y divide-gray-700">
                {events.map((event) => (
                  <li 
                    key={event.id} 
                    className="py-3 hover:bg-white/5 cursor-pointer transition-colors rounded"
                    onClick={() => handleEventClick(event)}
                  >
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <div className="text-sm text-gray-300 flex flex-wrap gap-1 mt-1">
                      {event.categories.map((category) => (
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
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
                <h3 className="text-lg font-medium text-white mb-2">Global Summary</h3>
                <p className="text-sm">Currently tracking <span className="text-white font-bold">{events.length}</span> natural events worldwide</p>
                {mostActive && (
                  <p className="text-sm mt-2">Most common event type: <span className="text-white font-bold">{mostActive[0]}</span> ({mostActive[1]} events)</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                  <FaFilter className="mr-2 text-blue-400" /> 
                  Events by Category
                </h3>
                <div className="space-y-2">
                  {Object.entries(categoryStats)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .map(([category, count]) => (
                      <div key={category} className="flex items-center">
                        <div className="text-sm text-gray-300 flex-1">{category}</div>
                        <div className="w-32 bg-gray-700 h-4 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                            style={{ width: `${(count / events.length) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-white ml-2 w-8 text-right">{count}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default GlobalEventsModal; 
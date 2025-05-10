'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getNaturalEvents } from '../services/api';
import { NaturalEvent } from '../types';

interface MapProps {
  center?: [number, number];
  zoom?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const Map = ({ 
  center = [20, 0], 
  zoom = 2,
  onLocationSelect 
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<NaturalEvent[]>([]);

  useEffect(() => {
    // Initialize map
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView(center, zoom);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap.current);

      // Add click handler for location selection
      if (onLocationSelect) {
        leafletMap.current.on('click', (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          onLocationSelect(lat, lng);
        });
      }

      setLoading(false);
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [center, zoom, onLocationSelect]);

  // Load natural events from NASA EONET API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getNaturalEvents();
        setEvents(data.events || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    if (!loading && leafletMap.current) {
      fetchEvents();
    }
  }, [loading]);

  // Display events on map
  useEffect(() => {
    if (events.length > 0 && leafletMap.current) {
      const eventGroup = L.layerGroup().addTo(leafletMap.current);
      
      events.forEach(event => {
        if (event.geometry && event.geometry.length > 0) {
          const geometry = event.geometry[0];
          if (geometry.coordinates && geometry.coordinates.length >= 2) {
            const [lng, lat] = geometry.coordinates;
            
            // Create marker with popup
            const marker = L.marker([lat, lng], {
              icon: L.divIcon({
                className: 'natural-event-marker',
                html: `<div class="bg-red-500 rounded-full h-4 w-4 border-2 border-white"></div>`,
                iconSize: [20, 20]
              })
            }).addTo(eventGroup);
            
            marker.bindPopup(`
              <b>${event.title}</b><br>
              Type: ${event.categories[0]?.title || 'Unknown'}<br>
              Date: ${new Date(event.geometry[0].date).toLocaleDateString()}
            `);
          }
        }
      });
      
      return () => {
        eventGroup.clearLayers();
      };
    }
  }, [events]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">Loading map...</div>}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};

export default Map; 
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getLocationFromSearch } from '../services/api';
import { LocationSearchResult } from '../types';

interface SearchBoxProps {
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setShowResults(true);
    
    try {
      const results = await getLocationFromSearch(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for location:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (result: LocationSearchResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const name = result.display_name;
    
    onLocationSelect(lat, lon, name);
    setShowResults(false);
    setSearchQuery(name.split(',')[0]);
  };

  return (
    <div ref={searchBoxRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search for a location..."
          className="flex-1 px-4 py-3 bg-[#232946] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg border border-blue-500/30 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#232946]"
          onClick={handleSearch}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {showResults && searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-[#232946] text-white mt-1 border border-white/10 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <li
              key={`${result.place_id}-${index}`}
              className="px-4 py-2 hover:bg-white/5 cursor-pointer border-b border-white/10 last:border-b-0"
              onClick={() => handleResultClick(result)}
            >
              <div className="font-medium text-white">{result.display_name.split(',')[0]}</div>
              <div className="text-xs text-gray-300 truncate">{result.display_name}</div>
            </li>
          ))}
        </ul>
      )}

      {showResults && searchResults.length === 0 && !isLoading && (
        <div className="absolute z-10 w-full bg-[#232946] text-white mt-1 border border-white/10 rounded-md shadow-lg p-4 text-center text-gray-300">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBox; 
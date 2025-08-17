import React from 'react';
import { EnhancedGeocodeResult } from '../types';
import { FaMapMarkerAlt, FaGlobe, FaInfoCircle } from 'react-icons/fa';

interface LocationDetailsCardProps {
  geocodeData: EnhancedGeocodeResult | null;
  loading: boolean;
}

const LocationDetailsCard: React.FC<LocationDetailsCardProps> = ({ geocodeData, loading }) => {
  if (loading) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaMapMarkerAlt className="text-green-400 text-glow" />
          <h3 className="text-white font-semibold">Location Details</h3>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!geocodeData) {
    return (
      <div className="glass-container p-4 rounded-xl">
        <div className="flex items-center space-x-2 mb-3">
          <FaMapMarkerAlt className="text-green-400 text-glow" />
          <h3 className="text-white font-semibold">Location Details</h3>
        </div>
        <p className="text-gray-400 text-sm">No location data available</p>
      </div>
    );
  }

  const { display_name, lat, lon, address, boundingbox } = geocodeData;

  const formatAddress = (address: any) => {
    const parts = [];
    if (address.house_number) parts.push(address.house_number);
    if (address.road) parts.push(address.road);
    if (address.neighbourhood) parts.push(address.neighbourhood);
    if (address.suburb) parts.push(address.suburb);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.postcode) parts.push(address.postcode);
    if (address.country) parts.push(address.country);
    return parts.join(', ');
  };

  return (
    <div className="glass-container p-4 rounded-xl">
      <div className="flex items-center space-x-2 mb-3">
        <FaMapMarkerAlt className="text-green-400 text-glow" />
        <h3 className="text-white font-semibold">Location Details</h3>
      </div>
      
      <div className="space-y-3">
        {/* Display Name */}
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FaGlobe className="text-blue-300" />
            <span className="text-gray-300 text-sm">Location Name</span>
          </div>
          <div className="text-white text-sm">
            {display_name}
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-gray-800/30 rounded-lg">
            <div className="text-gray-400 text-xs">Latitude</div>
            <div className="text-white text-sm font-medium">
              {parseFloat(lat).toFixed(6)}°
            </div>
          </div>
          <div className="p-2 bg-gray-800/30 rounded-lg">
            <div className="text-gray-400 text-xs">Longitude</div>
            <div className="text-white text-sm font-medium">
              {parseFloat(lon).toFixed(6)}°
            </div>
          </div>
        </div>

        {/* Address Components */}
        <div className="pt-2 border-t border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <FaInfoCircle className="text-blue-400" />
            <span className="text-gray-300 text-sm">Address Details</span>
          </div>
          <div className="space-y-1 text-xs">
            {address.house_number && address.road && (
              <div className="flex justify-between">
                <span className="text-gray-400">Street:</span>
                <span className="text-white">{address.house_number} {address.road}</span>
              </div>
            )}
            {address.neighbourhood && (
              <div className="flex justify-between">
                <span className="text-gray-400">Neighbourhood:</span>
                <span className="text-white">{address.neighbourhood}</span>
              </div>
            )}
            {address.suburb && (
              <div className="flex justify-between">
                <span className="text-gray-400">Suburb:</span>
                <span className="text-white">{address.suburb}</span>
              </div>
            )}
            {address.city && (
              <div className="flex justify-between">
                <span className="text-gray-400">City:</span>
                <span className="text-white">{address.city}</span>
              </div>
            )}
            {address.state && (
              <div className="flex justify-between">
                <span className="text-gray-400">State:</span>
                <span className="text-white">{address.state}</span>
              </div>
            )}
            {address.postcode && (
              <div className="flex justify-between">
                <span className="text-gray-400">Postcode:</span>
                <span className="text-white">{address.postcode}</span>
              </div>
            )}
            {address.country && (
              <div className="flex justify-between">
                <span className="text-gray-400">Country:</span>
                <span className="text-white">{address.country}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bounding Box */}
        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-300 text-sm mb-2">Bounding Box</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">North:</span>
              <span className="text-white ml-1">{parseFloat(boundingbox[1]).toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-gray-400">South:</span>
              <span className="text-white ml-1">{parseFloat(boundingbox[0]).toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-gray-400">East:</span>
              <span className="text-white ml-1">{parseFloat(boundingbox[3]).toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-gray-400">West:</span>
              <span className="text-white ml-1">{parseFloat(boundingbox[2]).toFixed(4)}°</span>
            </div>
          </div>
        </div>

        {/* Formatted Address */}
        <div className="pt-2 border-t border-gray-600">
          <div className="text-gray-300 text-sm mb-2">Formatted Address</div>
          <div className="text-xs text-gray-400 bg-gray-800/30 p-2 rounded">
            {formatAddress(address)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsCard;

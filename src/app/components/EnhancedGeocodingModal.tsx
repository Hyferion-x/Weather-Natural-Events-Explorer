'use client';

import React from 'react';
import Modal from './Modal';
import { EnhancedGeocodeResult } from '../types';
import { FaMapMarkerAlt, FaGlobe, FaInfoCircle, FaMap, FaCompass, FaFlag } from 'react-icons/fa';

interface EnhancedGeocodingModalProps {
  isOpen: boolean;
  onClose: () => void;
  geocodeData: EnhancedGeocodeResult | null;
  loading: boolean;
}

const EnhancedGeocodingModal: React.FC<EnhancedGeocodingModalProps> = ({ 
  isOpen, 
  onClose, 
  geocodeData, 
  loading 
}) => {
  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Location Details">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Modal>
    );
  }

  if (!geocodeData) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Location Details">
        <div className="text-center py-6 text-gray-400">
          No location details available
        </div>
      </Modal>
    );
  }

  const formatCoordinates = (lat: string, lon: string) => {
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    const latDir = latNum >= 0 ? 'N' : 'S';
    const lonDir = lonNum >= 0 ? 'E' : 'W';
    return `${Math.abs(latNum).toFixed(6)}° ${latDir}, ${Math.abs(lonNum).toFixed(6)}° ${lonDir}`;
  };

  const getLocationType = (osmType: string, type: string) => {
    if (osmType === 'node') return 'Point of Interest';
    if (osmType === 'way') return 'Area/Landmark';
    if (osmType === 'relation') return 'Administrative Region';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Location Details">
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-blue-400" />
            Location Information
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-300">Display Name</div>
              <div className="text-white font-semibold text-sm">{geocodeData.display_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Coordinates</div>
              <div className="text-white font-semibold">{formatCoordinates(geocodeData.lat, geocodeData.lon)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Location Type</div>
              <div className="text-white font-semibold">{getLocationType(geocodeData.osm_type, geocodeData.type || 'unknown')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Importance Score</div>
              <div className="text-white font-semibold">{geocodeData.importance ? (geocodeData.importance * 100).toFixed(1) + '%' : 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaMap className="mr-2 text-green-400" />
            Address Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {geocodeData.address.house_number && (
              <div>
                <div className="text-gray-300">House Number</div>
                <div className="text-white font-semibold">{geocodeData.address.house_number}</div>
              </div>
            )}
            {geocodeData.address.road && (
              <div>
                <div className="text-gray-300">Street</div>
                <div className="text-white font-semibold">{geocodeData.address.road}</div>
              </div>
            )}
            {geocodeData.address.neighbourhood && (
              <div>
                <div className="text-gray-300">Neighbourhood</div>
                <div className="text-white font-semibold">{geocodeData.address.neighbourhood}</div>
              </div>
            )}
            {geocodeData.address.suburb && (
              <div>
                <div className="text-gray-300">Suburb</div>
                <div className="text-white font-semibold">{geocodeData.address.suburb}</div>
              </div>
            )}
            {geocodeData.address.city && (
              <div>
                <div className="text-gray-300">City</div>
                <div className="text-white font-semibold">{geocodeData.address.city}</div>
              </div>
            )}
            {geocodeData.address.state && (
              <div>
                <div className="text-gray-300">State/Province</div>
                <div className="text-white font-semibold">{geocodeData.address.state}</div>
              </div>
            )}
            {geocodeData.address.postcode && (
              <div>
                <div className="text-gray-300">Postal Code</div>
                <div className="text-white font-semibold">{geocodeData.address.postcode}</div>
              </div>
            )}
            {geocodeData.address.country && (
              <div>
                <div className="text-gray-300">Country</div>
                <div className="text-white font-semibold">{geocodeData.address.country}</div>
              </div>
            )}
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gray-900/20 p-4 rounded-lg border border-gray-900/30">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <FaInfoCircle className="mr-2 text-gray-400" />
            Technical Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-300">OSM Type</div>
              <div className="text-white font-semibold">{geocodeData.osm_type}</div>
            </div>
            <div>
              <div className="text-gray-300">OSM ID</div>
              <div className="text-white font-semibold">{geocodeData.osm_id}</div>
            </div>
            <div>
              <div className="text-gray-300">Place ID</div>
              <div className="text-white font-semibold">{geocodeData.place_id}</div>
            </div>
            <div>
              <div className="text-gray-300">Class</div>
              <div className="text-white font-semibold">{geocodeData.class || 'N/A'}</div>
            </div>
            <div>
              <div className="text-gray-300">Type</div>
              <div className="text-white font-semibold">{geocodeData.type || 'N/A'}</div>
            </div>
            <div>
              <div className="text-gray-300">Country Code</div>
              <div className="text-white font-semibold">{geocodeData.address.country_code?.toUpperCase() || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Bounding Box */}
        {geocodeData.boundingbox && (
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-900/30">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <FaCompass className="mr-2 text-purple-400" />
              Bounding Box
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-300">North</div>
                <div className="text-white font-semibold">{parseFloat(geocodeData.boundingbox[1]).toFixed(6)}°</div>
              </div>
              <div>
                <div className="text-gray-300">South</div>
                <div className="text-white font-semibold">{parseFloat(geocodeData.boundingbox[0]).toFixed(6)}°</div>
              </div>
              <div>
                <div className="text-gray-300">East</div>
                <div className="text-white font-semibold">{parseFloat(geocodeData.boundingbox[3]).toFixed(6)}°</div>
              </div>
              <div>
                <div className="text-gray-300">West</div>
                <div className="text-white font-semibold">{parseFloat(geocodeData.boundingbox[2]).toFixed(6)}°</div>
              </div>
            </div>
          </div>
        )}

        {/* Extra Tags */}
        {geocodeData.extratags && Object.keys(geocodeData.extratags).length > 0 && (
          <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-900/30">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <FaFlag className="mr-2 text-yellow-400" />
              Additional Information
            </h3>
            <div className="space-y-2 text-sm">
              {Object.entries(geocodeData.extratags).slice(0, 6).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-300 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
              {Object.keys(geocodeData.extratags).length > 6 && (
                <div className="text-xs text-gray-400 mt-2">
                  +{Object.keys(geocodeData.extratags).length - 6} more properties
                </div>
              )}
            </div>
          </div>
        )}

        {/* Data Source */}
        <div className="bg-blue-900/10 p-3 rounded-lg border border-blue-900/20">
          <div className="flex items-center text-xs text-gray-400">
            <FaGlobe className="mr-2" />
            <span>Data provided by OpenStreetMap Nominatim API</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EnhancedGeocodingModal;

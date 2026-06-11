'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Clock, Phone, MessageCircle, AlertTriangle } from 'lucide-react';

interface ProviderLocation {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  timestamp: Date;
}

interface LiveTrackingProps {
  bookingId: string;
  providerId: string;
  destinationLat: number;
  destinationLng: number;
  onArrival?: () => void;
}

export default function LiveTracking({
  bookingId,
  providerId,
  destinationLat,
  destinationLng,
  onArrival,
}: LiveTrackingProps) {
  const [providerLocation, setProviderLocation] = useState<ProviderLocation | null>(null);
  const [eta, setEta] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [isTracking, setIsTracking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    const startTracking = () => {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, speed, heading } = position.coords;
          setProviderLocation({
            lat: latitude,
            lng: longitude,
            heading: heading || 0,
            speed: speed || 0,
            timestamp: new Date(),
          });

          const dist = calculateDistance(
            latitude,
            longitude,
            destinationLat,
            destinationLng
          );
          setDistance(dist);

          const etaMinutes = dist / (speed && speed > 0 ? speed / 60 : 30);
          setEta(Math.ceil(etaMinutes));

          if (dist < 0.1) {
            setIsTracking(false);
            onArrival?.();
          }
        },
        (err) => {
          setError('Unable to get location');
          console.error('Geolocation error:', err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000,
        }
      );
    };

    startTracking();

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [destinationLat, destinationLng, onArrival]);

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const handleCall = () => {
    window.open('tel:+919876543210');
  };

  const handleMessage = () => {
    window.open('sms:+919876543210');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Map Area */}
      <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-2 animate-pulse" />
            <p className="text-primary-700 font-medium">Live Tracking Active</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Live</span>
          </span>
        </div>

        {/* Speed Badge */}
        {providerLocation && (
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              {(providerLocation.speed * 3.6).toFixed(1)} km/h
            </span>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="p-4 space-y-4">
        {/* ETA Card */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary-50 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-primary-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-primary-700">{eta}</p>
            <p className="text-sm text-primary-600">minutes ETA</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <Navigation className="w-6 h-6 text-gray-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-700">
              {distance.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">km away</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition"
          >
            <Phone className="w-5 h-5" />
            Call Provider
          </button>
          <button
            onClick={handleMessage}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
        </div>

        {/* Navigation Button */}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 w-full border-2 border-primary-600 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition"
        >
          <Navigation className="w-5 h-5" />
          Open in Maps
        </a>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-xl text-yellow-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

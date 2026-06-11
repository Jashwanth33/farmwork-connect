'use client';

import { useState, useEffect } from 'react';
import {
  Cloud, CloudRain, Sun, Thermometer, Droplets, Wind,
  AlertTriangle, Check, MapPin
} from 'lucide-react';

const WEATHER_ICONS: Record<string, typeof Sun> = {
  '01d': Sun,
  '02d': Cloud,
  '03d': Cloud,
  '04d': Cloud,
  '09d': CloudRain,
  '10d': CloudRain,
  '11d': CloudRain,
};

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  rainfall: number;
}

interface WeatherAlert {
  id: string;
  type: string;
  severity: string;
  message: string;
  recommendations: string[];
}

export default function WeatherAlertsPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/weather?lat=13.0827&lon=80.2707&type=alerts');
      const data = await res.json();
      
      if (data.weather) setWeather(data.weather);
      if (data.alerts) setAlerts(data.alerts);
    } catch {
      setWeather({
        temperature: 32,
        humidity: 65,
        description: 'partly cloudy',
        icon: '02d',
        rainfall: 0,
      });
      setAlerts([]);
    }
    setLoading(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'bg-red-100 border-red-300 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default: return 'bg-blue-100 border-blue-300 text-blue-800';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'RAIN': return CloudRain;
      case 'HEATWAVE': return Thermometer;
      case 'STORM': return Wind;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Weather & Alerts</h1>
        <p className="text-gray-600 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Thiruvallur, Tamil Nadu
        </p>
      </div>

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-24 bg-white/20 rounded-lg mb-4" />
          </div>
        ) : weather ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-6xl font-bold">{weather.temperature}°C</span>
                {(() => {
                  const Icon = WEATHER_ICONS[weather.icon] || Cloud;
                  return <Icon className="w-16 h-16" />;
                })()}
              </div>
              <p className="text-xl capitalize">{weather.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-blue-100">
                <span className="flex items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  {weather.humidity}% humidity
                </span>
                {weather.rainfall > 0 && (
                  <span className="flex items-center gap-1">
                    <CloudRain className="w-4 h-4" />
                    {weather.rainfall}mm
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={fetchWeather}
              className="px-4 py-2 bg-white/20 rounded-xl font-medium hover:bg-white/30 transition"
            >
              Refresh
            </button>
          </div>
        ) : (
          <p>Unable to fetch weather data</p>
        )}
      </div>

      {/* Weather Alerts */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Weather Alerts
        </h2>
        
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const Icon = getSeverityIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`rounded-xl border-2 p-4 ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      alert.severity === 'HIGH' ? 'bg-red-200' : 'bg-yellow-200'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{alert.type.replace('_', ' ')}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          alert.severity === 'HIGH' ? 'bg-red-200' : 'bg-yellow-200'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm mt-1 opacity-80">{alert.message}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/30 rounded-lg p-3">
                    <p className="text-sm font-medium mb-2">Recommendations:</p>
                    <ul className="space-y-1">
                      {alert.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-500">No weather alerts for your area. Conditions are favorable for farming.</p>
          </div>
        )}
      </div>

      {/* Crop Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Today's Farming Tips</h2>
        <div className="space-y-3">
          {[
            { crop: 'Rice', tip: 'Good weather for transplanting. Ensure adequate water in nursery.' },
            { crop: 'Vegetables', tip: 'Monitor for pest attacks due to humidity. Early morning spraying recommended.' },
            { crop: 'General', tip: 'Weather is suitable for harvesting. Plan outdoor activities between 6-10 AM.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.crop}</p>
                <p className="text-sm text-gray-600">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

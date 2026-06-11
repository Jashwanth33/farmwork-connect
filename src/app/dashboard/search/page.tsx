'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Search, MapPin, Star, Clock, Filter, Tractor, Sprout,
  Truck, Users, ChevronDown, Calendar, ArrowRight, SlidersHorizontal
} from 'lucide-react';

const CROP_TYPES = [
  { value: 'RICE', label: 'Rice / Paddy' },
  { value: 'WHEAT', label: 'Wheat' },
  { value: 'MAIZE', label: 'Maize' },
  { value: 'SUGARCANE', label: 'Sugarcane' },
  { value: 'COTTON', label: 'Cotton' },
  { value: 'VEGETABLES', label: 'Vegetables' },
  { value: 'FRUITS', label: 'Fruits' },
];

const CATEGORIES = [
  { value: 'LAND_PREPARATION', label: 'Land Preparation', icon: Tractor },
  { value: 'SOWING', label: 'Sowing', icon: Sprout },
  { value: 'CROP_MAINTENANCE', label: 'Crop Maintenance', icon: Users },
  { value: 'HARVESTING', label: 'Harvesting', icon: Tractor },
  { value: 'TRANSPORT', label: 'Transport', icon: Truck },
];

const SERVICES_BY_CATEGORY: Record<string, Array<{ name: string; price: number; unit: string }>> = {
  LAND_PREPARATION: [
    { name: 'Land Ploughing', price: 500, unit: 'acre' },
    { name: 'Levelling', price: 400, unit: 'acre' },
    { name: 'Seed Bed Preparation', price: 350, unit: 'acre' },
    { name: 'Rotavator', price: 600, unit: 'hour' },
  ],
  SOWING: [
    { name: 'Direct Seeding', price: 300, unit: 'acre' },
    { name: 'Nursery Planting', price: 400, unit: 'acre' },
    { name: 'Transplantation', price: 600, unit: 'acre' },
    { name: 'Paddy Transplanter', price: 800, unit: 'hour' },
  ],
  CROP_MAINTENANCE: [
    { name: 'Weeding', price: 250, unit: 'acre' },
    { name: 'Fertilizer Application', price: 350, unit: 'acre' },
    { name: 'Pesticide Spraying', price: 400, unit: 'acre' },
    { name: 'Drip Irrigation Setup', price: 1500, unit: 'visit' },
  ],
  HARVESTING: [
    { name: 'Manual Harvesting', price: 800, unit: 'acre' },
    { name: 'Machine Harvesting', price: 1200, unit: 'acre' },
    { name: 'Threshing', price: 500, unit: 'acre' },
    { name: 'Combine Harvester', price: 2000, unit: 'hour' },
  ],
  TRANSPORT: [
    { name: 'Crop Transport', price: 15, unit: 'km' },
    { name: 'Input Delivery', price: 20, unit: 'km' },
    { name: 'Equipment Transport', price: 25, unit: 'km' },
  ],
};

const MOCK_PROVIDERS = [
  { id: '1', name: 'Krishna Farms', role: 'Equipment Owner', rating: 4.8, reviews: 124, distance: 3.2, price: 500, unit: 'hour', avatar: null },
  { id: '2', name: 'Ravi Transport', role: 'Transport Provider', rating: 4.5, reviews: 89, distance: 5.1, price: 15, unit: 'km', avatar: null },
  { id: '3', name: 'Green Field Workers', role: 'Worker Team', rating: 4.9, reviews: 256, distance: 2.8, price: 600, unit: 'day', avatar: null },
  { id: '4', name: 'Balaji Agriculture', role: 'Equipment Owner', rating: 4.6, reviews: 78, distance: 7.3, price: 450, unit: 'hour', avatar: null },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showProviders, setShowProviders] = useState(false);

  const services = selectedCategory ? SERVICES_BY_CATEGORY[selectedCategory] || [] : [];

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowProviders(true);
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Services</h1>
        <p className="text-gray-600">Search for workers, equipment and transport</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services, workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition ${
              showFilters ? 'bg-primary-50 border-primary-500 text-primary-600' : 'border-gray-200 text-gray-600'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Select crop</option>
                {CROP_TYPES.map((crop) => (
                  <option key={crop.value} value={crop.value}>{crop.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      {!showProviders && (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Service Categories</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    selectedCategory === cat.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <cat.icon className={`w-8 h-8 mb-2 ${
                    selectedCategory === cat.value ? 'text-primary-600' : 'text-gray-500'
                  }`} />
                  <p className={`font-medium ${selectedCategory === cat.value ? 'text-primary-700' : 'text-gray-700'}`}>
                    {cat.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Services List */}
          {selectedCategory && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Available Services</h2>
              <div className="space-y-3">
                {services.map((service, i) => (
                  <button
                    key={i}
                    onClick={() => handleServiceSelect(service.name)}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">Starting from</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-600">₹{service.price}</p>
                        <p className="text-sm text-gray-500">/{service.unit}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Providers List */}
      {showProviders && selectedService && (
        <div>
          <button
            onClick={() => setShowProviders(false)}
            className="flex items-center gap-2 text-primary-600 mb-4 hover:underline"
          >
            ← Back to services
          </button>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Providers for {selectedService}
            </h2>
            <span className="text-sm text-gray-500">
              {MOCK_PROVIDERS.length} found
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_PROVIDERS.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">
                    {provider.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-500">{provider.role}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            {provider.rating}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            {provider.distance} km
                          </span>
                          <span className="text-sm text-gray-500">
                            {provider.reviews} reviews
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-600">
                          ₹{provider.price}
                        </p>
                        <p className="text-sm text-gray-500">/{provider.unit}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/dashboard/bookings/new?provider=${provider.id}&service=${encodeURIComponent(selectedService)}`}
                    className="flex-1 gradient-bg text-white py-3 rounded-xl font-semibold text-center hover:opacity-90 transition"
                  >
                    Book Now
                  </Link>
                  <button className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

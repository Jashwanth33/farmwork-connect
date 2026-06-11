'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import {
  TrendingUp, TrendingDown, Search, Calendar, Filter,
  ChevronDown, RefreshCw, Download, Leaf, Wheat
} from 'lucide-react';

const MOCK_PRICES = [
  { commodity: 'Paddy (Common)', market: 'Chennai', price: 2100, change: 0, trend: 'stable' },
  { commodity: 'Paddy (Grade A)', market: 'Chennai', price: 2200, change: 50, trend: 'up' },
  { commodity: 'Cotton', market: 'Coimbatore', price: 6200, change: -100, trend: 'down' },
  { commodity: 'Sugarcane', market: 'Madurai', price: 3500, change: 0, trend: 'stable' },
  { commodity: 'Coconut', market: 'Tiruchirappalli', price: 25000, change: 500, trend: 'up' },
  { commodity: 'Turmeric', market: 'Salem', price: 13500, change: 200, trend: 'up' },
  { commodity: 'Groundnut', market: 'Vellore', price: 5500, change: -50, trend: 'down' },
  { commodity: 'Rice (Raw)', market: 'Thanjavur', price: 2800, change: 0, trend: 'stable' },
  { commodity: 'Pepper', market: 'Nagercoil', price: 45000, change: 1000, trend: 'up' },
  { commodity: 'Maize', market: 'Dindigul', price: 2200, change: -25, trend: 'down' },
];

const CATEGORIES = ['All', 'Cereals', 'Pulses', 'Spices', 'Vegetables', 'Commercial'];

export default function MandiPricesPage() {
  const [prices, setPrices] = useState(MOCK_PRICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'commodity' | 'price'>('commodity');
  const [loading, setLoading] = useState(false);

  const filteredPrices = prices.filter((p) => {
    const matchesSearch = p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.market.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'commodity') return a.commodity.localeCompare(b.commodity);
    return b.price - a.price;
  });

  const refreshPrices = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mandi Prices</h1>
          <p className="text-gray-600">Latest market prices for agricultural produce</p>
        </div>
        <button
          onClick={refreshPrices}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Rising</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {prices.filter(p => p.trend === 'up').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-500">Falling</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {prices.filter(p => p.trend === 'down').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-500">Stable</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">
            {prices.filter(p => p.trend === 'stable').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search commodity or market..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Prices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Commodity</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Market</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Price (₹)</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Change</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPrices.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                      <Wheat className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{item.commodity}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{item.market}</td>
                <td className="px-6 py-4 font-bold text-gray-900">₹{item.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={item.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {item.change >= 0 ? '+' : ''}₹{Math.abs(item.change)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                  {item.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
                  {item.trend === 'stable' && <span className="text-gray-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

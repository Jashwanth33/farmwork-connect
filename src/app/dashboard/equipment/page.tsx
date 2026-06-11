'use client';

import { useState } from 'react';
import {
  Plus, Edit2, Trash2, Check, X, Camera, MapPin,
  Tractor, Clock, Star, ToggleLeft, ToggleRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const EQUIPMENT_TYPES = [
  { value: 'TRACTOR', label: 'Tractor' },
  { value: 'ROTAVATOR', label: 'Rotavator' },
  { value: 'SEED_DRILL', label: 'Seed Drill' },
  { value: 'HARVESTER', label: 'Harvester' },
  { value: 'POWER_TILLER', label: 'Power Tiller' },
  { value: 'SPRAYER', label: 'Sprayer' },
  { value: 'WATER_TANKER', label: 'Water Tanker' },
  { value: 'ROLLER', label: 'Roller' },
  { value: 'PADDY_TRANSPLANTER', label: 'Paddy Transplanter' },
];

const DEMO_EQUIPMENT = [
  {
    id: '1',
    type: 'TRACTOR',
    name: 'Mahindra 575 DI',
    modelNumber: 'M575-DI-2022',
    capacity: '50 HP',
    pricePerHour: 500,
    pricePerAcre: 350,
    isAvailable: true,
    serviceRadius: 25,
    images: [],
    bookings: 45,
    rating: 4.8,
  },
  {
    id: '2',
    type: 'ROTAVATOR',
    name: 'John Deere Rotavator',
    modelNumber: 'JD-RTV-2023',
    capacity: '45 HP',
    pricePerHour: 400,
    pricePerAcre: 300,
    isAvailable: true,
    serviceRadius: 20,
    images: [],
    bookings: 32,
    rating: 4.6,
  },
];

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState(DEMO_EQUIPMENT);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'TRACTOR',
    name: '',
    modelNumber: '',
    capacity: '',
    pricePerHour: '',
    pricePerAcre: '',
    serviceRadius: '25',
  });

  const handleAddEquipment = () => {
    if (!formData.name || !formData.pricePerHour) {
      toast.error('Please fill required fields');
      return;
    }

    const newEquipment = {
      id: Date.now().toString(),
      ...formData,
      pricePerHour: parseFloat(formData.pricePerHour),
      pricePerAcre: parseFloat(formData.pricePerAcre) || parseFloat(formData.pricePerHour),
      serviceRadius: parseFloat(formData.serviceRadius),
      isAvailable: true,
      images: [],
      bookings: 0,
      rating: 5,
    };

    setEquipment([...equipment, newEquipment]);
    setShowAddModal(false);
    setFormData({
      type: 'TRACTOR',
      name: '',
      modelNumber: '',
      capacity: '',
      pricePerHour: '',
      pricePerAcre: '',
      serviceRadius: '25',
    });
    toast.success('Equipment added successfully!');
  };

  const toggleAvailability = (id: string) => {
    setEquipment(
      equipment.map((e) =>
        e.id === id ? { ...e, isAvailable: !e.isAvailable } : e
      )
    );
    toast.success('Availability updated!');
  };

  const deleteEquipment = (id: string) => {
    setEquipment(equipment.filter((e) => e.id !== id));
    toast.success('Equipment removed');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Equipment</h1>
          <p className="text-gray-600">{equipment.length} vehicles listed</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Equipment
        </button>
      </div>

      {/* Equipment Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center">
                    <Tractor className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{EQUIPMENT_TYPES.find(t => t.value === item.type)?.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`p-2 rounded-lg ${item.isAvailable ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}
                    title={item.isAvailable ? 'Available' : 'Unavailable'}
                  >
                    {item.isAvailable ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => deleteEquipment(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Price/Hour</p>
                  <p className="text-lg font-bold text-primary-600">₹{item.pricePerHour}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500">Price/Acre</p>
                  <p className="text-lg font-bold text-primary-600">₹{item.pricePerAcre}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {item.serviceRadius} km radius
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  {item.rating}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">{item.bookings} completed jobs</span>
                <button className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:underline">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>

            <div className={`px-4 py-2 ${item.isAvailable ? 'bg-green-50' : 'bg-gray-100'}`}>
              <p className={`text-sm font-medium ${item.isAvailable ? 'text-green-700' : 'text-gray-500'}`}>
                {item.isAvailable ? 'Available for booking' : 'Currently unavailable'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Equipment</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                >
                  {EQUIPMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mahindra 575 DI"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Number</label>
                  <input
                    type="text"
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    placeholder="e.g., M575-2022"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="e.g., 50 HP"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price/Hour (₹) *</label>
                  <input
                    type="number"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                    placeholder="500"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price/Acre (₹)</label>
                  <input
                    type="number"
                    value={formData.pricePerAcre}
                    onChange={(e) => setFormData({ ...formData, pricePerAcre: e.target.value })}
                    placeholder="350"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Radius (km)</label>
                <input
                  type="number"
                  value={formData.serviceRadius}
                  onChange={(e) => setFormData({ ...formData, serviceRadius: e.target.value })}
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEquipment}
                className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Add Equipment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

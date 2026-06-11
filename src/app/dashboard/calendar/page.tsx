'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Clock, Calendar as CalendarIcon } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 6);

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

const DEMO_SCHEDULE: DaySchedule[] = [
  {
    date: '2024-03-18',
    slots: HOURS.map((h) => ({
      time: `${h}:00`,
      available: h >= 9 && h <= 17,
    })),
  },
  {
    date: '2024-03-19',
    slots: HOURS.map((h) => ({
      time: `${h}:00`,
      available: h >= 8 && h <= 18,
    })),
  },
  {
    date: '2024-03-20',
    slots: HOURS.map((h) => ({
      time: `${h}:00`,
      available: h >= 10 && h <= 16,
    })),
  },
  {
    date: '2024-03-21',
    slots: HOURS.map((h) => ({
      time: `${h}:00`,
      available: h >= 9 && h <= 17,
    })),
  },
  {
    date: '2024-03-22',
    slots: HOURS.map((h) => ({
      time: `${h}:00`,
      available: h >= 7 && h <= 19,
    })),
  },
];

export default function AvailabilityCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedule, setSchedule] = useState(DEMO_SCHEDULE);
  const [selectedDate, setSelectedDate] = useState(0);

  const month = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const toggleSlot = (slotIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[selectedDate].slots[slotIndex].available = !newSchedule[selectedDate].slots[slotIndex].available;
    setSchedule(newSchedule);
  };

  const getAvailableSlots = () => {
    return schedule[selectedDate]?.slots.filter(s => s.available).length || 0;
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
          <p className="text-gray-600">Set your working hours for bookings</p>
        </div>
        <button className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
          Save Schedule
        </button>
      </div>

      {/* Week Selection */}
      <div className="grid grid-cols-5 gap-2">
        {schedule.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(i)}
            className={`p-4 rounded-xl text-center transition ${
              selectedDate === i
                ? 'gradient-bg text-white'
                : 'bg-white border border-gray-200 hover:border-primary-300'
            }`}
          >
            <p className="text-sm opacity-80">{DAYS[new Date(day.date).getDay()]}</p>
            <p className="text-lg font-bold">{new Date(day.date).getDate()}</p>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {schedule[selectedDate]?.date && new Date(schedule[selectedDate].date).toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric'
            })}
          </h2>
          <span className="text-sm text-gray-500">
            {getAvailableSlots()} slots available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {schedule[selectedDate]?.slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => toggleSlot(i)}
              className={`p-3 rounded-xl text-center transition ${
                slot.available
                  ? 'bg-green-100 text-green-700 border-2 border-green-500'
                  : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
              }`}
            >
              <p className="font-medium">{slot.time}</p>
              {slot.available ? (
                <Check className="w-4 h-4 mx-auto mt-1 text-green-600" />
              ) : (
                <X className="w-4 h-4 mx-auto mt-1 text-gray-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => {
            const newSchedule = [...schedule];
            newSchedule[selectedDate].slots.forEach(s => s.available = true);
            setSchedule(newSchedule);
          }}
          className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition"
        >
          <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="font-medium text-green-700">Select All</p>
        </button>
        <button
          onClick={() => {
            const newSchedule = [...schedule];
            newSchedule[selectedDate].slots.forEach(s => s.available = false);
            setSchedule(newSchedule);
          }}
          className="p-4 bg-red-50 rounded-xl text-center hover:bg-red-100 transition"
        >
          <X className="w-6 h-6 text-red-600 mx-auto mb-2" />
          <p className="font-medium text-red-700">Clear All</p>
        </button>
        <button
          onClick={() => {
            const newSchedule = [...schedule];
            newSchedule[selectedDate].slots.forEach(s => {
              s.available = s.time.includes('9') || s.time.includes('10') || s.time.includes('11');
            });
            setSchedule(newSchedule);
          }}
          className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition"
        >
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="font-medium text-blue-700">Morning Only</p>
        </button>
        <button
          onClick={() => {
            const newSchedule = [...schedule];
            newSchedule[selectedDate].slots.forEach(s => {
              s.available = s.time.includes('14') || s.time.includes('15') || s.time.includes('16');
            });
            setSchedule(newSchedule);
          }}
          className="p-4 bg-amber-50 rounded-xl text-center hover:bg-amber-100 transition"
        >
          <CalendarIcon className="w-6 h-6 text-amber-600 mx-auto mb-2" />
          <p className="font-medium text-amber-700">Afternoon Only</p>
        </button>
      </div>

      {/* Unavailable Dates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Mark Unavailable Dates</h2>
        <div className="flex flex-wrap gap-2">
          {[...Array(31)].map((_, i) => (
            <button
              key={i}
              className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-600 font-medium"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

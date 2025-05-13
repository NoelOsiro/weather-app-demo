'use client';

import { useState } from 'react';
import Image from 'next/image';

interface WeatherData {
  city: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    date: string;
    temp: number;
    icon: string;
  }>;
}

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/weather?city=${city}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const convertTemp = (temp: number): number => {
    return unit === 'F' ? (temp * 9/5) + 32 : temp;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Box */}
        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            °{unit}
          </button>
        </form>

        {weather && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Current Weather */}
            <div className="col-span-1 md:col-span-4 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{weather.city}</h2>
                  <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-center">
                  <Image
                    src={`/weather-icons/${weather.icon}.png`}
                    alt={weather.description}
                    width={64}
                    height={64}
                  />
                  <p className="text-4xl font-bold">{Math.round(convertTemp(weather.temp))}°{unit}</p>
                  <p className="text-gray-500 capitalize">{weather.description}</p>
                </div>
              </div>
            </div>

            {/* 3-Day Forecast */}
            {weather.forecast.map((day, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <p className="text-gray-500">{day.date}</p>
                <Image
                  src={`/weather-icons/${day.icon}.png`}
                  alt="Weather icon"
                  width={48}
                  height={48}
                  className="mx-auto my-4"
                />
                <p className="text-2xl font-bold">{Math.round(convertTemp(day.temp))}°{unit}</p>
              </div>
            ))}

            {/* Wind Status */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-gray-500 mb-4">Wind Status</h3>
              <div className="flex items-center justify-center">
                <p className="text-4xl font-bold">{weather.windSpeed}</p>
                <p className="ml-2">km/h</p>
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-gray-500 mb-4">Humidity</h3>
              <div className="flex items-center justify-center">
                <p className="text-4xl font-bold">{weather.humidity}</p>
                <p className="ml-2">%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${weather.humidity}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

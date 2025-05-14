"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  fetchWeatherData,
  mockWeatherData,
  celsiusToFahrenheit,
  metersPerSecondToMph,
  type WeatherData,
} from "@/lib/weather-api";
import WeatherIcon from "@/components/weather-icon";
import ForecastCard from "@/components/forecast-card";
import WeatherDetails from "@/components/weather-details";
import LoadingSpinner from "@/components/loading-spinner";
import SearchBar from "@/components/search-bar";
import { formatFullDate } from "@/utils/date-utils";

interface TemperatureUnit {
  unit: "C" | "F";
}

const getTemperature = (temp: number, { unit }: TemperatureUnit) =>
  unit === "F" ? celsiusToFahrenheit(temp) : temp;

const getWindSpeed = (windSpeed: number, { unit }: TemperatureUnit) =>
  unit === "F" ? metersPerSecondToMph(windSpeed) : windSpeed;

export default function WeatherApp() {
  const [city, setCity] = useState<string>("Nairobi");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data. Please try again.");
      setWeatherData({ ...mockWeatherData, city: cityName });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  const handleSearch = useCallback((cityName: string) => {
    setCity(cityName);
  }, []);

  const handleUnitChange = useCallback((newUnit: "C" | "F") => {
    setUnit(newUnit);
  }, []);

  const convertedWindSpeed = useMemo(
    () => getWindSpeed(weatherData?.current?.wind_speed ?? 0, { unit }),
    [weatherData?.current?.wind_speed, unit]
  );

  const forecastCards = useMemo(() => {
    return weatherData?.forecast?.map((day, index) => (
      <ForecastCard
        key={day.dt}
        timestamp={day.dt}
        iconCode={day.weather[0].icon}
        description={day.weather[0].description}
        temperature={getTemperature(day.temp.day, { unit })}
        unit={unit}
      />
    ));
  }, [weatherData?.forecast, unit]);

  if (loading && !weatherData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-8 items-center">
      <div className="container mx-auto mt-4 max-w-7xl px-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-sky-900">Weather Forecast</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Current Weather */}
          <div className="flex transform flex-col justify-between rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div>
              <div className="mb-6 flex justify-center">
                <WeatherIcon
                  iconCode={weatherData?.current?.icon ?? "01d"}
                  size={100}
                  className="text-sky-500"
                />
              </div>
              <div className="text-center">
                <h1 className="text-6xl font-bold text-sky-900">
                  {weatherData?.current
                    ? `${Math.round(getTemperature(weatherData.current.temp, { unit }))}`
                    : "18"}
                  °{unit}
                </h1>
                <p className="mt-2 text-xl capitalize text-sky-700">
                  {weatherData?.current?.description ?? "Clear Sky"}
                </p>
              </div>
            </div>
            <div className="mt-auto text-center">
              <p className="text-lg font-medium text-sky-800">
                {weatherData?.current?.dt
                  ? formatFullDate(weatherData.current.dt)
                  : "20th May 2023"}
              </p>
              <p className="text-lg text-sky-700">
                {weatherData?.city ?? city}
                {weatherData?.country ? `, ${weatherData.country}` : ""}
              </p>
            </div>
          </div>

          {/* Search, Forecast, Details */}
          <div className="space-y-6 lg:col-span-2">
            <SearchBar onSearch={handleSearch} unit={unit} onUnitChange={handleUnitChange} />

            {error && (
              <div className="flex items-center justify-between rounded-lg bg-red-100 p-4 text-red-700">
                <p>{error}</p>
                <button
                  onClick={() => fetchWeather(city)}
                  className="ml-4 text-sm underline"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Forecast */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-sky-900">3-Day Forecast</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {forecastCards}
              </div>
            </div>

            {/* Weather Details */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-sky-900">Today's Highlights</h2>
              <WeatherDetails
                windSpeed={convertedWindSpeed}
                windDirection={weatherData?.current?.wind_deg ?? 0}
                humidity={weatherData?.current?.humidity ?? 0}
                unit={unit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
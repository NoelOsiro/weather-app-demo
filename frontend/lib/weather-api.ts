// Types for the actual API response format
export interface WeatherData {
  city: string
  country: string
  current: {
    temp: number
    description: string
    icon: string
    wind_speed: number,
    wind_deg: number,
    humidity: number
    dt: number
  }
  forecast: Array<{
    dt: number
    temp: {
      day: number
    }
    weather: Array<{
      description: string
      icon: string
    }>
  }>
  units: string
}

// Base URL from environment or fallback to the provided endpoint
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL || "http://127.0.0.1:8080/api/weather"

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  try {


    const response = await fetch(
      `${BASE_URL}?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}


// Convert Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

//  Convert meters/sec to mph
// Convert meters/sec to mph
export function metersPerSecondToMph(mps: number): number {
  return mps * 2.23694;
}


// Mock data for development and fallback
export const mockWeatherData: WeatherData = {
  city: "London",
  country: "GB",
  current: {
    temp: 17.88,
    description: "clear sky",
    icon: "01d",
    wind_speed: 2.24,
    wind_deg: 79,
    humidity: 47,
    dt: 1747164103,
  },
  forecast: [
    {
      dt: 1747180800,
      temp: {
        day: 15.9,
      },
      weather: [
        {
          description: "clear sky",
          icon: "01d",
        },
      ],
    },
    {
      dt: 1747267200,
      temp: {
        day: 11.2,
      },
      weather: [
        {
          description: "overcast clouds",
          icon: "04d",
        },
      ],
    },
    {
      dt: 1747526400,
      temp: {
        day: 13.4,
      },
      weather: [
        {
          description: "overcast clouds",
          icon: "04d",
        },
      ],
    },
  ],
  units: "metric",
}

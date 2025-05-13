<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

/**
 * WeatherService handles interactions with the OpenWeatherMap API.
 */
class WeatherService
{
    protected $client;
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/';

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('services.openweathermap.key');
        if (!$this->apiKey) {
            Log::error('OpenWeatherMap API key is missing');
        }
    }

    /**
     * Get coordinates (lat, lon) for a city using the Geocoding API.
     *
     * @param string $city
     * @return array|null
     */
    public function getCoordinates(string $city): ?array
    {
        try {
            $response = $this->client->get($this->baseUrl . 'geo/1.0/direct', [
                'query' => [
                    'q' => $city,
                    'limit' => 1,
                    'appid' => $this->apiKey,
                ],
            ]);


            $data = json_decode($response->getBody(), true);

            if (empty($data)) {
                Log::warning('Geocoding API returned empty data for city: ' . $city);
                return null;
            }

            return [
                'lat' => $data[0]['lat'],
                'lon' => $data[0]['lon'],
                'city' => $data[0]['name'],
                'country' => $data[0]['country'] ?? '',
            ];
        } catch (\Exception $e) {
            Log::error('Geocoding API error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get weather data using Current Weather and 5-day Forecast APIs.
     *
     * @param float $lat
     * @param float $lon
     * @param string $units (metric or imperial)
     * @return array|null
     */
    public function getWeather(float $lat, float $lon, string $units = 'metric'): ?array
    {
        try {
            // Fetch current weather
            $currentUrl = $this->baseUrl . 'data/2.5/weather?' . http_build_query([
                'lat' => $lat,
                'lon' => $lon,
                'units' => $units,
                'appid' => $this->apiKey,
            ]);
            $currentResponse = $this->client->get($currentUrl, [
                'headers' => ['Cache-Control' => 'no-cache'],
            ]);
            $currentData = json_decode($currentResponse->getBody(), true);
            if (!isset($currentData['main']) || !isset($currentData['weather'])) {
                Log::error('Invalid Current Weather API response structure');
                return null;
            }

            // Fetch 5-day forecast
            $forecastUrl = $this->baseUrl . 'data/2.5/forecast?' . http_build_query([
                'lat' => $lat,
                'lon' => $lon,
                'units' => $units,
                'cnt' => 40, // Max 5 days
                'appid' => $this->apiKey,
            ]);
            $forecastResponse = $this->client->get($forecastUrl, [
                'headers' => ['Cache-Control' => 'no-cache'],
            ]);
            $forecastData = json_decode($forecastResponse->getBody(), true);

            if (!isset($forecastData['list'])) {
                Log::error('Invalid 5-day Forecast API response structure');
                return null;
            }

            // Aggregate forecast into daily summaries (3 days)
            $dailyForecast = [];
            $daysProcessed = 0;
            $currentDay = null;
            $dayData = [];

            foreach ($forecastData['list'] as $entry) {
                $date = date('Y-m-d', $entry['dt']);
                if ($currentDay !== $date) {
                    if ($currentDay !== null && $daysProcessed < 3) {
                        // Process previous day's data
                        $dailyForecast[] = $this->aggregateDay($dayData);
                        $daysProcessed++;
                    }
                    $currentDay = $date;
                    $dayData = [];
                }
                $dayData[] = $entry;
            }

            // Process the last day if within 3 days
            if ($daysProcessed < 4 && !empty($dayData)) {
                $dailyForecast[] = $this->aggregateDay($dayData);
            }

            // Skip the first day (today) if it’s incomplete
            $dailyForecast = array_slice($dailyForecast, 1, 4);

            return [
                'current' => [
                    'temp' => $currentData['main']['temp'],
                    'description' => $currentData['weather'][0]['description'],
                    'icon' => $currentData['weather'][0]['icon'],
                    'wind_speed' => $currentData['wind']['speed'],
                    'humidity' => $currentData['main']['humidity'],
                    'dt' => $currentData['dt'],
                ],
                'daily' => $dailyForecast,
            ];
        } catch (\Exception $e) {
            Log::error('Weather API error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Aggregate 3-hour data into a daily forecast.
     *
     * @param array $dayData
     * @return array
     */
    protected function aggregateDay(array $dayData): array
    {
        $temps = array_column($dayData, 'main');
        $temps = array_column($temps, 'temp');

        // Default to first entry
        $midIndex = (int) floor(count($dayData) / 2);
        $weatherEntry = $dayData[$midIndex] ?? $dayData[0];

        $weatherData = $weatherEntry['weather'][0] ?? ['description' => 'N/A', 'icon' => ''];

        return [
            'dt' => $dayData[0]['dt'],
            'temp' => [
                'day' => count($temps) > 0 ? round(array_sum($temps) / count($temps), 1) : null,
            ],
            'weather' => [
                [
                    'description' => $weatherData['description'] ?? 'N/A',
                    'icon' => $weatherData['icon'] ?? '',
                ],
            ],
        ];
    }
}
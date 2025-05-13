<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * WeatherController handles weather-related API requests.
 */
class WeatherController extends Controller
{
    protected $weatherService;

    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    /**
     * Get weather data for a city.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getWeather(Request $request): JsonResponse
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric'); // Default to Celsius

        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        // Get coordinates
        $coords = $this->weatherService->getCoordinates($city);

        if (!$coords) {
            return response()->json(['error' => 'City not found'], 404);
        }

        // Get weather data
        $weather = $this->weatherService->getWeather($coords['lat'], $coords['lon'], $units);

        if (!$weather) {
            return response()->json(['error' => 'Unable to fetch weather data'], 500);
        }

        return response()->json([
            'city' => $coords['city'],
            'country' => $coords['country'],
            'current' => $weather['current'],
            'forecast' => $weather['daily'],
            'units' => $units,
        ]);
    }
}
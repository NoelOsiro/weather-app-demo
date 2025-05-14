# Weather App

This is a decoupled weather app built using:

- **Frontend:** Next.js 14 + Typescript + RippleUI (TailwindCSS)
- **Backend:** Laravel 11 (API Only)

## 🔧 Setup Instructions

1. Clone the repo:
   ```bash
   git clone ...
   cd weather-app
````

2. Install dependencies:

   **Backend:**

   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

   **Frontend:**

   ```bash
   cd ../frontend
   npm install
   ```

3. Add your [OpenWeatherMap API Key](https://openweathermap.org/api) in `.env` file:

   ```
   WEATHER_API_KEY=your_api_key
   ```

4. Run both frontend and backend:

   * On Windows:
     Double-click `start.bat`

   * On Linux/macOS:

     ```bash
     ./start.sh
     ```

5. Access:

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend: [http://localhost:8000/api/weather](http://localhost:8000/api)

---

## ✨ Features

* City search with autocomplete (Geocoding API)
* Weather forecast (current + next 3 days)
* Switch between Celsius and Fahrenheit
* Humidity, wind status, weather icons
* Fully responsive with RippleUI

---

## 🧠 Technical Notes

* Type-safe API and props
* No Blade views in Laravel
* `fetch` used in Next.js for API calls
* Clean, modular components using Tailwind + RippleUI

---

## 📸 Screenshots

*Add screenshots here if required.*

```

---

### ✅ Submission Checklist

| Requirement                         | Done |
|-------------------------------------|------|
| Laravel API only (no Blade)         | ✅   |
| Uses OpenWeatherMap API             | ✅   |
| TypeScript + Tailwind + RippleUI    | ✅   |
| City search (geocoding)             | ✅   |
| Celsius/Fahrenheit toggle           | ✅   |
| Weather details & 3-day forecast    | ✅   |
| One-command startup (nice-to-have)  | ✅   |
| Good README                         | ✅   |

---

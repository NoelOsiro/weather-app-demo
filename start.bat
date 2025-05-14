@echo off
echo Starting Laravel backend...
start cmd /k "cd backend && php artisan serve"

timeout /t 3

echo Starting Next.js frontend...
start cmd /k "cd frontend && npm run dev"

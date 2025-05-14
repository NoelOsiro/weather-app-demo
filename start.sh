#!/bin/bash
echo "Starting Laravel backend..."
(cd backend && php artisan serve) &

sleep 3

echo "Starting Next.js frontend..."
(cd frontend && npm run dev)

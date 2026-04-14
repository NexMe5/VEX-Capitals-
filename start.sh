#!/bin/bash
echo "🚀 Starting VEX Website..."
echo ""

# Install backend deps
echo "📦 Installing backend dependencies..."
cd backend && npm install --silent
echo "✅ Backend ready"

# Start backend in background
npm start &
BACKEND_PID=$!
echo "🟢 Backend running (PID $BACKEND_PID)"

cd ../frontend

# Install frontend deps
echo ""
echo "📦 Installing frontend dependencies..."
npm install --silent
echo "✅ Frontend ready"

echo ""
echo "🌐 Starting frontend dev server..."
echo ""
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT

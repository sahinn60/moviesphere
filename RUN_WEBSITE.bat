@echo off
title MovieSphere - Frontend
color 0B

echo.
echo ============================================
echo   MOVIESPHERE - Starting...
echo ============================================
echo.
echo   Website: http://localhost:5173
echo.
echo   Press Ctrl+C to stop.
echo.

cd /d "c:\Users\MD SAHIN AHMMED\Downloads\MovieSphere"
"C:\Program Files\nodejs\node.exe" node_modules\vite\bin\vite.js --port 5173 --open

pause

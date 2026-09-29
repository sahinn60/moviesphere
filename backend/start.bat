@echo off
title Cinevora Backend Server
color 0A

echo.
echo ============================================
echo   CINEVORA BACKEND SERVER
echo ============================================
echo.
echo   API URL:      http://localhost:5000
echo   Health Check: http://localhost:5000/health
echo   Admin Login:  POST http://localhost:5000/api/admin/login
echo.
echo Press Ctrl+C to stop the server.
echo.

cd /d "c:\Users\MD SAHIN AHMMED\Downloads\Cinevora\backend"
call "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev

pause

@echo off
title Push Cinevora Backend to GitHub
color 0A

echo.
echo ============================================
echo   PUSHING TO GITHUB
echo ============================================
echo.

cd /d "c:\Users\MD SAHIN AHMMED\Downloads\Cinevora\backend"

git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/sahinn60/cinevora-backend.git
git push -u origin main

echo.
echo ============================================
echo   DONE! Check: https://github.com/sahinn60/cinevora-backend
echo ============================================
pause

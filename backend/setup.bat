@echo off
title Cinevora Backend Setup
color 0A

echo.
echo ============================================
echo   CINEVORA BACKEND - AUTO SETUP
echo ============================================
echo.

cd /d "c:\Users\MD SAHIN AHMMED\Downloads\Cinevora\backend"

:: Detect PostgreSQL path
set PGPATH=
if exist "C:\Program Files\PostgreSQL\17\bin\psql.exe" set PGPATH=C:\Program Files\PostgreSQL\17\bin
if exist "C:\Program Files\PostgreSQL\16\bin\psql.exe" set PGPATH=C:\Program Files\PostgreSQL\16\bin
if exist "C:\Program Files\PostgreSQL\15\bin\psql.exe" set PGPATH=C:\Program Files\PostgreSQL\15\bin
if exist "C:\Program Files\PostgreSQL\14\bin\psql.exe" set PGPATH=C:\Program Files\PostgreSQL\14\bin

if "%PGPATH%"=="" (
    echo.
    echo ERROR: PostgreSQL not found!
    echo.
    echo Please install PostgreSQL from:
    echo https://www.postgresql.org/download/windows/
    echo.
    echo During install use password: postgres123
    echo.
    pause
    exit /b 1
)

echo [1/5] PostgreSQL found at: %PGPATH%

:: Create Database
echo.
echo [2/5] Creating database 'cinevora'...
set PGPASSWORD=postgres123
"%PGPATH%\psql.exe" -U postgres -c "CREATE DATABASE cinevora;" 2>nul
echo Done!

:: Generate Prisma Client
echo.
echo [3/5] Generating Prisma client...
call "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run prisma:generate
if errorlevel 1 (
    echo ERROR: Prisma generate failed!
    pause
    exit /b 1
)
echo Done!

:: Run Migrations
echo.
echo [4/5] Running database migrations...
call "C:\Program Files\nodejs\node.exe" node_modules\.bin\prisma migrate dev --name init
if errorlevel 1 (
    echo Trying deploy mode...
    call "C:\Program Files\nodejs\node.exe" node_modules\.bin\prisma migrate deploy
)
echo Done!

:: Seed Database
echo.
echo [5/5] Seeding database with demo data...
call "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run prisma:seed
if errorlevel 1 (
    echo ERROR: Seed failed! Check database connection.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   SETUP COMPLETE!
echo ============================================
echo.
echo   Admin Email:    admin@cinevora.com
echo   Admin Password: admin123456
echo   API URL:        http://localhost:5000
echo   Health Check:   http://localhost:5000/health
echo.
echo Starting server... (Press Ctrl+C to stop)
echo.
call "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev

pause

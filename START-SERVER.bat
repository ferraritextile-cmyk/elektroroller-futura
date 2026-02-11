@echo off
echo ============================================
echo  Elektroroller Futura - Development Server
echo ============================================
echo.
echo Starte Server...
echo.

cd /d "%~dp0"
start http://localhost:3000
npm run dev

pause

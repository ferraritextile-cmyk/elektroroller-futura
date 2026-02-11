@echo off
echo ============================================
echo  Elektroroller Futura - Admin Dashboard
echo ============================================
echo.
echo Oeffne Admin-Dashboard im Browser...
echo.

REM Versuche verschiedene Ports
start http://localhost:3000/admin/leads
timeout /t 1 /nobreak >nul
start http://localhost:3001/admin/leads
timeout /t 1 /nobreak >nul
start http://localhost:3002/admin/leads

echo.
echo Falls der Server nicht laeuft, starten Sie zuerst:
echo START-SERVER.bat
echo.
pause

@echo off
echo ============================================
echo  Elektroroller Futura - Projekt oeffnen
echo ============================================
echo.

cd /d "%~dp0"

REM Versuche VS Code zu oeffnen
where code >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Oeffne Projekt in VS Code...
    code .
) else (
    echo VS Code nicht gefunden. Oeffne Ordner im Explorer...
    explorer .
)

REM Oeffne auch das Terminal
echo.
echo Druecken Sie eine beliebige Taste um das Terminal zu oeffnen...
pause >nul
start cmd /k "cd /d "%~dp0" && echo Projekt-Verzeichnis: %CD% && echo. && echo Verfuegbare Befehle: && echo   npm run dev    - Server starten && echo   npm run build  - Production Build && echo."

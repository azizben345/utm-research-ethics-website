@echo off
TITLE UTM REC Prototype Launcher
color 0A
echo ========================================================
echo       STARTING UTM RESEARCH ETHICS SYSTEM (UTMREC)
echo ========================================================
echo.

:: Check if node_modules exists, if not, automatically install dependencies
if not exist "node_modules\" (
    echo [Info] Dependencies not found. Installing packages for the first time...
    call npm install
    echo.
)

echo [Info] Launching Backend Database Server & Frontend Portal...
echo [Info] Keep this window open while using the app.
echo.

:: Runs your package.json start script (which fires both server and vite)
call npm start

pause
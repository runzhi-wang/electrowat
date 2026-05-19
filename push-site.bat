@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"
title ElectroWat DB - Git Upload

echo.
echo ========================================
echo   ElectroWat DB - Upload to GitHub
echo ========================================
echo.

where powershell >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PowerShell not found. Install Windows PowerShell or run push-site.ps1 manually.
    echo.
    pause
    exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0push-site.ps1" %*
set EXITCODE=%ERRORLEVEL%

echo.
if %EXITCODE% EQU 0 (
    echo [OK] Finished. GitHub Pages may update in 1-3 minutes.
) else (
    echo [FAIL] Script exited with code %EXITCODE%.
    echo        Check messages above ^(git login, network, commit errors^).
)
echo.
pause
exit /b %EXITCODE%

@echo off
echo ==========================================
echo  CosmodiLoans - Dev Server Reset
echo ==========================================
echo.

cd /d C:\Cosmedi

echo [1/3] Killing all node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Clearing .next cache...
rmdir /s /q .next 2>nul

echo [3/3] Starting fresh dev server on port 3000...
echo.
echo  http://localhost:3000
echo.
npx next dev -p 3000

@echo off
echo ==========================================
echo  CosmodiLoans - Dev Server + Cloudflare Tunnel
echo ==========================================
echo.

cd /d C:\Cosmedi

echo [1/3] Killing old processes...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM cloudflared.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Clearing cache and starting dev server...
rmdir /s /q .next 2>nul
start /b cmd /c "npx next dev -p 3000 2>&1"
echo Waiting for dev server to start...
timeout /t 10 /nobreak >nul

echo [3/3] Starting Cloudflare tunnel...
echo.
echo ==========================================
echo  Your external URL will appear below:
echo ==========================================
echo.
npx cloudflared tunnel --url http://localhost:3000

@echo off
echo ==========================================
echo  CosmediLoans - Dev Server + Cloudflare Tunnel
echo ==========================================
echo.

cd /d C:\Cosmedi

echo [1/3] Killing old processes...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM cloudflared.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Starting dev server (keeping cache)...
start cmd /k "npx next dev -p 3000"

echo Waiting for dev server on http://localhost:3000 ...
:WAIT_LOOP
timeout /t 3 /nobreak >nul
curl -s -o nul -w "%%{http_code}" http://localhost:3000 | findstr /r "^[23]" >nul 2>&1
if errorlevel 1 (
    echo   still starting...
    goto WAIT_LOOP
)
echo   Dev server is ready!

echo.
echo [3/3] Starting Cloudflare tunnel...
echo.
echo ==========================================
echo  Your external URL will appear below:
echo ==========================================
echo.
cloudflared tunnel --url http://localhost:3000 --protocol http2

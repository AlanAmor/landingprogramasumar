@echo off
REM Script para iniciar el servidor PHP en Windows
REM Ejecuta este archivo haciendo doble clic

echo.
echo ========================================
echo  SERVIDOR PHP - PROGRAMA SUMAR +
echo ========================================
echo.

REM Verifica si PHP está instalado
php --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PHP no está instalado o no está en el PATH
    echo.
    echo Solución:
    echo 1. Instala PHP desde: https://www.php.net/downloads
    echo 2. Agrega PHP al PATH de Windows
    echo 3. Ejecuta este archivo nuevamente
    echo.
    pause
    exit /b 1
)

echo [OK] PHP detectado
echo.
echo Iniciando servidor en: http://localhost:8888
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Inicia el servidor
php -S localhost:8888

pause

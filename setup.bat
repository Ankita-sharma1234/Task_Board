@echo off
echo ========================================
echo    Task Management App Setup Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd Backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependencies installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..\Frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependencies installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Creating .env file for Backend...
cd ..\Backend
echo JWT_SECRET=your_strong_jwt_secret_key_here_make_it_strong_and_random > .env
echo MONGO_URI=mongodb+srv://ankitasharma162002_db_user:wBbkhtbeQMJrRtJm@cluster0.jbxrpqx.mongodb.net/Mern_task_DB?retryWrites=true^&w=majority^&appName=Cluster0 >> .env
echo PORT=5000 >> .env
echo .env file created successfully!
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo    Setup Instructions:
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start Backend (Terminal 1):
echo    cd Backend
echo    npm start
echo.
echo 2. Start Frontend (Terminal 2):
echo    cd Frontend
echo    npm run dev
echo.
echo 3. Access Application:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo ========================================
echo.
pause

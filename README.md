# Task Management App

A full-stack MERN application for managing projects and tasks.

## 🚀 Quick Start (Clone & Run)

### 1. Clone Repository
```bash
git clone https://github.com/Ankita-sharma1234/Task_Board.git
cd Task_Board
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file in Backend directory:
```env
JWT_SECRET=your_strong_jwt_secret_key_here_make_it_strong_and_random
MONGO_URI=mongodb+srv://ankitasharma162002_db_user:wBbkhtbeQMJrRtJm@cluster0.jbxrpqx.mongodb.net/Mern_task_DB?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

Start backend:
```bash
npm start
# or
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Test**: http://localhost:5000/api/test

## 📋 Features

- ✅ User Authentication (Register/Login)
- ✅ Project Management
- ✅ Task Management within Projects
- ✅ Real-time updates
- ✅ Responsive UI
- ✅ JWT Authentication
- ✅ MongoDB Integration

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

## 📁 Project Structure

```
Task_Board/
├── Frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api/
│   └── package.json
├── Backend/           # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
└── README.md
```

## 🔧 Development Commands

### Backend
```bash
cd Backend
npm install          # Install dependencies
npm start           # Start production server
npm run dev         # Start development server (nodemon)
```

### Frontend
```bash
cd Frontend
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get specific project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/projects/:projectId/tasks` - Get project tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `PUT /api/projects/:projectId/tasks/:taskId` - Update task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete task

## 🔐 Environment Variables

Create a `.env` file in the Backend directory:

```env
JWT_SECRET=your_strong_jwt_secret_key_here_make_it_strong_and_random
MONGO_URI=mongodb+srv://ankitasharma162002_db_user:wBbkhtbeQMJrRtJm@cluster0.jbxrpqx.mongodb.net/Mern_task_DB?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

## 🚀 Deployment Options

### Frontend Deployment
- **Vercel**: Connect GitHub repo, select Frontend folder
- **Netlify**: Connect GitHub repo, build command: `npm run build`

### Backend Deployment
- **Railway**: Connect GitHub repo, select Backend folder
- **Render**: Connect GitHub repo, select Backend folder
- **Heroku**: Connect GitHub repo, select Backend folder

## 🐛 Troubleshooting

### Common Issues:
1. **Port already in use**: Change PORT in .env file
2. **MongoDB connection failed**: Check MONGO_URI in .env
3. **CORS errors**: Check frontend URL in server.js
4. **Build errors**: Run `npm install` in both directories

### Test API:
```bash
curl http://localhost:5000/api/test
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check console for error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

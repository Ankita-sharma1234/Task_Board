# Task Management App

A full-stack MERN application for managing projects and tasks.

## Features

- User Authentication (Register/Login)
- Project Management
- Task Management within Projects
- Real-time updates
- Responsive UI

## Tech Stack

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

## Project Structure

```
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

## Setup Instructions

### Backend Setup
1. Navigate to Backend directory
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start server: `npm start` or `npm run dev`

### Frontend Setup
1. Navigate to Frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## API Endpoints

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

## Environment Variables

Create a `.env` file in the Backend directory:

```
JWT_SECRET=your_strong_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Deployment

This project can be deployed on platforms like:
- Vercel (Frontend)
- Railway/Heroku (Backend)
- MongoDB Atlas (Database)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

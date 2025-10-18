// // frontend/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Projects from './pages/Projects';
// import ProjectTasks from './pages/ProjectTasks';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
//             <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
//             <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
//             <Route path="/projects/:id" element={<ProtectedRoute><ProjectTasks /></ProtectedRoute>} />
//             <Route path="/" element={<Navigate to="/projects" />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// function ProtectedRoute({ children }) {
//   const { token } = useAuth();
//   return token ? children : <Navigate to="/login" />;
// }

// export default App;


// frontend/src/App.jsx
// frontend/src/App.jsx
// FIXED: Login and Register routes are now PUBLIC (no ProtectedRoute). This prevents infinite redirect loop causing blank UI.

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import ProjectTasks from './pages/ProjectTasks';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectTasks /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default App;
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './modules/auth/pages/login.jsx';
import Signup from './modules/auth/pages/signup.jsx'; // Import the new Signup component
import StudentDashboard from './modules/student/pages/StudentDashboard.jsx'; // Import the StudentDashboard component
import TeacherDashboard from './modules/teacher/pages/TeacherDashboard.jsx'; // Import the TeacherDashboard component
import ClassPage from './modules/teacher/pages/ClassPage.jsx'; // Import the ClassPage component
import StudentDetailPage from './modules/teacher/pages/StudentDetailPage.jsx'; // Import the StudentDetailPage component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Route for Student Dashboard with nested routes */}
        <Route path="/student-dashboard/*" element={<StudentDashboard />} /> {/* Use * for nested routes */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/class" element={<ClassPage />} />
        <Route path="/teacher/student/:studentId" element={<StudentDetailPage />} />
        {/* You can add a default route or redirect here if needed */}
        <Route path="/" element={<Signup />} /> {/* Default to signup */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

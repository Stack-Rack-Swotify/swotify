import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './modules/auth/pages/login.jsx';
import Signup from './modules/auth/pages/signup.jsx';
import TermsPage from './modules/auth/pages/TermsPage.jsx';
import PrivacyPage from './modules/auth/pages/PrivacyPage.jsx';
import HelpCenterPage from './modules/auth/pages/HelpCenterPage.jsx';
import StudentDashboard from './modules/student/pages/StudentDashboard.jsx';
import TeacherDashboard from './modules/teacher/pages/TeacherDashboard.jsx';
import StudentProfile from './modules/student/pages/StudentProfile.jsx';
import AdminDashboard from './modules/admin/pages/AdminDashboard.jsx';
import SuperAdminDashboard from './modules/superAdmin/pages/SuperAdminDashboard.jsx';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/super-admin-dashboard/*" element={<SuperAdminDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

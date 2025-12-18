// src/modules/auth/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import mockUsers from '../../../data/users.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const localUsers = JSON.parse(localStorage.getItem('swotify_users') || '[]');
      const allUsers = [...mockUsers, ...localUsers];

      const user = allUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        if (user.role === selectedRole || (selectedRole === 'Super Admin' && user.role === 'Developer')) {
          localStorage.setItem('swotify_current_user', JSON.stringify(user));

          if (user.role === 'Student') navigate('/student-dashboard');
          else if (user.role === 'Teacher') navigate('/teacher-dashboard');
          else if (user.role === 'Admin') navigate('/admin-dashboard');
          else if (user.role === 'Super Admin' || user.role === 'Developer') navigate('/super-admin-dashboard');
          else navigate('/student-dashboard');
        } else {
          setError('Role mismatch. Please select the correct role.');
        }
      } else {
        setError('Invalid ID or Password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const getRoleIcon = () => {
    switch (selectedRole) {
      case 'Student': return (
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
      case 'Teacher': return (
        <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      );
      case 'Admin': return (
        <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
      case 'Super Admin': return (
        <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
      default: return null;
    }
  };

  const getRoleColor = () => {
    switch (selectedRole) {
      case 'Student': return 'bg-blue-500 hover:bg-blue-600';
      case 'Teacher': return 'bg-orange-500 hover:bg-orange-600';
      case 'Admin': return 'bg-purple-500 hover:bg-purple-600';
      case 'Super Admin': return 'bg-slate-800 hover:bg-slate-900';
      default: return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const stats = [
    { label: 'Courses', value: '4.2k+', color: 'blue' },
    { label: 'Students', value: '128k', color: 'purple' },
    { label: 'Global Rank', value: '#12', color: 'orange' },
  ];

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-slate-50">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Fixed Top Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 px-6 z-50 shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Swotify" className="w-10 h-10 object-contain" />
            <h1 className="text-xl font-black text-slate-800 leading-none tracking-tighter">Swotify</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Status: Online</span>
            </div>
            <Link to="/help" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Help Center</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 relative z-10 overflow-hidden">
        <div className="max-w-7xl w-full h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Left Column: Branding */}
          <div className="flex-1 flex flex-col justify-center space-y-6 lg:space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 mx-auto lg:mx-0 w-fit">
                Intelligent Education
              </div>
              <h2 className="text-4xl md:text-6xl xl:text-7xl font-black text-slate-800 leading-[1.1] tracking-tight">
                AI-powered <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">Management.</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                The smart companion for modern schools. Unifying principals, teachers, and parents in one seamless ecosystem.
              </p>
            </div>

            {/* Stats */}
            <div className="hidden md:block pt-6 border-t border-slate-200/60 max-w-lg">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3
                      ${stat.color === 'blue' ? 'bg-blue-50 text-blue-500' : ''}
                      ${stat.color === 'purple' ? 'bg-purple-50 text-purple-500' : ''}
                      ${stat.color === 'orange' ? 'bg-orange-50 text-orange-500' : ''}
                    `}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-black text-slate-800 tracking-tighter">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Auth Form */}
          <div className="flex-1 flex flex-col items-center lg:items-end justify-center w-full max-w-md lg:max-w-none">
            <div className="w-full max-w-md relative z-20">
              <div className="bg-white border border-slate-200 rounded-[1.5rem] shadow-2xl p-5 md:p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -z-10 opacity-50"></div>

                <div className="flex flex-col items-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-2 ring-4 ring-slate-50/50">
                    {React.cloneElement(getRoleIcon(), { className: getRoleIcon()?.props?.className?.replace('w-10 h-10', 'w-8 h-8') })}
                  </div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight text-center">Sign In</h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Institutional Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Role Select */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Portal View</label>
                    <div className="relative">
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer text-sm"
                      >
                        <option value="Student">🎓 Student View</option>
                        <option value="Teacher">📝 Educator Portal</option>
                        <option value="Admin">⚙️ Admin Access</option>
                        <option value="Super Admin">👑 Super Admin</option>
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className={`w-4 h-4 ${selectedRole === 'Student' ? 'text-blue-500' : selectedRole === 'Teacher' ? 'text-orange-500' : selectedRole === 'Admin' ? 'text-purple-500' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Campus Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-medium text-sm"
                      placeholder="id@swotify.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Key</label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-medium text-sm"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* Error */}
                  {error && <p className="text-red-500 text-[10px] font-bold text-center">{error}</p>}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group w-full py-3 rounded-lg font-black text-white transition-all shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50 ${getRoleColor()}`}
                  >
                    {isLoading ? "..." : "Sign In"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="text-blue-500 hover:text-blue-600 transition-colors text-xs font-bold">
                    Need an account?
                  </Link>
                  <p className="text-[9px] text-slate-400 italic mt-4 font-medium max-w-[200px] mx-auto opacity-70">
                    "Always remember to sign out on library computers."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-3 px-8 bg-white/80 backdrop-blur-md border-t border-slate-200 shrink-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <p className="text-slate-800 font-black text-sm tracking-tighter uppercase">Swotify</p>
            <span className="h-4 w-[1px] bg-slate-200 hidden md:block"></span>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest hidden md:block">© 2024 Intelligence Solutions</p>
          </div>
          <div className="flex gap-6 items-center">
            <Link to="/terms" className="text-[9px] font-black text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Terms</Link>
            <Link to="/privacy" className="text-[9px] font-black text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Online
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { AuthMode } from '../types';
import { GoogleGenAI } from '@google/genai';

interface AuthFormProps {
  mode: AuthMode;
  onToggleMode: () => void;
}

type UserRole = 'student' | 'teacher' | 'parent';

const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [securityTip, setSecurityTip] = useState<string | null>(null);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const res = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Give a friendly, encouraging 10-word security tip for students logging into school.",
        });
        setSecurityTip(res.text || "Keep your school password secret and safe!");
      } catch (e) {
        setSecurityTip("Always remember to sign out on library computers.");
      }
    };
    fetchTip();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      if (email === 'test@error.com') {
        setError("Invalid ID or Password.");
      } else {
        alert(`Swotify ${role.toUpperCase()} Login Success!`);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getRoleIcon = () => {
    switch(role) {
      case 'student': return (
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
      case 'teacher': return (
        <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      );
      case 'parent': return (
        <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -z-10 opacity-50"></div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3 ring-4 ring-slate-50/50">
          {getRoleIcon()}
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight text-center">
          {mode === 'login' ? 'Sign In' : 'Join the Hub'}
        </h2>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Institutional Portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Portal View</label>
          <div className="relative group">
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer text-sm"
            >
              <option value="student">🎓 Student View</option>
              <option value="teacher">📝 Educator Portal</option>
              <option value="parent">🏡 Guardian Access</option>
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className={`w-4 h-4 ${role === 'student' ? 'text-blue-500' : role === 'teacher' ? 'text-orange-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {mode === 'signup' && (
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Name</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm"
              placeholder="e.g. Alex Johnson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Campus Email</label>
          <input 
            type="email" required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm"
            placeholder="id@swotify.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
          </div>
          <input 
            type="password" required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-sm"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-[10px] font-bold text-center">{error}</p>}

        <button 
          type="submit" disabled={isLoading}
          className={`group w-full py-3.5 rounded-xl font-black text-white transition-all shadow-lg flex items-center justify-center gap-2 overflow-hidden relative text-sm
            ${role === 'student' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            ${role === 'teacher' ? 'bg-orange-500 hover:bg-orange-600' : ''}
            ${role === 'parent' ? 'bg-purple-500 hover:bg-purple-600' : ''}
            disabled:opacity-50
          `}
        >
          {isLoading ? "..." : (mode === 'login' ? `Sign In` : 'Create Account')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={onToggleMode}
          className="text-blue-500 hover:text-blue-600 transition-colors text-xs font-bold"
        >
          {mode === 'login' ? 'Need an account?' : 'Already have an ID?'}
        </button>

        {securityTip && (
          <p className="text-[9px] text-slate-400 italic mt-4 font-medium max-w-[200px] mx-auto opacity-70">
            "{securityTip}"
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;


import React, { useState } from 'react';
import { AuthMode } from './types';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import StatsPreview from './components/StatsPreview';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

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
          <Header small />
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Status: Online</span>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Help Center</button>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Flexible but restricted to viewport */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 relative z-10 overflow-hidden">
        <div className="max-w-7xl w-full h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Column: Branding & Stats */}
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

            {/* Compact Feature List / Stats */}
            <div className="hidden md:block pt-6 border-t border-slate-200/60 max-w-lg">
              <StatsPreview />
            </div>
          </div>

          {/* Right Column: Auth Form */}
          <div className="flex-1 flex flex-col items-center lg:items-end justify-center w-full max-w-md lg:max-w-none">
            <div className="w-full max-w-md relative z-20">
              <div className="scale-90 xl:scale-100 origin-center lg:origin-right">
                <AuthForm 
                  mode={authMode} 
                  onToggleMode={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Footer */}
      <Footer />
    </div>
  );
};

export default App;


import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3 px-8 bg-white/80 backdrop-blur-md border-t border-slate-200 shrink-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <p className="text-slate-800 font-black text-sm tracking-tighter uppercase">Swotify</p>
          <span className="h-4 w-[1px] bg-slate-200 hidden md:block"></span>
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest hidden md:block">© 2024 Intelligence Solutions</p>
        </div>
        
        <div className="flex gap-6 items-center">
          <a href="#" className="text-[9px] font-black text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Terms</a>
          <a href="#" className="text-[9px] font-black text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" className="text-[9px] font-black text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">System Status</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

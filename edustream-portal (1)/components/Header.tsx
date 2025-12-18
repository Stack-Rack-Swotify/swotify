
import React from 'react';

interface HeaderProps {
  small?: boolean;
}

const Header: React.FC<HeaderProps> = ({ small }) => {
  return (
    <div className="flex items-center gap-4">
      <div className={`${small ? 'w-10 h-10 rounded-xl' : 'w-14 h-14 rounded-2xl'} bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-lg shadow-blue-500/20`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`${small ? 'h-5 w-5' : 'h-7 w-7'} text-white`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <div>
        <h1 className={`${small ? 'text-xl' : 'text-3xl'} font-black text-slate-800 leading-none tracking-tighter`}>Swotify</h1>
        {!small && <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Smart School Systems</p>}
      </div>
    </div>
  );
};

export default Header;

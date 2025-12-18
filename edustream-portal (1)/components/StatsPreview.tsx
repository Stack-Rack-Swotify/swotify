
import React from 'react';
import { StatItem } from '../types';

const schoolStats: StatItem[] = [
  {
    id: '1',
    label: 'Courses',
    value: '4.2k+',
    color: 'blue',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: '2',
    label: 'Students',
    value: '128k',
    color: 'purple',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: '3',
    label: 'Global Rank',
    value: '#12',
    color: 'orange',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
];

const StatsPreview: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {schoolStats.map((stat) => (
        <div 
          key={stat.id}
          className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`w-6 h-6 rounded-md flex items-center justify-center mb-2
            ${stat.color === 'blue' ? 'bg-blue-50 text-blue-500' : ''}
            ${stat.color === 'purple' ? 'bg-purple-50 text-purple-500' : ''}
            ${stat.color === 'orange' ? 'bg-orange-50 text-orange-500' : ''}
          `}>
            {stat.icon}
          </div>
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
          <p className="text-sm font-black text-slate-800 tracking-tighter">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsPreview;

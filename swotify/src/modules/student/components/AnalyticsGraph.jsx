import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsGraph = ({ title = 'Performance Trend', graphData = [], labels }) => {
  const chartLabels = labels || graphData.map((_, index) => `Week ${index + 1}`);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Score',
        data: graphData,
        borderColor: '#0EA5E9',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(14, 165, 233, 0.3)');
          gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.15)');
          gradient.addColorStop(1, 'rgba(14, 165, 233, 0.05)');
          return gradient;
        },
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#0EA5E9',
        pointBorderWidth: 3,
        pointHoverBackgroundColor: '#0EA5E9',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0F172A',
        bodyColor: '#64748B',
        borderColor: '#0EA5E9',
        borderWidth: 2,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Score: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748B',
          font: {
            size: 11,
            weight: '500',
            family: 'system-ui',
          },
          callback: function(value) {
            return value + '%';
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748B',
          font: {
            size: 11,
            weight: '500',
            family: 'system-ui',
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  // Calculate statistics
  const maxScore = graphData.length > 0 ? Math.max(...graphData) : 0;
  const minScore = graphData.length > 0 ? Math.min(...graphData) : 0;
  const avgScore = graphData.length > 0 
    ? Math.round(graphData.reduce((sum, val) => sum + val, 0) / graphData.length) 
    : 0;
  const trend = graphData.length >= 2 
    ? graphData[graphData.length - 1] - graphData[0] 
    : 0;

  return (
    <div className="group relative bg-white/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Premium Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Premium Header */}
      <div className="relative bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-5 border-b-2 border-slate-200/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                Interactive performance visualization
              </p>
            </div>
          </div>
          {graphData.length > 0 && (
            <div className="flex items-center gap-2">
              {trend > 0 ? (
                <div className="group/badge flex items-center gap-2 text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full text-sm font-semibold border-2 border-emerald-300 shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 group-hover/badge:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +{trend.toFixed(0)}%
                </div>
              ) : trend < 0 ? (
                <div className="group/badge flex items-center gap-2 text-rose-600 bg-gradient-to-r from-rose-50 to-red-50 px-4 py-2 rounded-full text-sm font-semibold border-2 border-rose-300 shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 group-hover/badge:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  {trend.toFixed(0)}%
                </div>
              ) : (
                <div className="group/badge flex items-center gap-2 text-cyan-600 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-2 rounded-full text-sm font-semibold border-2 border-cyan-300 shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                  Stable
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Premium Graph Area */}
      <div className="relative p-6">
        <div className="h-64 w-full">
          {graphData.length > 0 ? (
            <Line data={data} options={options} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl flex items-center justify-center border-2 border-cyan-300 shadow-lg">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-slate-900 font-bold text-lg">No graph data available</p>
              <p className="text-slate-600 text-sm mt-2">Data will appear here once available</p>
            </div>
          )}
        </div>
      </div>

      {/* Premium Statistics Footer */}
      {graphData.length > 0 && (
        <div className="relative bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-5 border-t-2 border-slate-200/60">
          <div className="grid grid-cols-3 gap-5">
            {/* Highest Score */}
            <div className="group/stat text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover/stat:rotate-12 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Highest</span>
              </div>
              <p className="text-3xl font-bold text-emerald-600">{maxScore}%</p>
            </div>

            {/* Average Score */}
            <div className="group/stat text-center p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg group-hover/stat:rotate-12 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Average</span>
              </div>
              <p className="text-3xl font-bold text-cyan-600">{avgScore}%</p>
            </div>

            {/* Lowest Score */}
            <div className="group/stat text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover/stat:rotate-12 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Lowest</span>
              </div>
              <p className="text-3xl font-bold text-orange-600">{minScore}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsGraph;
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

const AnalyticsGraph = ({ title = 'Performance Trend', graphData = [] }) => {
  const labels = graphData.map((_, index) => `Week ${index + 1}`);

  const data = {
    labels,
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
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">{title}</h2>
              <p className="text-xs text-[#64748B]">Interactive performance visualization</p>
            </div>
          </div>
          {graphData.length > 0 && (
            <div className="flex items-center gap-2">
              {trend > 0 ? (
                <span className="flex items-center gap-1 text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full text-xs font-semibold border border-[#22C55E]/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +{trend.toFixed(0)}%
                </span>
              ) : trend < 0 ? (
                <span className="flex items-center gap-1 text-[#E11D48] bg-[#E11D48]/10 px-3 py-1 rounded-full text-xs font-semibold border border-[#E11D48]/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  {trend.toFixed(0)}%
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[#0EA5E9] bg-[#0EA5E9]/10 px-3 py-1 rounded-full text-xs font-semibold border border-[#0EA5E9]/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                  </svg>
                  Stable
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Graph Area */}
      <div className="p-6">
        <div className="h-64 w-full">
          {graphData.length > 0 ? (
            <Line data={data} options={options} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0F172A]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-[#0F172A] font-medium">No graph data available</p>
              <p className="text-[#64748B] text-sm mt-1">Data will appear here once available</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Footer */}
      {graphData.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Highest</span>
              </div>
              <p className="text-xl font-bold text-[#22C55E]">{maxScore}%</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Average</span>
              </div>
              <p className="text-xl font-bold text-[#0EA5E9]">{avgScore}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Lowest</span>
              </div>
              <p className="text-xl font-bold text-[#F97316]">{minScore}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsGraph;

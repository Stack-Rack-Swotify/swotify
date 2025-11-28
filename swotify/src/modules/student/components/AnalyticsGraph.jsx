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
  Legend
);

const AnalyticsGraph = ({ title = 'Performance Trend', graphData = [] }) => {
  const labels = graphData.map((_, index) => `Point ${index + 1}`); // Generic labels for now

  const data = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: graphData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100, // Assuming scores are out of 100
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="h-64 w-full mx-auto">
        {graphData.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No graph data available.</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        This interactive graph visualizes the performance trend.
      </p>
    </div>
  );
};

export default AnalyticsGraph;

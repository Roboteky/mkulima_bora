// src/components/Charts/LineChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

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

const LineChart = ({ data, labels, title, unit, color, fill = false }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        backgroundColor: fill ? `${color}40` : 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: color,
        tension: 0.4,
        fill: fill
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}${unit || ''}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: unit || ''
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="h-64 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
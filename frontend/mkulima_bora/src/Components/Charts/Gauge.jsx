import { farmData } from "../../dummyData";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
const PHGauge = () => {
  const currentPH = farmData.soil_health.current.ph;

  // pH color ranges and their meanings
  const phRanges = [
    { min: 0, max: 4.5, color: '#DC2626', label: 'Strongly Acidic', textColor: 'text-red-600' },
    { min: 4.5, max: 5.5, color: '#EA580C', label: 'Moderately Acidic', textColor: 'text-orange-600' },
    { min: 5.5, max: 6.5, color: '#D97706', label: 'Slightly Acidic', textColor: 'text-amber-600' },
    { min: 6.5, max: 7.5, color: '#16A34A', label: 'Neutral (Optimal)', textColor: 'text-green-600' },
    { min: 7.5, max: 8.5, color: '#2563EB', label: 'Slightly Alkaline', textColor: 'text-blue-600' },
    { min: 8.5, max: 10, color: '#7C3AED', label: 'Moderately Alkaline', textColor: 'text-purple-600' },
    { min: 10, max: 14, color: '#BE185D', label: 'Strongly Alkaline', textColor: 'text-pink-600' }
  ];

  // Get current pH status
  const getCurrentPHStatus = (ph) => {
    return phRanges.find(range => ph >= range.min && ph < range.max) || phRanges[phRanges.length - 1];
  };

  const currentStatus = getCurrentPHStatus(currentPH);

  // Custom plugin for needle
  const needlePlugin = {
    id: 'needle',
    afterDatasetsDraw: (chart) => {
      const { ctx, chartArea } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2 + 20;
      
      // Calculate needle angle based on pH value
      const phValue = currentPH;
      const minPH = 0;
      const maxPH = 14;
      const normalizedValue = (phValue - minPH) / (maxPH - minPH);
      const angle = (normalizedValue * Math.PI) - Math.PI;
      
      // Draw needle
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      
      // Needle line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -80);
      ctx.strokeStyle = currentStatus.color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Needle center circle
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, 2 * Math.PI);
      ctx.fillStyle = currentStatus.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
    }
  };

  // Chart data
  const data = {
    labels: phRanges.map(range => range.label),
    datasets: [{
      data: phRanges.map(range => range.max - range.min),
      backgroundColor: phRanges.map(range => range.color),
      borderWidth: 2,
      borderColor: '#ffffff',
      circumference: 180,
      rotation: 270,
    }]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    cutout: '75%',
    animation: {
      animateRotate: true,
      duration: 2000
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto border border-gray-100">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Soil pH Level</h3>
        <p className="text-sm text-gray-500">Farm: {farmData.setup}</p>
      </div>

      {/* Gauge Container */}
      <div className="relative">
        <div className="h-48 relative">
          <Doughnut 
            data={data} 
            options={options} 
            plugins={[needlePlugin]}
          />
        </div>
        
        {/* pH Value Display */}
        <div className="absolute inset-0 flex items-center justify-center mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{currentPH}</div>
            <div className="text-sm text-gray-500">pH</div>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="mt-4 text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.textColor} bg-opacity-10`} 
             style={{ backgroundColor: `${currentStatus.color}20` }}>
          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: currentStatus.color }}></div>
          {currentStatus.label}
        </div>
      </div>

      {/* pH Scale Reference */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="text-xs text-gray-500 text-center mb-2">pH Scale Reference</div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0 (Acidic)</span>
          <span>7 (Neutral)</span>
          <span>14 (Alkaline)</span>
        </div>
        <div className="mt-1 h-2 rounded-full overflow-hidden flex">
          {phRanges.map((range, index) => (
            <div 
              key={index}
              className="flex-1" 
              style={{ backgroundColor: range.color }}
            ></div>
          ))}
        </div>
      </div>

      {/* Historical pH Trend */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="text-xs text-gray-500 text-center mb-2">Recent pH History</div>
        <div className="flex justify-between items-center">
          {farmData.soil_health.historical.slice(-3).map((record, index) => {
            const date = new Date(record.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const status = getCurrentPHStatus(record.ph);
            return (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-400">{date}</div>
                <div className="text-sm font-medium" style={{ color: status.color }}>
                  {record.ph}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-400">
          Last updated: {new Date(farmData.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PHGauge;
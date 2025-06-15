import { Doughnut } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart as ChartJS } from "chart.js";
import { farmData } from "../../dummyData";

ChartJS.register(ArcElement, Tooltip, Legend);

const PHGuage = () => {
  const currentPH = farmData.soil_health.current.ph;
  const phValues = [
    { value: 0, color: '#8B0000', label: 'pH 0' },
    { value: 1, color: '#DC143C', label: 'pH 1' },
    { value: 2, color: '#FF0000', label: 'pH 2' },
    { value: 3, color: '#FF4500', label: 'pH 3' },
    { value: 4, color: '#FF6347', label: 'pH 4' },
    { value: 5, color: '#FF8C00', label: 'pH 5' },
    { value: 6, color: '#FFA500', label: 'pH 6' },
    { value: 7, color: '#32CD32', label: 'pH 7' },
    { value: 8, color: '#00CED1', label: 'pH 8' },
    { value: 9, color: '#1E90FF', label: 'pH 9' },
    { value: 10, color: '#0000FF', label: 'pH 10' },
    { value: 11, color: '#4169E1', label: 'pH 11' },
    { value: 12, color: '#8A2BE2', label: 'pH 12' },
    { value: 13, color: '#9932CC', label: 'pH 13' },
    { value: 14, color: '#800080', label: 'pH 14' }
  ];

  // Function to get color for a given pH value
  const getColorForPH = (ph) => {
    // Find the closest pH value in our scale
    const roundedPH = Math.round(ph);
    return phValues.find(item => item.value === roundedPH) || phValues[7]; // Default to neutral
  };

  const currentStatus = getColorForPH(currentPH);

  // Custom plugin for needle with dynamic color
  const needlePlugin = {
  id: 'needle',
  afterDatasetsDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2 + 20;
    
    // Calculate needle angle - corrected mapping
    const phValue = Math.max(0, Math.min(14, currentPH));
    const angle = Math.PI * (phValue / 14 - 0.5); // Now maps 0-14 to -π/2 to π/2
    
    // Get current color for the needle
    const needleColor = getColorForPH(currentPH).color;
    
    // Draw needle
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    
    // Needle line (pointing upwards after rotation)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -80);
    ctx.strokeStyle = needleColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Needle center circle
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, 8 * Math.PI);
    ctx.fillStyle = needleColor;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.restore();
  }
};

  // Chart data
  const data = {
    labels: phValues.map(ph => ph.label),
    datasets: [{
      data: new Array(15).fill(1),
      backgroundColor: phValues.map(ph => ph.color),
      borderWidth: 1,
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
      legend: { display: false },
      tooltip: { enabled: false }
    },
    cutout: '75%',
    animation: {
      animateRotate: true,
      duration: 2000
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Soil pH Level</h3>
        <p className="text-sm text-gray-500">Farm: {farmData.setup}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Gauge Container */}
        <div className="flex-1">
          <div className="relative">
            <div className="h-48 relative">
              <Doughnut 
                data={data} 
                options={options} 
                plugins={[needlePlugin]}
                redraw // Ensure chart redraws when data changes
              />
            </div>
            
            {/* pH Value Display */}
            <div className="absolute inset-0 flex items-center justify-center mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: currentStatus.color }}>
                  {currentPH.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">pH Level</div>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white" 
                 style={{ backgroundColor: currentStatus.color }}>
              <div className="w-2 h-2 rounded-full mr-2 bg-white"></div>
              Current: {currentStatus.label}
            </div>
          </div>

          {/* Scale Labels */}
          <div className="mt-4 flex justify-between text-xs text-gray-400">
            <span>0 (Very Acidic)</span>
            <span>7 (Neutral)</span>
            <span>14 (Very Alkaline)</span>
          </div>
        </div>

        {/* pH Color Key */}
        <div className="lg:w-64">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">pH Color Key</h4>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            {phValues.map((ph, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border border-gray-200"
                  style={{ backgroundColor: ph.color }}
                ></div>
                <span className="text-xs text-gray-600 flex-1">{ph.label}</span>
                {Math.round(currentPH) === ph.value && (
                  <span className="text-xs font-bold text-green-600">← Current</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical pH Trend */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="text-sm font-semibold text-gray-700 mb-3">Recent pH History</div>
        <div className="flex justify-between items-center">
          {farmData.soil_health.historical.slice(-3).map((record, index) => {
            const date = new Date(record.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const status = getColorForPH(record.ph);
            return (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-400 mb-1">{date}</div>
                <div 
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-bold text-white"
                  style={{ backgroundColor: status.color }}
                >
                  {record.ph.toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Last updated: {new Date(farmData.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PHGuage;

import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

// Simulating the farm data import
const farmData = {
  "farmer_id": "user_one",
  "setup": "SETUP A",
  "timestamp": "2025-06-13T12:27:00+03:00",
  "soil_health": {
    "current": {
      "ph": 1,
      "nitrogen": 25.3,
      "phosphorus": 15.7,
      "potassium": 20.1,
      "moisture": 45.2,
      "temperature": 23.8
    },
    "historical": [
      {
        "timestamp": "2025-06-13T00:00:00+03:00",
        "ph": 6.4,
        "nitrogen": 24.8,
        "phosphorus": 15.5,
        "potassium": 19.8,
        "moisture": 44.0,
        "temperature": 22.5
      },
      {
        "timestamp": "2025-06-12T00:00:00+03:00",
        "ph": 6.6,
        "nitrogen": 25.0,
        "phosphorus": 16.0,
        "potassium": 20.5,
        "moisture": 46.1,
        "temperature": 24.0
      },
      {
        "timestamp": "2025-06-11T00:00:00+03:00",
        "ph": 6.3,
        "nitrogen": 24.5,
        "phosphorus": 15.2,
        "potassium": 19.5,
        "moisture": 43.8,
        "temperature": 23.0
      }
    ]
  }
};

export const PhGauge = ({ title, value }) => {
  return (
    <div className="rounded-lg col-span-1 h-56 flex flex-col justify-center items-center dark:bg-slate-500 bg-white dark:bg-opacity-20 shadow-sm border">
      <p className="font-bold text-slate-600 dark:text-slate-300 uppercase text-sm tracking-wide w-full text-left px-4 py-2">
        {title}
      </p>
      <div className="h-48 w-full flex justify-center items-center p-2">
        <ReactSpeedometer
          width={270}
          height={180}
          ringWidth={40}
          needleHeightRatio={0.75}
          value={value ? value : 0}
          minValue={0}
          maxValue={14}
          maxSegmentLabels={14}
          segments={14}
          segmentColors={[
            "#ff4444", // 0-1: Very acidic (red)
            "#ff6644", // 1-2: Strongly acidic
            "#ff8844", // 2-3: Moderately acidic
            "#ffaa44", // 3-4: Moderately acidic
            "#ffcc44", // 4-5: Slightly acidic
            "#ffee44", // 5-6: Slightly acidic
            "#ccff44", // 6-7: Nearly neutral (yellow-green)
            "#88ff44", // 7-8: Neutral to slightly alkaline (green)
            "#44ff44", // 8-9: Slightly alkaline
            "#44ff88", // 9-10: Moderately alkaline
            "#44ffcc", // 10-11: Strongly alkaline
            "#44ccff", // 11-12: Very alkaline
            "#4488ff", // 12-13: Extremely alkaline
            "#4444ff"  // 13-14: Extremely alkaline (blue)
          ]}
          needleColor={"#57575c"}
          textColor={"#374151"}
          labelFontSize={"10px"}
          valueTextFontSize={"14px"}
          currentValueText={`pH Value: ${value ? value.toFixed(1) : "Updating..."}`}
          customSegmentStops={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
        />
      </div>
    </div>
  );
};

// Demo component showing the pH gauge with farm data
const PhGaugeDemo = () => {
  const currentPh = farmData.soil_health.current.ph;
  
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Soil pH Monitor
        </h1>
        
        <PhGauge 
          title="Soil pH Level" 
          value={currentPh} 
        />
        
        <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            pH Analysis
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current pH: <span className="font-medium text-red-600">{currentPh}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Status: <span className="font-medium text-red-600">Very Acidic</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Optimal range for most crops: 6.0 - 7.0
          </p>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 text-sm mb-2">
            Recent pH History
          </h4>
          {farmData.soil_health.historical.slice(0, 3).map((record, index) => (
            <div key={index} className="flex justify-between text-xs text-blue-700 dark:text-blue-400">
              <span>{new Date(record.timestamp).toLocaleDateString()}</span>
              <span>pH: {record.ph}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhGaugeDemo;
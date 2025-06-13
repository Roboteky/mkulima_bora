// src/components/Dashboard/OverviewCards.jsx
const OverviewCards = ({ farm }) => {
  const cards = [
    {
      title: "Soil pH",
      value: farm.soilMetrics.pH.current,
      unit: "pH",
      status: farm.soilMetrics.pH.status,
      icon: "🧪",
      trend: farm.soilMetrics.pH.trend.slice(-2),
      color: farm.soilMetrics.pH.status === 'optimal' ? 'green' : 'red'
    },
    // ... other cards
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-${card.color}-500`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</h3>
              <p className="text-2xl font-bold mt-1">
                {card.value} <span className="text-sm font-normal">{card.unit}</span>
              </p>
            </div>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className={`text-${card.color}-500`}>
              {card.trend[1] > card.trend[0] ? '↑' : card.trend[1] < card.trend[0] ? '↓' : '→'}
            </span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              {Math.abs(card.trend[1] - card.trend[0]).toFixed(1)}{card.unit} from last reading
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
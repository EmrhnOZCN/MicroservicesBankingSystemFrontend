import React from 'react';

// Dummy data for the chart
const chartData = [
  { currency: 'USD', value: 80 },
  { currency: 'EUR', value: 60 },
  { currency: 'JPY', value: 50 },
  { currency: 'GBP', value: 40 },
  { currency: 'TRY', value: 70 },
];

const ChartCard = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Exchange Rate Chart</h2>
      <div className="space-y-4">
        {chartData.map((data) => (
          <div key={data.currency} className="flex items-center">
            <span className="w-1/4 text-gray-700 font-medium">{data.currency}</span>
            <div className="w-3/4 bg-gray-200 rounded-full">
              <div
                className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
                style={{ width: `${data.value}%` }}
              >
                {data.value}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartCard;

import React from 'react';

const lineChartData = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 70 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 75 },
];

const LineChart = () => {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h5 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Data</h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this year</p>
        </div>
      </div>
      <div className="relative h-40">
        {/* Burada gerçek bir grafik kütüphanesi kullanılabilir. */}
        <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path
            d={`
              M0,80
              L${lineChartData.map((data, index) => `${index * 14},${80 - data.value}`).join(' L ')}
              L100,80
            `}
            fill="url(#lineGradient)"
            stroke="#4f46e5"
            strokeWidth="2"
          />
          {lineChartData.map((data, index) => (
            <circle
              key={index}
              cx={index * 14}
              cy={80 - data.value}
              r="2"
              fill="#4f46e5"
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="lastDaysdropdown"
          data-dropdown-placement="bottom"
          className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
          type="button">
          Last 6 months
          <svg className="w-2.5 h-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 1 month</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 3 months</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 6 months</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 1 year</a></li>
          </ul>
        </div>
        <a
          href="#"
          className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
          Sales Report
          <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LineChart;

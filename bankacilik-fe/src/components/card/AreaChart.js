import React from 'react';

const areaChartData = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 70 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 75 },
];

const AreaChart = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
      <div className="flex justify-between mb-4">
        <div>
          <h5 className="text-3xl font-bold text-gray-900">32.4k</h5>
          <p className="text-base font-normal text-gray-500">Users this week</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
          12%
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div>
      </div>
      <div className="relative flex-grow h-40">
        <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path
            d={`
              M0,100
              L${areaChartData.map((data, index) => `${index * 14},${100 - data.value}`).join(' L ')}
              L100,100
              Z
            `}
            fill="url(#gradient)"
            stroke="#60a5fa"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="lastDaysdropdown"
          data-dropdown-placement="bottom"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
          type="button">
          Last 7 days
          <svg className="w-2.5 h-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Yesterday</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Today</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 7 days</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 30 days</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 90 days</a></li>
          </ul>
        </div>
        <a
          href="#"
          className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 hover:bg-gray-100 px-3 py-2">
          Users Report
          <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AreaChart;

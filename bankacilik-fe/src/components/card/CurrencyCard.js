// src/components/CurrencyCard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates, setBaseCurrency, setCurrentPage, setItemsPerPage } from '../../redux/slice/currencySlice';

const CurrencyCard = () => {
  const dispatch = useDispatch();
  const { rates, status, error, baseCurrency, itemsPerPage, currentPage } = useSelector((state) => state.currency);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExchangeRates());
    }
  }, [dispatch, status]);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    dispatch(setBaseCurrency(newCurrency));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (e) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRates = Object.keys(rates).slice(startIndex, endIndex);

  const convertedRates = paginatedRates.reduce((acc, currency) => {
    acc[currency] = rates[currency] / rates[baseCurrency];
    return acc;
  }, {});

  if (status === 'loading') {
    return <div className="p-4 bg-white shadow-md rounded-md">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="p-4 bg-white shadow-md rounded-md">Error: {error}</div>;
  }

  const totalPages = Math.ceil(Object.keys(rates).length / itemsPerPage);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Exchange Rates</h2>
      <div className="mb-4">
        <label htmlFor="currency" className="block text-gray-700 mb-2">Select Currency:</label>
        <select
          id="currency"
          value={baseCurrency}
          onChange={handleCurrencyChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="itemsPerPage" className="block text-gray-700 mb-2">Items Per Page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          {[5, 10, 15].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <ul className="space-y-2">
        {paginatedRates.map((currency) => (
          <li key={currency} className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">{currency}</span>
            <span className="text-gray-500">{convertedRates[currency].toFixed(4)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CurrencyCard;

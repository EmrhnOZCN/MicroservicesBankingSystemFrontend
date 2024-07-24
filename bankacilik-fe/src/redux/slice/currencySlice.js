// src/features/currency/currencySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch exchange rates
export const fetchExchangeRates = createAsyncThunk(
  'currency/fetchExchangeRates',
  async () => {
    try {
      const response = await axios.get('https://v6.exchangerate-api.com/v6/150b065ff6a1e41596f0fe33/latest/USD');
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    rates: {},
    status: 'idle',
    error: null,
    baseCurrency: 'USD', // Default base currency
    itemsPerPage: 5,
    currentPage: 1,
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload.conversion_rates;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setBaseCurrency, setItemsPerPage, setCurrentPage } = currencySlice.actions;

export default currencySlice.reducer;

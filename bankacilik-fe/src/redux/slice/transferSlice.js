import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config.json';

// Para transferi işlemi
export const transferMoney = createAsyncThunk(
    'transfer/transferMoney',
    async ({ fromAccount, toAccount, amount }, { getState, rejectWithValue }) => {
      const state = getState();
      const token = state.user.token; // Token'ı doğru bir şekilde alın
  

      try {
        // TransferRequestDTO yapısına uygun olarak veriyi body olarak gönderiyoruz
        const response = await axios.post(
          `${config.API}/api/v1/transfers`,
          JSON.stringify({
            fromAccount,
            toAccount,
            amount
          }), // JSON.stringify ile JSON formatında gönderiyoruz
          {
            headers: {
              Authorization: `${token}`, // Token başlığa eklenir
              'Content-Type': 'application/json' // İçerik türünü belirtiyoruz
            }
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Bir hata oluştu');
      }
    }
  );
// Transfer geçmişini çekme işlemi
export const fetchTransfers = createAsyncThunk(
  'transfer/fetchTransfers',
  async (accountId, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.user.token; // Token'ı doğru bir şekilde alın
    console.log(accountId);
    try {
      const response = await axios.get(
        `${config.API}/api/v1/transfers`,
        {
          params: { accountId },
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'  // Token formatını düzeltin
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Bir hata oluştu');
    }
  }
);

const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    transfers: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(transferMoney.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.transfers.push(action.payload);
      })
      .addCase(transferMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchTransfers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.loading = false;
        state.transfers = action.payload;
      })
      .addCase(fetchTransfers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default transferSlice.reducer;

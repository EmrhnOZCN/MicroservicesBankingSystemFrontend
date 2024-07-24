  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';
  import config from '../../config.json';

  // Başlangıç durumu
  const initialState = {
    accounts: [],
    loading: false,
    error: null
  };

  // Hesapları getiren thunk oluşturma
  export const fetchAccounts = createAsyncThunk(
    'account/fetchAccounts',
    async (userId, { getState, rejectWithValue }) => {
      const state = getState();
      const token = state.user.token; // Token'ı doğru bir şekilde alın

      try {
        const response = await axios.get(`${config.API}/api/v1/account`, {
          params: { userId },
          headers: {
            'Authorization': `${token}`, // Token'ı "Bearer" ile ekleyin
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('API isteği hatası:', error);
        return rejectWithValue(error.response?.data?.message || 'Bir hata oluştu');
      }
    }
  );

  // Yeni hesap oluşturan thunk oluşturma
  export const createAccount = createAsyncThunk(
    'account/createAccount',
    async (accountData, { getState, rejectWithValue }) => {
      const state = getState();
      const token = state.user.token; // Token'ı doğru bir şekilde alın

      try {
        const response = await axios.post(`${config.API}/api/v1/account`, accountData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` 
          }
        });
        return response.data;
      } catch (error) {
        console.error('API isteği hatası:', error);
        return rejectWithValue(error.response?.data?.message || 'Bir hata oluştu');
      }
    }
  );
  // Hesap kapama thunk'ı
  export const closeAccount = createAsyncThunk(
    'account/closeAccount',
    async (accountId, { getState, rejectWithValue }) => {
      const state = getState();
      const token = state.user.token;

      try {
        const response = await axios.delete(`${config.API}/api/v1/account`, {
          params: { accountId }, // Parametreyi URL'ye ekleyin
          headers: {
            'Authorization': `${token}`, // Token'ı "Bearer" ile ekleyin
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('API isteği hatası:', error);
        return rejectWithValue(error.response?.data?.message || 'Bir hata oluştu');
      }
    }
  );



  // Account Slice oluşturma
  const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAccounts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAccounts.fulfilled, (state, action) => {
          state.loading = false;
          state.accounts = action.payload;
        })
        .addCase(fetchAccounts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message; // Hata mesajını düzenleyin
        })
        .addCase(createAccount.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createAccount.fulfilled, (state, action) => {
          state.loading = false;
          // Yeni oluşturulan hesabı mevcut hesaba ekleyin
          state.accounts.push(action.payload);
        })
        .addCase(createAccount.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message; // Hata mesajını düzenleyin
        })
        .addCase(closeAccount.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(closeAccount.fulfilled, (state, action) => {
          state.loading = false;
          // Kapatılan hesabı mevcut hesaptan kaldırın
          state.accounts = state.accounts.filter(account => account.id !== action.payload.id);
        })
        .addCase(closeAccount.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message; // Hata mesajını düzenleyin
        });
    }
  });

  export default accountSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config.json';

// Başlangıç durumu
const initialState = {
  msg: "",
  userId: "",
  token: "",
  loading: false,
  error: ""
};

// Kullanıcı kaydı için thunk oluşturma
export const signUpUser = createAsyncThunk('signupuser', async (userData) => {
  try {
    const response = await axios.post(
      `${config.API}/api/auth/register`, 
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Bir hata oluştu");
  }
});

// Kullanıcı girişi için thunk oluşturma
export const signInUser = createAsyncThunk('signinuser', async (credentials) => {
  try {
    const response = await axios.post(
      `${config.API}/api/auth/login`, 
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Bir hata oluştu");
  }
});

// Auth Slice oluşturma
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.msg = "";
      state.userId = "";
      state.token = "";
      state.loading = false;
      state.error = "";
      localStorage.removeItem('persist:root'); 
    },
  },
  extraReducers: (builder) => {
    builder
      // Kullanıcı kaydı
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.msg = "Kayıt başarılı";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Kullanıcı girişi
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.msg = "Giriş başarılı";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

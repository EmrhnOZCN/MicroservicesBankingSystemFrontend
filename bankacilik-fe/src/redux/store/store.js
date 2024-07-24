import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from '../slice/authSlice';
import currencyReducer from '../slice/currencySlice';
import accountReducer from '../slice/accountSlice';
import transferReducer from '../slice/transferSlice'; // transferSlice'ı import edin

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    user: persistedAuthReducer,
    currency: currencyReducer,
    account: accountReducer,
    transfer: transferReducer, // transferReducer'ı ekleyin
  },
});

export const persistor = persistStore(store);

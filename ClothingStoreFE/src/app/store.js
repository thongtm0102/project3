import {combineReducers, configureStore} from '@reduxjs/toolkit';

import themeReducer from 'src/features/theme/themeSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartSilce from "src/features/Cart/cartSilce";
import authenSlice from "src/features/authen/authenSlice";
import productSlice from "src/features/Product/productSlice";
import orderSlice from "src/features/Order/orderSlice";
import userSlice from "src/features/User/userSlice";
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  theme: themeReducer,
  cart : cartSilce.reducer,
  authen : authenSlice.reducer,
  product : productSlice.reducer,
  order : orderSlice.reducer,
  userManager: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./features/authSlice";
import CartReducer from "./features/cartSlice";
import { productApi } from "./services/productApi";
import { ratingApi } from "./services/ratingApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  AuthenticationReducer,
  CartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthenticationReducer", "CartReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedReducer,
    [productApi.reducerPath]: productApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      productApi.middleware,
      ratingApi.middleware,
    ]),
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

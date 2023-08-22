import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./Crypto/CryptoApi";
import { newsApi } from "./News/CryptoNewsApi";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, newsApi.middleware),
});

export default store;

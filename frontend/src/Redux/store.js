import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authSlice from "./features/auth/authSlice.js";
import favoriteSlice from "./features/favoriteSlice/favoriteSlice.js";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage.js";

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
  // Add the api reducer
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    favorites: favoriteSlice
  },

  preloadedState: {
    favorites: initialFavorites
  },

  // Add the api middleware
  middleware: (geDefaultMiddleware) =>
    geDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

setupListeners(store.dispatch);

export default store;

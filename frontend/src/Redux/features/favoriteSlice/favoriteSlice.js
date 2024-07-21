import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      // Check the product is not already favorites.
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },

    removeFromFavorites: (state, action) => {
      // Remove the product with the matching ID
      return state.filter((product) => product._id !== action.payload._id);
    },

    setFavorites: (state, action) => {
      // Set the favorites from localStorage
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavorites = (state) => state.favorite;
export default favoriteSlice.reducer;

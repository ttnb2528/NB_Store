import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../Redux/features/favoriteSlice/favoriteSlice.js";

import {
  addToFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoritesFromLocalStorage,
} from "../../Utils/localStorage.js";
import { useEffect } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      // Remove the product from the localStorage as well
      removeFavoritesFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      // Add the product from the localStorage as well
      addToFavoriteToLocalStorage(product);
    }
  };
  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;

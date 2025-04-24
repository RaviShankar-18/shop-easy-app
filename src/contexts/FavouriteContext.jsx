import { createContext, useState } from "react";

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (product) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.some(
        (favourite) => favourite._id === product._id
      );

      if (isFavourite) {
        return prevFavourites.filter(
          (favourite) => favourite._id !== product._id
        );
      } else {
        return [...prevFavourites, product];
      }
    });
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

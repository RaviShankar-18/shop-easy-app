import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      return [...prevCartItems, item];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      [...prevCartItems].filter((item) => item._id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

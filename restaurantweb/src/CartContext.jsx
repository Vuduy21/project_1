import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cartItems from localStorage", error);
      return [];
    }
  });

  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    
    if (typeof item.FoodID === 'undefined' || item.FoodID === null) {
      console.error("Attempted to add item to cart without FoodID:", item);
      
      return; 
    }

    setCartItems((prev) => {
      
      const existing = prev.find((x) => x.FoodID === item.FoodID);
      if (existing) {
        return prev.map((x) =>
          x.FoodID === item.FoodID ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        
        return [...prev, { ...item, quantity: 1 }]; 
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => {
      return prev
        .map((x) =>
          x.FoodID === item.FoodID ? { ...x, quantity: x.quantity - 1 } : x
        )
        .filter((x) => x.quantity > 0);
    });
  };

  const deleteFromCart = (item) => {
    setCartItems((prev) => prev.filter((x) => x.FoodID !== item.FoodID));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, deleteFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}


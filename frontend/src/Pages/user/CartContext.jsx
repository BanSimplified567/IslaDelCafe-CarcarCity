import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState(() => {
      // Load cart from localStorage if available
      const savedCart = localStorage.getItem('coffeeCart');
      return savedCart ? JSON.parse(savedCart) : [];
   });

   // Save cart to localStorage whenever it changes
   useEffect(() => {
      localStorage.setItem('coffeeCart', JSON.stringify(cartItems));
   }, [cartItems]);

   // Add item to cart
   const addToCart = (item) => {
      setCartItems((prevItems) => {
         // Check if item already exists in cart
         const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);

         if (existingItemIndex !== -1) {
            // Item exists, update quantity
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += 1;
            return updatedItems;
         } else {
            // Item doesn't exist, add new item
            return [...prevItems, item];
         }
      });
   };

   // Update item quantity
   const updateQuantity = (id, newQuantity) => {
      if (newQuantity < 1) return;

      setCartItems((prevItems) =>
         prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
   };

   // Remove item from cart
   const removeItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
   };

   // Clear entire cart
   const clearCart = () => {
      setCartItems([]);
   };

   return (
      <CartContext.Provider
         value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

export default CartProvider;

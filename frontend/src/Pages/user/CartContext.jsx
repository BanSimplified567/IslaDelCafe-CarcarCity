import React, { createContext, useEffect, useState } from 'react';

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
   // Initialize cart from localStorage if available
   const [cartItems, setCartItems] = useState(() => {
      const savedCart = localStorage.getItem('coffeeShopCart');
      return savedCart ? JSON.parse(savedCart) : [];
   });

   // Save cart to localStorage whenever it changes
   useEffect(() => {
      localStorage.setItem('coffeeShopCart', JSON.stringify(cartItems));
   }, [cartItems]);

   // Function to add items to cart, combining items with same values
   const addToCart = (product) => {
      // Ensure the product has all required fields in a standard format
      const standardizedProduct = {
         id: product.id,
         name: product.name,
         price: parseFloat(product.price),
         quantity: parseInt(product.quantity) || 1,
         image: product.image.startsWith('/assets')
            ? product.image
            : `/assets/img/${product.image}`,
      };

      setCartItems((prevItems) => {
         // First, check if the exact same product already exists by ID
         const existingItemIndex = prevItems.findIndex(
            (item) => item.id === standardizedProduct.id
         );

         if (existingItemIndex >= 0) {
            // Update existing item by adding the new quantity
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
               ...updatedItems[existingItemIndex],
               quantity: updatedItems[existingItemIndex].quantity + standardizedProduct.quantity,
            };
            return updatedItems;
         }

         // If not found by ID, check if there's an item with the same value
         // (same name and price - assuming these determine if products are equivalent)
         const sameValueItemIndex = prevItems.findIndex(
            (item) =>
               item.name === standardizedProduct.name && item.price === standardizedProduct.price
         );

         if (sameValueItemIndex >= 0) {
            // Combine with the existing item that has the same value
            const updatedItems = [...prevItems];
            updatedItems[sameValueItemIndex] = {
               ...updatedItems[sameValueItemIndex],
               quantity: updatedItems[sameValueItemIndex].quantity + standardizedProduct.quantity,
            };
            return updatedItems;
         }

         // If it's a completely new item (by ID and value), add it
         return [...prevItems, standardizedProduct];
      });
   };

   // Update quantity of an item
   const updateQuantity = (id, quantity) => {
      if (quantity <= 0) {
         removeItem(id);
         return;
      }

      setCartItems((prevItems) =>
         prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
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

   // Calculate cart totals
   const getCartTotal = () => {
      return {
         items: cartItems.reduce((total, item) => total + item.quantity, 0),
         subtotal: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
   };

   return (
      <CartContext.Provider
         value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            getCartTotal,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

export default CartProvider;

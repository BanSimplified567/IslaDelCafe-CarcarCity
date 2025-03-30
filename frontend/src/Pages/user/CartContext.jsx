// CartContext.js
import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState(() => {
      const savedCart = localStorage.getItem('coffeeShopCart');
      return savedCart ? JSON.parse(savedCart) : [];
   });

   const MAX_QUANTITY_PER_ITEM = 5;

   useEffect(() => {
      localStorage.setItem('coffeeShopCart', JSON.stringify(cartItems));
   }, [cartItems]);

   const showMaxQuantityAlert = () => {
      Swal.fire({
         icon: 'info',
         title: 'Quantity Limit Reached',
         text: `Maximum quantity per item is ${MAX_QUANTITY_PER_ITEM}. Quantity has been adjusted.`,
         confirmButtonColor: '#6f4e37',
         confirmButtonText: 'OK',
      });
   };

   const addToCart = (product) => {
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
         const existingItemIndex = prevItems.findIndex(
            (item) => item.id === standardizedProduct.id
         );

         if (existingItemIndex >= 0) {
            const currentQuantity = prevItems[existingItemIndex].quantity;
            const requestedQuantity = standardizedProduct.quantity;
            const newQuantity = Math.min(
               currentQuantity + requestedQuantity,
               MAX_QUANTITY_PER_ITEM
            );

            if (currentQuantity + requestedQuantity > MAX_QUANTITY_PER_ITEM) {
               showMaxQuantityAlert();
            }

            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
               ...updatedItems[existingItemIndex],
               quantity: newQuantity,
            };
            return updatedItems;
         }

         const sameValueItemIndex = prevItems.findIndex(
            (item) =>
               item.name === standardizedProduct.name && item.price === standardizedProduct.price
         );

         if (sameValueItemIndex >= 0) {
            const currentQuantity = prevItems[sameValueItemIndex].quantity;
            const requestedQuantity = standardizedProduct.quantity;
            const newQuantity = Math.min(
               currentQuantity + requestedQuantity,
               MAX_QUANTITY_PER_ITEM
            );

            if (currentQuantity + requestedQuantity > MAX_QUANTITY_PER_ITEM) {
               showMaxQuantityAlert();
            }

            const updatedItems = [...prevItems];
            updatedItems[sameValueItemIndex] = {
               ...updatedItems[sameValueItemIndex],
               quantity: newQuantity,
            };
            return updatedItems;
         }

         if (standardizedProduct.quantity > MAX_QUANTITY_PER_ITEM) {
            standardizedProduct.quantity = MAX_QUANTITY_PER_ITEM;
            showMaxQuantityAlert();
         }

         return [...prevItems, standardizedProduct];
      });
   };

   const updateQuantity = (id, quantity) => {
      if (quantity <= 0) {
         removeItem(id);
         return;
      }

      if (quantity > MAX_QUANTITY_PER_ITEM) {
         quantity = MAX_QUANTITY_PER_ITEM;
         showMaxQuantityAlert();
      }

      setCartItems((prevItems) =>
         prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
   };

   const removeItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
   };

   const clearCart = () => {
      setCartItems([]);
   };

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
            maxQuantityPerItem: MAX_QUANTITY_PER_ITEM,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

export default CartProvider;

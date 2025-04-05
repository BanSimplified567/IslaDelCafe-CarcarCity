import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState(() => {
      const savedCart = localStorage.getItem('coffeeShopCart');
      return savedCart ? JSON.parse(savedCart) : [];
   });

   useEffect(() => {
      localStorage.setItem('coffeeShopCart', JSON.stringify(cartItems));
   }, [cartItems]);

   const getCartTotals = () => {
      const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const shipping = subtotal > 100 ? 0 : 10.99;
      const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const total = subtotal + shipping;

      return { subtotal, shipping, itemCount, total };
   };

   const addToCart = (product) => {
      const standardizedProduct = {
         id: parseInt(product.id),
         name: product.name,
         price: parseFloat(product.price),
         quantity: parseInt(product.quantity) || 1,
         image: product.image?.startsWith('/assets')
            ? product.image
            : `/assets/img/${product.image || 'default-product.jpg'}`,
         size: product.size || '',
         stock: parseInt(product.stock) || 0,
         type: product.type || '',
      };

      const availableStock = standardizedProduct.stock;

      setCartItems((prevItems) => {
         const existingItemIndex = prevItems.findIndex(
            (item) => item.id === standardizedProduct.id && item.size === standardizedProduct.size
         );

         if (existingItemIndex >= 0) {
            const currentQuantity = prevItems[existingItemIndex].quantity;
            const requestedQuantity = standardizedProduct.quantity;

            if (currentQuantity + requestedQuantity > availableStock) {
               Swal.fire({
                  icon: 'warning',
                  title: 'Stock Limit Reached',
                  text: `Only ${availableStock} items available for this size.`,
                  confirmButtonColor: '#6b705c',
               });
               return prevItems;
            }

            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
               ...updatedItems[existingItemIndex],
               quantity: currentQuantity + requestedQuantity,
            };
            return updatedItems;
         }

         if (standardizedProduct.quantity > availableStock) {
            standardizedProduct.quantity = availableStock;
         }

         return [...prevItems, standardizedProduct];
      });
   };

   const updateQuantity = (id, quantity) => {
      if (quantity <= 0) {
         removeItem(id);
         return;
      }

      setCartItems((prevItems) => {
         const item = prevItems.find((item) => item.id === id);
         if (!item) return prevItems;

         if (quantity > item.stock) {
            Swal.fire({
               icon: 'warning',
               title: 'Stock Limit Reached',
               text: `Only ${item.stock} items available in stock.`,
               confirmButtonColor: '#6b705c',
            });
            quantity = item.stock;
         }

         return prevItems.map((item) => (item.id === id ? { ...item, quantity } : item));
      });
   };

   const removeItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
   };

   const clearCart = () => {
      Swal.fire({
         title: 'Clear Cart?',
         text: 'Are you sure you want to remove all items from your cart?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Yes, clear cart',
         cancelButtonText: 'Cancel',
      }).then((result) => {
         if (result.isConfirmed) {
            setCartItems([]);
            Swal.fire({
               icon: 'success',
               title: 'Cart Cleared',
               text: 'Your cart has been cleared successfully.',
               timer: 1500,
               showConfirmButton: false,
               toast: true,
               position: 'top-end',
            });
         }
      });
   };

   return (
      <CartContext.Provider
         value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            getCartTotals,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

export default CartProvider;

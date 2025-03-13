import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
   // Sample cart data
   const [cartItems, setCartItems] = useState([
      { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1, image: 'headphones.jpg' },
      { id: 2, name: 'Coffee Maker', price: 79.99, quantity: 1, image: 'coffee-maker.jpg' },
      { id: 3, name: 'Running Shoes', price: 89.99, quantity: 2, image: 'shoes.jpg' },
   ]);

   const [promoCode, setPromoCode] = useState('');
   const [promoApplied, setPromoApplied] = useState(false);

   // Calculate totals
   const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
   const shipping = subtotal > 100 ? 0 : 10.99;
   const discount = promoApplied ? subtotal * 0.1 : 0;
   const total = subtotal + shipping - discount;

   const updateQuantity = (id, newQuantity) => {
      if (newQuantity < 1) return;

  setCartItems(
         cartItems.map((item) =>(item.id === id ? { ...item, quantity: newQuantity } : item))
      );
   };

   const removeItem = (id) => {
      setCartItems(cartItems.filter((item) => item.id !== id));
   };

   const applyPromoCode = () => {
      if (promoCode.toLowerCase() === 'discount10') {
         setPromoApplied(true);
      } else {
         alert('Invalid promo code');
      }
   };

   if (cartItems.length === 0) {
      return (
         <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
            <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
               <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
               </svg>
               <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
               <p className="text-gray-600 mb-6">
                  Looks like you haven't added any products to your cart yet.
               </p>
               <Link
                  to="/shop"
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
               >
                  Continue Shopping
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
               <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                           <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Product
                           </th>
                           <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Price
                           </th>
                           <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Quantity
                           </th>
                           <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Total
                           </th>
                           <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                           >
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item) => (
                           <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center">
                                    <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded"></div>
                                    <div className="ml-4">
                                       <div className="text-sm font-medium text-gray-900">
                                          {item.name}
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="text-sm text-gray-900">
                                    ${item.price.toFixed(2)}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                       className="bg-gray-200 px-2 py-1 rounded-l"
                                    >
                                       -
                                    </button>
                                    <input
                                       type="number"
                                       min="1"
                                       value={item.quantity}
                                       onChange={(e) =>
                                          updateQuantity(item.id, parseInt(e.target.value))
                                       }
                                       className="w-12 text-center py-1 border-t border-b"
                                    />
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                       className="bg-gray-200 px-2 py-1 rounded-r"
                                    >
                                       +
                                    </button>
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="text-sm font-medium text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                 <button
                                   onClick={() => removeItem(item.id)}
                                    className="text-red-600 hover:text-red-900"
                                 >
                                    Remove
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

      <div className="flex justify-between mt-8">
                  <Link to="/shop" className="text-blue-600 hover:underline flex items-center">
                     ← Continue Shopping
                  </Link>
                  <button onClick={() => setCartItems([])} className="text-red-600 hover:underline">
                     Clear Cart
                  </button>
               </div>
            </div>

       {/* Order Summary */}
            <div className="lg:w-1/3">
               <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
                     <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                           {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        </span>
                     </div>
                     {promoApplied && (
                        <div className="flex justify-between text-green-600">
                           <span>Discount (10%)</span>
                           <span>-${discount.toFixed(2)}</span>
                        </div>
                     )}
                     <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-bold text-lg">
                           <span>Total</span>
                           <span>${total.toFixed(2)}</span>
                        </div>
                        <span className="text-gray-500 text-sm">Including taxes</span>
                     </div>
                  </div>

        {/* Promo Code */}
                  <div className="mb-6">
                     <label
                        htmlFor="promo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Promo Code
                     </label>
                     <div className="flex">
                        <input
                           type="text"
                           id="promo"
                           value={promoCode}
                           onChange={(e) => setPromoCode(e.target.value)}
                           className="flex-grow p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                           placeholder="Enter code"
                           disabled={promoApplied}
                        />
                        <button
                           onClick={applyPromoCode}
                           disabled={promoApplied}
                           className={`px-4 py-2 font-medium text-white rounded-r ${
                              promoApplied? 'bg-green-600': 'bg-gray-800 hover:bg-gray-700'
                           }`}
                        >
                           {promoApplied ? 'Applied' : 'Apply'}
                        </button>
                     </div>
                     {promoApplied && (
                        <p className="text-green-600 text-sm mt-1">
                           Promo code successfully applied!
                        </p>
                     )}
                  </div>

      <Link
                    to="/checkout"
                     className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                     Proceed to Checkout
                  </Link>

            <div className="mt-6">
                     <h3 className="font-medium text-gray-800 mb-2">We Accept</h3>
                     <div className="flex space-x-2">
                        {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((payment) => (
                           <div key={payment} className="bg-white px-3 py-2 border rounded text-sm">
                              {payment}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Cart;

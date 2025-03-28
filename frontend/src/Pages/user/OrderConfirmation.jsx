import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function OrderConfirmation() {
   const navigate = useNavigate();
   const [order, setOrder] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const savedOrder = sessionStorage.getItem('lastOrder');
      if (!savedOrder) {
         navigate('/menu');
         return;
      }

      try {
         const parsedOrder = JSON.parse(savedOrder);
         submitOrderToDatabase(parsedOrder);
      } catch (parseError) {
         console.error('Error parsing saved order:', parseError);
         navigate('/menu');
      }
   }, [navigate]);

   const submitOrderToDatabase = async (orderData) => {
      try {
         // Validate order data before submission
         if (!validateOrderData(orderData)) {
            throw new Error('Invalid order data');
         }

         // Save order to database
         const saveResponse = await axios.post('/api/saveorder.php', orderData);

         if (saveResponse.data.success) {
            const orderId = saveResponse.data.orderId;

            // Fetch detailed order information
            const fetchResponse = await axios.get(`/api/fetchorder.php?order_id=${orderId}`);

            if (fetchResponse.data.success) {
               const confirmedOrder = fetchResponse.data.orders[0];
               setOrder(confirmedOrder);

               // Show success notification
               Swal.fire({
                  icon: 'success',
                  title: 'Order Confirmed!',
                  html: `
                     <div>
                        <p>Order #${confirmedOrder.order_number} has been placed successfully.</p>
                        <small>Your coffee will be delivered within 30-45 minutes.</small>
                     </div>
                  `,
                  confirmButtonColor: '#6f4e37',
                  confirmButtonText: 'Great!',
               });

               // Clear temporary storage
               sessionStorage.removeItem('lastOrder');
               localStorage.removeItem('coffeeShopCart');
            }
         }
      } catch (error) {
         console.error('Order submission error:', error);

         // Handle specific error scenarios
         const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'There was an error submitting your order.';

         Swal.fire({
            icon: 'error',
            title: 'Order Submission Failed',
            text: errorMessage,
            confirmButtonColor: '#6f4e37',
         });

         navigate('/menu');
      } finally {
         setIsLoading(false);
      }
   };

   // Validate order data before submission
   const validateOrderData = (orderData) => {
      const requiredFields = [
         'customer.firstName',
         'customer.lastName',
         'customer.email',
         'customer.address',
         'items',
         'totals.total',
      ];

      for (let field of requiredFields) {
         const value = field.split('.').reduce((obj, key) => obj && obj[key], orderData);
         if (!value) {
            console.error(`Missing required field: ${field}`);
            return false;
         }
      }

      return true;
   };

   // Loading state
   if (isLoading) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-coffee-brown mb-4"></div>
               <p className="text-coffee-brown">Processing your order...</p>
            </div>
         </div>
      );
   }

   // Error state
   if (error) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-red-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
               <h2 className="text-2xl text-red-600 mb-4">Order Processing Error</h2>
               <p className="text-gray-700 mb-6">{error}</p>
               <button
                  onClick={() => navigate('/menu')}
                  className="bg-coffee-brown text-white px-6 py-2 rounded hover:bg-opacity-90"
               >
                  Return to Menu
               </button>
            </div>
         </div>
      );
   }

   // No order found
   if (!order) {
      return (
         <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center">
               <p className="text-gray-700 mb-4">No order information available.</p>
               <button
                  onClick={() => navigate('/menu')}
                  className="bg-coffee-brown text-white px-6 py-2 rounded hover:bg-opacity-90"
               >
                  Return to Menu
               </button>
            </div>
         </div>
      );
   }

   // Format order date
   const formatOrderDate = (dateString) => {
      return new Date(dateString).toLocaleString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
         hour12: true,
      });
   };

   return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-coffee-brown text-white p-6">
               <h1 className="text-3xl font-bold text-center flex items-center justify-center">
                  Order Confirmed
                  <span className="ml-4 text-2xl">✓</span>
               </h1>
            </div>

            <div className="p-6">
               {/* Order Details Section */}
               <div className="grid md:grid-cols-2 gap-6">
                  <div>
                     <h2 className="text-xl font-semibold mb-4">Order Information</h2>
                     <div className="space-y-2">
                        <p>
                           <strong>Order Number:</strong> {order.order_number}
                        </p>
                        <p>
                           <strong>Date:</strong> {formatOrderDate(order.order_date)}
                        </p>
                        <p>
                           <strong>Payment Method:</strong> {order.payment_method}
                        </p>
                     </div>
                  </div>

                  <div>
                     <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
                     <div className="space-y-2">
                        <p>
                           <strong>Name:</strong> {order.first_name} {order.last_name}
                        </p>
                        <p>
                           <strong>Email:</strong> {order.email}
                        </p>
                        <p>
                           <strong>Address:</strong> {order.address}, {order.city} {order.zip_code}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Order Summary */}
               <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="border rounded">
                     <div className="divide-y">
                        {order.items.map((item, index) => (
                           <div key={index} className="flex justify-between p-4">
                              <div>
                                 <span className="font-medium">
                                    {item.quantity}x {item.product_name}
                                 </span>
                              </div>
                              <span className="font-bold">
                                 ₱{(item.price * item.quantity).toFixed(2)}
                              </span>
                           </div>
                        ))}
                     </div>
                     <div className="bg-gray-100 p-4">
                        <div className="flex justify-between mb-2">
                           <span>Subtotal</span>
                           <span>₱{order.total_amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Shipping</span>
                           <span>Free</span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t font-bold">
                           <span>Total</span>
                           <span>₱{order.total_amount.toFixed(2)}</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Confirmation Message */}
               <div className="mt-8 text-center bg-green-50 p-4 rounded">
                  <p className="text-green-800">
                     Thank you for your order! A confirmation email has been sent to {order.email}.
                  </p>
                  <p className="text-green-600 mt-2">
                     Your order will be delivered within 30–45 minutes.
                  </p>
               </div>

               {/* Action Buttons */}
               <div className="mt-8 flex justify-center space-x-4">
                  <button
                     onClick={() => navigate('/menu')}
                     className="bg-coffee-brown text-white px-6 py-2 rounded hover:bg-opacity-90"
                  >
                     Continue Shopping
                  </button>
                  <button
                     onClick={() => navigate('/orders')}
                     className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
                  >
                     View Orders
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default OrderConfirmation;

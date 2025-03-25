import '@style/OrderConfirmation.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function OrderConfirmation() {
   const navigate = useNavigate();
   const [order, setOrder] = useState(null);

   useEffect(() => {
      const savedOrder = sessionStorage.getItem('lastOrder');
      if (!savedOrder) {
         navigate('/menu');
      } else {
         const parsedOrder = JSON.parse(savedOrder);
         setOrder(parsedOrder);

         // Show SweetAlert2 on successful order confirmation
         Swal.fire({
            icon: 'success',
            title: 'Order Confirmed!',
            text: `Thank you, ${parsedOrder.customer.firstName}! Your order has been placed successfully.`,
            confirmButtonColor: '#6f4e37',
            confirmButtonText: 'Great!',
         });
      }
   }, [navigate]);

   if (!order) {
      return <div className="order-loading">Loading order information...</div>;
      
   }

   const orderDate = new Date(order.orderDate);
   const formattedDate = orderDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   });

   return (
      <div className="order-confirmation-container">
         <div className="order-confirmation-card">
            <div className="order-confirmation-header">
               <h1 className="order-confirmation-title">Order Confirmed!</h1>
               <div className="order-confirmation-checkmark">✓</div>
            </div>

            <div className="order-confirmation-details">
               {/* Order Information */}
               <div className="order-detail-group">
                  <h2 className="order-detail-title">Order Information</h2>
                  <div className="order-detail-row">
                     <span className="order-detail-label">Order Number:</span>
                     <span className="order-detail-value">{order.orderNumber}</span>
                  </div>
                  <div className="order-detail-row">
                     <span className="order-detail-label">Date:</span>
                     <span className="order-detail-value">{formattedDate}</span>
                  </div>
                  <div className="order-detail-row">
                     <span className="order-detail-label">Payment Method:</span>
                     <span className="order-detail-value">
                        {order.customer.paymentMethod === 'credit-card'
                           ? 'Credit Card'
                           : 'Cash on Delivery'}
                     </span>
                  </div>
               </div>

               {/* Customer Information */}
               <div className="order-detail-group">
                  <h2 className="order-detail-title">Customer Information</h2>
                  <div className="order-detail-row">
                     <span className="order-detail-label">Name:</span>
                     <span className="order-detail-value">
                        {order.customer.firstName} {order.customer.lastName}
                     </span>
                  </div>
                  <div className="order-detail-row">
                     <span className="order-detail-label">Email:</span>
                     <span className="order-detail-value">{order.customer.email}</span>
                  </div>
                  <div className="order-detail-row">
                     <span className="order-detail-label">Address:</span>
                     <span className="order-detail-value">
                        {order.customer.address}, {order.customer.city} {order.customer.zipCode}
                     </span>
                  </div>
               </div>

               {/* Order Summary */}
               <div className="order-summary">
                  <h2 className="order-summary-title">Order Summary</h2>
                  <div className="order-items-list">
                     {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                           <div className="order-item-info">
                              <span className="order-item-quantity">{item.quantity}x</span>
                              <span className="order-item-name">{item.name}</span>
                           </div>
                           <span className="order-item-price">
                              ₱{(item.price * item.quantity).toFixed(2)}
                           </span>
                        </div>
                     ))}
                  </div>
                  <div className="order-totals">
                     <div className="order-total-row">
                        <span>Subtotal</span>
                        <span>₱{order.totals.subtotal.toFixed(2)}</span>
                     </div>
                     <div className="order-total-row">
                        <span>Shipping</span>
                        <span>
                           {order.totals.shipping === 0
                              ? 'Free'
                              : `₱${order.totals.shipping.toFixed(2)}`}
                        </span>
                     </div>
                     <div className="order-total-row order-grand-total">
                        <span>Total</span>
                        <span>₱{order.totals.total.toFixed(2)}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="order-confirmation-message">
               <p>
                  Thank you for your order! A confirmation email has been sent to
                  {order.customer.email}.
               </p>
               <p>Your coffee will be delivered within 30–45 minutes.</p>
            </div>

            <div className="order-confirmation-actions">
               <button onClick={() => navigate('/menu')} className="order-confirmation-button">
                  Continue Shopping
               </button>
            </div>
         </div>
      </div>
   );
}

export default OrderConfirmation;

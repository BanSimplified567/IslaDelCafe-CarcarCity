import '@style/Checkout.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from './CartContext';

function Checkout() {
   const navigate = useNavigate();
   const { cartItems, clearCart } = useContext(CartContext);
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      paymentMethod: 'cash',
   });

   // Calculate totals (similar to Cart component)
   const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
   const shipping = subtotal > 100 ? 0 : 10.99;
   const total = subtotal + shipping;

   // Handle form changes
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   // Handle order submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      // Basic validation
      if (!formData.firstName || !formData.email || !formData.address) {
         Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please fill in all required fields.',
         });
         return;
      }

      try {
         const orderData = {
            customer: formData,
            items: cartItems,
            totals: {
               subtotal,
               shipping,
               total,
            },
            paymentMethod: 'Cash on Delivery', // Fixed payment method
            status: 'Pending', // Initial status
         };

         const response = await axios.post('/api/saveorder.php', orderData);

         if (response.data.success) {
            sessionStorage.setItem('lastOrder', JSON.stringify(response.data.order));
            clearCart();

            Swal.fire({
               icon: 'success',
               title: 'Order Submitted!',
               text: 'Your order has been submitted and is pending admin approval.',
            }).then(() => {
               navigate('/order-confirmation');
            });
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Order Failed',
            text: error.response?.data?.message || 'Failed to submit order',
         });
      }
   };

   // Check if cart is empty
   if (cartItems.length === 0) {
      return (
         <div className="checkout-empty">
            <h2>Your cart is empty</h2>
            <p>Please add some items to your cart before checking out.</p>
            <button onClick={() => navigate('/menu')} className="checkout-return-button">
               Return to Menu
            </button>
         </div>
      );
   }

   return (
      <div className="checkout-container">
         <h1 className="checkout-title">Checkout</h1>

         <div className="checkout-layout">
            {/* Checkout Form */}
            <div className="checkout-form-section">
               <form onSubmit={handleSubmit} className="checkout-form">
                  <div className="checkout-section">
                     <h2 className="checkout-section-title">Contact Information</h2>
                     <div className="checkout-form-row">
                        <div className="checkout-form-group">
                           <label htmlFor="firstName">First Name *</label>
                           <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                           />
                        </div>
                        <div className="checkout-form-group">
                           <label htmlFor="lastName">Last Name</label>
                           <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                           />
                        </div>
                     </div>

                     <div className="checkout-form-row">
                        <div className="checkout-form-group">
                           <label htmlFor="email">Email *</label>
                           <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                           />
                        </div>
                        <div className="checkout-form-group">
                           <label htmlFor="phone">Phone Number</label>
                           <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="checkout-section">
                     <h2 className="checkout-section-title">Delivery Address</h2>
                     <div className="checkout-form-group">
                        <label htmlFor="address">Address *</label>
                        <input
                           type="text"
                           id="address"
                           name="address"
                           value={formData.address}
                           onChange={handleChange}
                           required
                        />
                     </div>

                     <div className="checkout-form-row">
                        <div className="checkout-form-group">
                           <label htmlFor="city">City</label>
                           <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                           />
                        </div>
                        <div className="checkout-form-group">
                           <label htmlFor="zipCode">ZIP Code</label>
                           <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="checkout-section">
                     <h2 className="checkout-section-title">Payment Method</h2>
                     <div className="checkout-payment-options">
                        <div className="checkout-payment-option">
                           <input
                              type="radio"
                              id="cash"
                              name="paymentMethod"
                              value="cash"
                              checked={formData.paymentMethod === 'cash'}
                              onChange={handleChange}
                           />
                           <label htmlFor="cash">Cash on Delivery</label>
                        </div>
                     </div>
                  </div>

                  <div className="checkout-actions">
                     <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="checkout-back-button"
                     >
                        Back to Cart
                     </button>
                     <button type="submit" className="checkout-place-order-button">
                        Place Order
                     </button>
                  </div>
               </form>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary-section">
               <div className="checkout-summary-card">
                  <h2 className="checkout-summary-title">Order Summary</h2>
                  <div className="checkout-summary-items">
                     {cartItems.map((item) => (
                        <div key={item.id} className="checkout-summary-item">
                           <div className="checkout-item-info">
                              <span className="checkout-item-quantity">{item.quantity}x</span>
                              <span className="checkout-item-name">{item.name}</span>
                           </div>
                           <span className="checkout-item-price">
                              ₱{(item.price * item.quantity).toFixed(2)}
                           </span>
                        </div>
                     ))}
                  </div>
                  <div className="checkout-summary-totals">
                     <div className="checkout-total-line">
                        <span>Subtotal</span>
                        <span>₱{subtotal.toFixed(2)}</span>
                     </div>
                     <div className="checkout-total-line">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`}</span>
                     </div>
                     <div className="checkout-total-line checkout-grand-total">
                        <span>Total</span>
                        <span>₱{total.toFixed(2)}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Checkout;

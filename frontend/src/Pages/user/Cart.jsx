import '@style/Cart.css';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from './CartContext';

function Cart() {
   const { cartItems, updateQuantity, removeItem, clearCart } = useContext(CartContext);
   const [promoCode, setPromoCode] = useState('');
   const [promoApplied, setPromoApplied] = useState(false);
   const navigate = useNavigate();

   const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
   const shipping = subtotal > 100 ? 0 : 10.99;
   const discount = promoApplied ? subtotal * 0.1 : 0;
   const total = subtotal + shipping - discount;

   const applyPromoCode = () => {
      if (promoCode.toLowerCase() === 'discount10') {
         setPromoApplied(true);
      } else {
         Swal.fire({
            icon: 'error',
            title: 'Invalid Promo Code',
            text: 'Please enter a valid promo code!',
         });
      }
   };

   const handleCheckout = () => {
      Swal.fire({
         title: 'Proceed to Checkout?',
         text: `Your total is ₱${total.toFixed(2)}. Do you want to continue?`,
         icon: 'question',
         showCancelButton: true,
         confirmButtonText: 'Yes, Checkout',
         cancelButtonText: 'Cancel',
      }).then((result) => {
         if (result.isConfirmed) {
            navigate('/checkout');
         }
      });
   };

   return (
      <div className="cart-container">
         <h1 className="cart-title">Your Coffee Order</h1>

         <div className="cart-flex">
            <div className="cart-items-section">
               <table className="cart-table">
                  <thead>
                     <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {cartItems.map((item) => (
                        <tr key={item.id}>
                           <td>
                              <div className="cart-item">
                                 {item.image && (
                                    <img
                                       src={item.image}
                                       alt={item.name}
                                       className="cart-item-image"
                                    />
                                 )}
                                 <span>{item.name}</span>
                              </div>
                           </td>
                           <td>₱{item.price}</td>
                           <td>
                              <div className="cart-quantity">
                                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    -
                                 </button>
                                 <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                       updateQuantity(item.id, parseInt(e.target.value))
                                    }
                                 />
                                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    +
                                 </button>
                              </div>
                           </td>
                           <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                           <td>
                              <button onClick={() => removeItem(item.id)} className="cart-remove">
                                 Remove
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="cart-actions">
                  <Link to="/menu" className="cart-continue">
                     ← Continue Shopping
                  </Link>
                  <button onClick={clearCart} className="cart-clear">
                     Clear Cart
                  </button>
               </div>
            </div>

            <div className="cart-summary">
               <h2>Order Summary</h2>
               <div className="cart-summary-details">
                  <p>
                     Subtotal: <span>₱{subtotal.toFixed(2)}</span>
                  </p>
                  <p>
                     Delivery Fee:{' '}
                     <span>{shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`}</span>
                  </p>
                  {promoApplied && (
                     <p className="cart-discount">
                        Discount (10%): <span>-₱{discount.toFixed(2)}</span>
                     </p>
                  )}
                  <p className="cart-total">
                     Total: <span>₱{total.toFixed(2)}</span>
                  </p>
               </div>

               <div className="cart-promo">
                  <input
                     type="text"
                     value={promoCode}
                     onChange={(e) => setPromoCode(e.target.value)}
                     placeholder="Enter promo code"
                     disabled={promoApplied}
                  />
                  <button onClick={applyPromoCode} disabled={promoApplied}>
                     {promoApplied ? 'Applied' : 'Apply'}
                  </button>
               </div>

               <button onClick={handleCheckout} className="cart-checkout">
                  Proceed to Checkout
               </button>
            </div>
         </div>
      </div>
   );
}

export default Cart;


import '@style/Cart.css';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from './CartContext';

function Cart() {
   const { cartItems, updateQuantity, removeItem, clearCart, getCartTotals } =
      useContext(CartContext);
   const [promoCode, setPromoCode] = useState('');
   const [promoApplied, setPromoApplied] = useState(false);
   const navigate = useNavigate();

   const { subtotal, shipping, itemCount, total } = getCartTotals();
   const discount = promoApplied ? subtotal * 0.1 : 0;
   const finalTotal = total - discount;

   // Calculate size counts for each item
   const getSizeCounts = (itemId) => {
      return cartItems
         .filter((item) => item.id === itemId)
         .reduce((acc, item) => {
            acc[item.size] = (acc[item.size] || 0) + item.quantity;
            return acc;
         }, {});
   };

   // Group items by product ID
   const groupedItems = cartItems.reduce((acc, item) => {
      if (!acc[item.id]) {
         acc[item.id] = {
            ...item,
            sizeCounts: getSizeCounts(item.id),
            totalQuantity: cartItems
               .filter((i) => i.id === item.id)
               .reduce((sum, i) => sum + i.quantity, 0),
         };
      }
      return acc;
   }, {});

   const applyPromoCode = () => {
      if (promoCode.toLowerCase() === 'discount10') {
         setPromoApplied(true);
         Swal.fire({
            icon: 'success',
            title: 'Promo Code Applied',
            text: '10% discount has been applied to your order!',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
         });
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
         text: `Your total is ₱${finalTotal.toFixed(2)}. Do you want to continue?`,
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

   const handleQuantityChange = (id, size, newQuantity) => {
      const item = cartItems.find((item) => item.id === id && item.size === size);
      if (!item) return;

      // Calculate total quantity of this product (all sizes) in cart
      const totalInCart = cartItems
         .filter((i) => i.id === id)
         .reduce((sum, i) => sum + i.quantity, 0);

      // Calculate new total after updating
      const newTotal = totalInCart - item.quantity + newQuantity;

      // Check if the new quantity would exceed stock
      if (newTotal > item.stock) {
         const maxAllowed = item.stock - (totalInCart - item.quantity);
         Swal.fire({
            icon: 'warning',
            title: 'Stock Limit Reached',
            text: `Only ${maxAllowed} items available. You already have ${
               totalInCart - item.quantity
            } in cart.`,
            confirmButtonColor: '#6b705c',
         });
         return;
      }

      updateQuantity(id, size, newQuantity);
   };

   // If cart is empty, show a message
   if (!cartItems.length) {
      return (
         <div className="cart-container">
            <h1 className="cart-title">Your Coffee Order</h1>
            <div className="cart-empty">
               <ShoppingCart size={48} className="cart-empty-icon" />
               <p>Your cart is empty</p>
               <Link to="/menu" className="cart-continue">
                  <ArrowLeft className="cart-icon" />
                  Continue Shopping
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="cart-container">
         <h1 className="cart-title">Your Coffee Order ({itemCount} items)</h1>

         <div className="cart-flex">
            <div className="cart-items-section">
               <table className="cart-table">
                  <thead>
                     <tr>
                        <th>Item</th>
                        <th>Size Breakdown</th>
                        <th>Price</th>
                        <th>Total Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {Object.values(groupedItems).map((item) => (
                        <tr key={`cart-item-${item.id}`}>
                           <td>
                              <div className="cart-item-images-text">
                                 {item.image && (
                                    <img
                                       src={item.image}
                                       alt={item.name}
                                       className="cart-item-image"
                                    />
                                 )}
                                 <div className="cart-item-details">
                                    <span className="cart-item-name">{item.name}</span>
                                    {item.type && (
                                       <span className="cart-item-type">Type: {item.type}</span>
                                    )}
                                 </div>
                              </div>
                           </td>
                           <td>
                              <div className="cart-size-breakdown">
                                 <div className="cart-size-row">
                                    <span>Small:</span>
                                    <span>{item.sizeCounts.Small || 0}</span>
                                 </div>
                                 <div className="cart-size-row">
                                    <span>Medium:</span>
                                    <span>{item.sizeCounts.Medium || 0}</span>
                                 </div>
                                 <div className="cart-size-row">
                                    <span>Large:</span>
                                    <span>{item.sizeCounts.Large || 0}</span>
                                 </div>
                              </div>
                           </td>
                           <td>
                              <div className="cart-price-breakdown">
                                 <div className="cart-price-row">
                                    <span>₱{parseFloat(item.price).toFixed(2)}</span>
                                 </div>
                                 <div className="cart-price-row">
                                    <span>₱{(parseFloat(item.price) + 20).toFixed(2)}</span>
                                 </div>
                                 <div className="cart-price-row">
                                    <span>₱{(parseFloat(item.price) + 40).toFixed(2)}</span>
                                 </div>
                              </div>
                           </td>
                           <td>{item.totalQuantity}</td>
                           <td>
                              ₱
                              {cartItems
                                 .filter((i) => i.id === item.id)
                                 .reduce((sum, i) => {
                                    const price =
                                       i.size === 'Medium'
                                          ? parseFloat(i.price) + 20
                                          : i.size === 'Large'
                                          ? parseFloat(i.price) + 40
                                          : parseFloat(i.price);
                                    return sum + price * i.quantity;
                                 }, 0)
                                 .toFixed(2)}
                           </td>
                           <td>
                              <button
                                 onClick={() => removeItem(item.id, item.size)}
                                 className="cart-remove"
                                 title="Remove item"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="cart-actions">
                  <Link to="/menu" className="cart-continue">
                     <ArrowLeft className="cart-icon" />
                     Continue Shopping
                  </Link>
                  <button onClick={clearCart} className="cart-clear">
                     Clear Cart
                  </button>
               </div>
            </div>

            <div className="cart-summary">
               <h2>Order Summary</h2>
               <div className="cart-summary-details">
                  <div className="cart-summary-row">
                     <span>Subtotal ({itemCount} items)</span>
                     <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-row">
                     <span>Delivery Fee</span>
                     <span>{shipping === 0 ? 'Free' : `₱${shipping.toFixed(2)}`}</span>
                  </div>
                  {promoApplied && (
                     <div className="cart-summary-row cart-discount">
                        <span>Discount (10%)</span>
                        <span>-₱{discount.toFixed(2)}</span>
                     </div>
                  )}
                  <div className="cart-summary-row cart-total">
                     <span>Total</span>
                     <span>₱{finalTotal.toFixed(2)}</span>
                  </div>
               </div>

               <div className="cart-promo">
                  <input
                     type="text"
                     value={promoCode}
                     onChange={(e) => setPromoCode(e.target.value)}
                     placeholder="Enter promo code"
                     disabled={promoApplied}
                     className="cart-promo-input"
                  />
                  <button
                     onClick={applyPromoCode}
                     disabled={promoApplied}
                     className="cart-promo-button"
                  >
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

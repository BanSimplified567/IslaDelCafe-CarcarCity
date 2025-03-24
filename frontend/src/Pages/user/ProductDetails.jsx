import { products } from '@components/Products';
import '@style/ProductsDetails.css';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from './CartContext';

function ProductDetails() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [quantity, setQuantity] = useState(1);
   const { cartItems, addToCart } = useContext(CartContext);
   const [showViewCart, setShowViewCart] = useState(false);

   // Find the product based on the ID
   const product = products.find((p) => p.id === parseInt(id));

   // Check if product is already in cart
   const isInCart = cartItems.some((item) => item.id === parseInt(id));

   // Set showViewCart based on whether the product is in the cart
   useEffect(() => {
      setShowViewCart(isInCart);
   }, [isInCart]);

   if (!product) {
      return (
         <div className="product-details-not-found">
            <div className="product-details-not-found-content">
               <h2 className="product-details-not-found-title">Product not found</h2>
               <button onClick={() => navigate(-1)} className="product-details-not-found-button">
                  <ArrowLeft className="product-details-icon" />
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   const handleAddToCart = () => {
      // Use the standardized addToCart function from context
      addToCart({
         ...product,
         quantity: parseInt(quantity),
      });

      // Show the View Cart button
      setShowViewCart(true);

      // Optional: Show success message
      alert(`${product.name} added to cart!`);
   };

   return (
      <div className="product-details-container">
         <div className="product-details-wrapper">
            <button onClick={() => navigate(-1)} className="product-details-back-button">
               <ArrowLeft className="product-details-icon" />
               Back to Menu
            </button>

            <div className="product-details-card">
               <div className="product-details-content">
                  {/* Product Image */}
                  <div className="product-details-image-container">
                     <img
                        src={product.image}
                        alt={product.name}
                        className="product-details-image"
                     />
                  </div>

                  {/* Product Info */}
                  <div className="product-details-info">
                     <div className="product-details-header">
                        <div>
                           <h1 className="product-details-title">{product.name}</h1>
                           <div className="product-details-rating">
                              {[...Array(5)].map((_, index) => (
                                 <Star
                                    key={index}
                                    className={`product-details-star ${
                                       index < product.rating
                                          ? 'product-details-star-filled'
                                          : 'product-details-star-empty'
                                    }`}
                                 />
                              ))}
                              <span className="product-details-reviews">
                                 ({product.reviews} reviews)
                              </span>
                           </div>
                        </div>
                        <div className="product-details-price-container">
                           <p className="product-details-price">₱{product.price.toFixed(2)}</p>
                           {product.originalPrice > product.price && (
                              <p className="product-details-original-price">
                                 ₱{product.originalPrice.toFixed(2)}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="product-details-section">
                        <h2 className="product-details-section-title">Description</h2>
                        <p className="product-details-description">{product.description}</p>
                     </div>

                     <div className="product-details-section">
                        <h2 className="product-details-section-title">Details</h2>
                        <dl className="product-details-specs">
                           <div className="product-details-spec-item">
                              <dt className="product-details-spec-label">Category:</dt>
                              <dd className="product-details-spec-value product-details-capitalize">
                                 {product.category}
                              </dd>
                           </div>
                           <div className="product-details-spec-item">
                              <dt className="product-details-spec-label">Ingredients:</dt>
                              <dd className="product-details-spec-value">
                                 {product.ingredients.join(', ')}
                              </dd>
                           </div>
                           <div className="product-details-spec-item">
                              <dt className="product-details-spec-label">Size Options:</dt>
                              <dd className="product-details-spec-value">
                                 {product.sizes.join(', ')}
                              </dd>
                           </div>
                        </dl>
                     </div>

                     <div className="product-details-actions">
                        <div className="product-details-select-group">
                           <label htmlFor="quantity" className="product-details-select-label">
                              Quantity:
                           </label>
                           <select
                              id="quantity"
                              className="product-details-select"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                           >
                              {[1, 2, 3, 4, 5].map((num) => (
                                 <option key={num} value={num}>
                                    {num}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <button className="product-details-add-button" onClick={handleAddToCart}>
                           <ShoppingCart className="product-details-icon" />
                           {isInCart ? 'Update Cart' : 'Add to Cart'}
                        </button>
                     </div>

                     {/* View Cart button appears below the Add to Cart button after adding */}
                     {showViewCart && (
                        <div className="product-details-cart-status">
                           <button
                              onClick={() => navigate('/cart')}
                              className="product-details-view-cart-button"
                           >
                              View Cart
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;

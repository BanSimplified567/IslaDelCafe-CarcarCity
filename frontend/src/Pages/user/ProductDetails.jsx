import '@style/ProductsDetails.css';
import { ArrowLeft, Heart, Minus, Plus, Share2, ShoppingCart, Star } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from './CartContext';

function ProductDetails() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [quantity, setQuantity] = useState(1);
   const { cartItems, addToCart } = useContext(CartContext);
   const [showViewCart, setShowViewCart] = useState(false);
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isFavorite, setIsFavorite] = useState(false);
   const [selectedSize, setSelectedSize] = useState('Small');
   const [adjustedPrice, setAdjustedPrice] = useState(0);
   const [sizeCounts, setSizeCounts] = useState({
      Small: 0,
      Medium: 0,
      Large: 0,
   });

   useEffect(() => {
      const fetchProductDetails = async () => {
         try {
            setLoading(true);
            const response = await fetch(`/api/products.php?product_id=${id}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();

            if (data.error) {
               throw new Error(data.error);
            }

            setProduct(data);
            setSelectedSize('Small');
            setAdjustedPrice(parseFloat(data.price));
            setError(null);
         } catch (err) {
            setError('Failed to fetch product details: ' + err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchProductDetails();
   }, [id]);

   const handleSizeChange = (size) => {
      setSelectedSize(size);
      const basePrice = parseFloat(product.price);
      let newPrice = basePrice;

      if (size === 'Medium') {
         newPrice = basePrice + 20;
      } else if (size === 'Large') {
         newPrice = basePrice + 40;
      }

      setAdjustedPrice(newPrice);
   };

   const handleAddToCart = () => {
      if (!product) return;

      const stock = parseInt(product.stock) || 0;

      if (stock <= 0) {
         Swal.fire({
            icon: 'warning',
            title: 'Out of Stock',
            text: 'This item is currently out of stock.',
            confirmButtonColor: '#6b705c',
         });
         return;
      }

      if (quantity > stock) {
         Swal.fire({
            icon: 'warning',
            title: 'Stock Limit Reached',
            text: `Only ${stock} items available in stock.`,
            confirmButtonColor: '#6b705c',
         });
         return;
      }

      const productToAdd = {
         id: parseInt(product.product_id),
         name: product.name,
         price: adjustedPrice,
         quantity: parseInt(quantity),
         image: product.image,
         size: selectedSize,
         stock: stock,
         type: product.type,
      };

      addToCart(productToAdd);
      setSizeCounts((prev) => ({
         ...prev,
         [selectedSize]: prev[selectedSize] + parseInt(quantity),
      }));

      Swal.fire({
         icon: 'success',
         title: 'Added to Cart',
         text: `${product.name} (${selectedSize}) has been added to your cart.`,
         timer: 1500,
         showConfirmButton: false,
         toast: true,
         position: 'top-end',
      });

      setShowViewCart(true);
   };

   const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
      Swal.fire({
         icon: 'success',
         title: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
         text: isFavorite
            ? `${product.name} has been removed from your favorites.`
            : `${product.name} has been added to your favorites.`,
         timer: 1500,
         showConfirmButton: false,
         toast: true,
         position: 'top-end',
      });
   };

   const shareProduct = () => {
      if (navigator.share) {
         navigator.share({
            title: product.name,
            text: `Check out this ${product.name} at Isla Del Cafe!`,
            url: window.location.href,
         });
      } else {
         Swal.fire({
            icon: 'info',
            title: 'Share Product',
            text: 'Copy this link to share:',
            input: 'text',
            inputValue: window.location.href,
            showCancelButton: true,
            confirmButtonText: 'Copy',
            cancelButtonText: 'Close',
         }).then((result) => {
            if (result.isConfirmed) {
               navigator.clipboard.writeText(window.location.href);
               Swal.fire({
                  icon: 'success',
                  title: 'Copied!',
                  text: 'Link copied to clipboard',
                  timer: 1500,
                  showConfirmButton: false,
                  toast: true,
                  position: 'top-end',
               });
            }
         });
      }
   };

   // Format image path correctly
   const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/default-product.jpg';
      if (imagePath.startsWith('http')) return imagePath;
      return imagePath.startsWith('/') ? imagePath : `/assets/img/${imagePath}`;
   };

   if (loading) {
      return (
         <div className="product-details-loading">
            <div className="coffee-loader">
               <div className="coffee-cup"></div>
               <div className="steam">
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
               <p>Brewing your coffee details...</p>
            </div>
         </div>
      );
   }

   if (error || !product) {
      return (
         <div className="product-details-not-found">
            <div className="product-details-not-found-content">
               <h2 className="product-details-not-found-title">Product not found</h2>
               <p className="product-details-not-found-message">
                  {error || 'Unable to locate the requested product'}
               </p>
               <button
                  onClick={() => navigate('/menu')}
                  className="product-details-not-found-button"
               >
                  <ArrowLeft className="product-details-icon" />
                  Back to Menu
               </button>
            </div>
         </div>
      );
   }

   // Now we have the product, render the details
   const imagePath = getImageUrl(product.image);
   const rating = parseFloat(product.rating || 0);
   const stock = parseInt(product.stock) || 0;

   return (
      <div className="product-details-container">
         <div className="product-details-wrapper">
            <button onClick={() => navigate('/menu')} className="product-details-back-button">
               <ArrowLeft className="product-details-icon" />
               Back to Menu
            </button>

            <div className="product-details-card">
               <div className="product-details-content">
                  {/* Product Image */}
                  <div className="product-details-image-container">
                     <img
                        src={imagePath}
                        alt={product.name}
                        className="product-details-image"
                        onError={(e) => {
                           e.target.src = '/assets/img/default-product.jpg';
                        }}
                     />
                     <div className="product-details-image-actions">
                        <button
                           onClick={toggleFavorite}
                           className={`product-details-favorite-button ${
                              isFavorite ? 'product-details-favorite-active' : ''
                           }`}
                        >
                           <Heart
                              className="product-details-icon"
                              fill={isFavorite ? 'currentColor' : 'none'}
                           />
                        </button>
                        <button onClick={shareProduct} className="product-details-share-button">
                           <Share2 className="product-details-icon" />
                        </button>
                     </div>
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
                                       index < rating
                                          ? 'product-details-star-filled'
                                          : 'product-details-star-empty'
                                    }`}
                                    fill={index < rating ? '#FFD700' : 'none'}
                                    stroke={index < rating ? '#FFD700' : 'currentColor'}
                                 />
                              ))}
                              <span className="product-details-reviews">
                                 ({rating.toFixed(1)}) {product.review_count || 0} reviews
                              </span>
                           </div>
                        </div>
                        <div className="product-details-price-container">
                           <p className="product-details-price">
                              ₱{parseFloat(product.price).toFixed(2)}
                           </p>
                           {product.original_price && (
                              <p className="product-details-original-price">
                                 ₱{parseFloat(product.original_price).toFixed(2)}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="product-details-section">
                        <h2 className="product-details-section-title">Description</h2>
                        <p className="product-details-description">
                           {product.description || 'No description available'}
                        </p>
                     </div>

                     <div className="product-details-section">
                        <h2 className="product-details-section-title">Details</h2>
                        <dl className="product-details-specs">
                           <div className="product-details-spec-item">
                              <dt className="product-details-spec-label">Category:</dt>
                              <dd className="product-details-spec-value product-details-capitalize">
                                 {product.type || 'Uncategorized'}
                              </dd>
                           </div>
                           {product.subtype && (
                              <div className="product-details-spec-item">
                                 <dt className="product-details-spec-label">Subcategory:</dt>
                                 <dd className="product-details-spec-value product-details-capitalize">
                                    {product.subtype}
                                 </dd>
                              </div>
                           )}
                           {product.size && (
                              <div className="product-details-spec-item">
                                 <dt className="product-details-spec-label">Size:</dt>
                                 <dd className="product-details-spec-value">{product.size}</dd>
                              </div>
                           )}
                           {product.temperature && (
                              <div className="product-details-spec-item">
                                 <dt className="product-details-spec-label">Temperature:</dt>
                                 <dd className="product-details-spec-value">
                                    {product.temperature}
                                 </dd>
                              </div>
                           )}
                           {product.calories && (
                              <div className="product-details-spec-item">
                                 <dt className="product-details-spec-label">Calories:</dt>
                                 <dd className="product-details-spec-value">
                                    {product.calories} cal
                                 </dd>
                              </div>
                           )}
                           {product.caffeine_level && (
                              <div className="product-details-spec-item">
                                 <dt className="product-details-spec-label">Caffeine Level:</dt>
                                 <dd className="product-details-spec-value">
                                    {product.caffeine_level}
                                 </dd>
                              </div>
                           )}
                           <div className="product-details-spec-item">
                              <dt className="product-details-spec-label">Availability:</dt>
                              <dd
                                 className={`product-details-spec-value ${
                                    stock > 0
                                       ? 'product-details-in-stock'
                                       : 'product-details-out-of-stock'
                                 }`}
                              >
                                 {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
                              </dd>
                           </div>
                        </dl>
                     </div>

                     <div className="product-details-actions">
                        <div className="product-details-size-selector">
                           <label className="product-details-size-label">Size:</label>
                           <div className="product-details-size-options">
                              {['Small', 'Medium', 'Large'].map((size) => (
                                 <button
                                    key={size}
                                    className={`product-details-size-option ${
                                       selectedSize === size ? 'product-details-size-selected' : ''
                                    }`}
                                    onClick={() => handleSizeChange(size)}
                                 >
                                    {size}
                                    {size !== 'Small' && (
                                       <span className="product-details-size-price">
                                          +₱{size === 'Medium' ? '20' : '40'}
                                       </span>
                                    )}
                                 </button>
                              ))}
                           </div>
                        </div>

                        <div className="product-details-size-counts">
                           <div className="product-details-size-count">
                              <span>Small:</span>
                              <span>{sizeCounts.Small}</span>
                           </div>
                           <div className="product-details-size-count">
                              <span>Medium:</span>
                              <span>{sizeCounts.Medium}</span>
                           </div>
                           <div className="product-details-size-count">
                              <span>Large:</span>
                              <span>{sizeCounts.Large}</span>
                           </div>
                        </div>

                        <div className="product-details-quantity">
                           <label htmlFor="quantity" className="product-details-quantity-label">
                              Quantity:
                           </label>
                           <div className="product-details-quantity-controls">
                              <button
                                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                 disabled={quantity <= 1}
                                 className="product-details-quantity-button"
                              >
                                 <Minus size={16} />
                              </button>
                              <input
                                 type="number"
                                 id="quantity"
                                 min="1"
                                 max={stock}
                                 value={quantity}
                                 onChange={(e) =>
                                    setQuantity(
                                       Math.min(stock, Math.max(1, parseInt(e.target.value) || 1))
                                    )
                                 }
                                 className="product-details-quantity-input"
                                 disabled={stock <= 0}
                              />
                              <button
                                 onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                                 disabled={quantity >= stock}
                                 className="product-details-quantity-button"
                              >
                                 <Plus size={16} />
                              </button>
                           </div>
                        </div>

                        <button
                           className={`product-details-add-button ${
                              stock <= 0 ? 'product-details-button-disabled' : ''
                           }`}
                           onClick={handleAddToCart}
                           disabled={stock <= 0}
                        >
                           <ShoppingCart className="product-details-icon" />
                           {cartItems.some((item) => item.id === parseInt(id))
                              ? 'Update Cart'
                              : 'Add to Cart'}
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

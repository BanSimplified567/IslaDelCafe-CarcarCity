import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../../components/Products';
import '../../style/ProductsDetails.css'; // We'll create this CSS file separately

function ProductDetails() {
   const { id } = useParams();
   const navigate = useNavigate();

   // Find the product based on the ID
   const product = products.find((p) => p.id === parseInt(id));

   if (!product) {
      return (
         <div className="product-details-not-found">
            <div className="product-details-not-found-content">
               <h2 className="product-details-not-found-title">Product not found</h2>
               <button
                  onClick={() => navigate(-1)}
                  className="product-details-not-found-button"
               >
                  <ArrowLeft className="product-details-icon" />
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="product-details-container">
         <div className="product-details-wrapper">
            <button
               onClick={() => navigate(-1)}
               className="product-details-back-button"
            >
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
                           <p className="product-details-price">
                              ₱{product.price.toFixed(2)}
                           </p>
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
                              <dt className="product-details-spec-label">Temperature:</dt>
                              <dd className="product-details-spec-value">
                                 {product.temperature}
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
                           <label htmlFor="size" className="product-details-select-label">
                              Size:
                           </label>
                           <select
                              id="size"
                              className="product-details-select"
                           >
                              {product.sizes.map((size) => (
                                 <option key={size} value={size}>
                                    {size}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div className="product-details-select-group">
                           <label htmlFor="quantity" className="product-details-select-label">
                              Quantity:
                           </label>
                           <select
                              id="quantity"
                              className="product-details-select"
                           >
                              {[1, 2, 3, 4, 5].map((num) => (
                                 <option key={num} value={num}>
                                    {num}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <button className="product-details-add-button">
                           <ShoppingCart className="product-details-icon" />
                           Add to Cart
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;

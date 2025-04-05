import '@style/Menu.css';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from './CartContext';

function Menu() {
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [sortBy, setSortBy] = useState('popular');
   const [currentPage, setCurrentPage] = useState(1);
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
   const itemsPerPage = 9;

   const { addToCart, cartItems, maxQuantityPerItem } = useContext(CartContext);
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            setLoading(true);
            const response = await fetch('/api/products.php');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();

            if (data.success && Array.isArray(data.data)) {
               setProducts(data.data);
            } else if (Array.isArray(data)) {
               setProducts(data);
            } else {
               throw new Error('Invalid data format received from API');
            }

            setError(null);
         } catch (err) {
            setError('Failed to fetch products: ' + err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchProducts();
   }, []);

   const filteredProducts = useMemo(() => {
      return products.filter((product) => {
         // Use type instead of category to match database structure
         const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
         const price = parseFloat(product.price) || 0;
         const meetsMin = minPrice === '' || price >= parseFloat(minPrice);
         const meetsMax = maxPrice === '' || price <= parseFloat(maxPrice);
         return matchesCategory && meetsMin && meetsMax;
      });
   }, [products, selectedCategory, minPrice, maxPrice]);

   const sortedProducts = useMemo(() => {
      return [...filteredProducts].sort((a, b) => {
         if (sortBy === 'price-low') return (a.price ?? 0) - (b.price ?? 0);
         if (sortBy === 'price-high') return (b.price ?? 0) - (a.price ?? 0);
         if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
         if (sortBy === 'category') return (a.type || '').localeCompare(b.type || '');
         return a.product_id - b.product_id; // Use product_id instead of id
      });
   }, [filteredProducts, sortBy]);

   const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentProducts = sortedProducts.slice(startIndex, endIndex);

   const handlePrevPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const handlePageClick = (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   const canAddToCart = useCallback(
      (productId) => {
         const existingItem = cartItems.find((item) => item.id === productId);
         return !existingItem || existingItem.quantity < maxQuantityPerItem;
      },
      [cartItems, maxQuantityPerItem]
   );

   const handleAddToCart = useCallback(
      (product) => {
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

         const existingItem = cartItems.find((item) => item.id === product.product_id);
         const currentQuantity = existingItem ? existingItem.quantity : 0;

         if (currentQuantity >= stock) {
            Swal.fire({
               icon: 'warning',
               title: 'Stock Limit Reached',
               text: `Only ${stock} items available in stock.`,
               confirmButtonColor: '#6b705c',
            });
            return;
         }

         addToCart({
            id: product.product_id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            size: 'Small',
            stock: stock,
            type: product.type,
         });

         Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.name} has been added to your cart.`,
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
         });
      },
      [addToCart, cartItems]
   );

   const renderStarRating = (rating) => {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      return (
         <div className="menu-container-rating-stars">
            {[...Array(fullStars)].map((_, i) => (
               <span key={`full-${i}`} className="menu-container-star-full">
                  ★
               </span>
            ))}
            {hasHalfStar && <span className="menu-container-star-half">★</span>}
            {[...Array(emptyStars)].map((_, i) => (
               <span key={`empty-${i}`} className="menu-container-star-empty">
                  ☆
               </span>
            ))}
         </div>
      );
   };

   const getImageUrl = (imagePath) => {
      if (!imagePath) return '/assets/img/default-product.jpg';
      if (imagePath.startsWith('http')) return imagePath;
      return imagePath.startsWith('/') ? imagePath : `/assets/img/${imagePath}`;
   };

   if (loading) {
      return (
         <div className="menu-container-loading">
            <div className="coffee-loader">
               <div className="coffee-cup"></div>
               <div className="steam">
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
               <p>Brewing your coffee...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return <div className="menu-container-error">{error}</div>;
   }

   if (products.length === 0) {
      return (
         <div className="menu-container-no-products">
            No products found. Please check the database connection.
         </div>
      );
   }

   // Get unique types from products for category filtering
   const categoryTypes = ['all', ...new Set(products.map((product) => product.type))];

   return (
      <div className="menu-container-main">
         <header className="menu-container-header">
            <h1 className="menu-container-title">Coffee Shop Menu</h1>
            <p className="menu-container-subtitle">
               Indulge in our handcrafted coffee and refreshing beverages
            </p>
            <Link to="/cart" className="menu-container-cart-link">
               🛒 View Cart
            </Link>
         </header>

         <div className="menu-container-layout">
            <aside className="menu-container-sidebar">
               <div className="menu-container-filter-box">
                  <h2 className="menu-container-category-title">Categories</h2>
                  <ul className="menu-container-category-list">
                     {categoryTypes.map((category) => (
                        <li key={category} className="menu-container-category-item">
                           <button
                              onClick={() => {
                                 setSelectedCategory(category);
                                 setCurrentPage(1);
                              }}
                              className={`menu-container-category-button ${
                                 selectedCategory === category
                                    ? 'menu-container-category-active'
                                    : 'menu-container-category-inactive'
                              }`}
                           >
                              {category === 'all'
                                 ? 'All Drinks'
                                 : category === 'coffee'
                                 ? 'Coffee Series'
                                 : category === 'matcha'
                                 ? 'Matcha Series'
                                 : category === 'milk'
                                 ? 'Milk Based'
                                 : category === 'hot'
                                 ? 'Hot Drinks'
                                 : category.charAt(0).toUpperCase() + category.slice(1)}
                           </button>
                        </li>
                     ))}
                  </ul>

                  <div className="menu-container-price-filter">
                     <h2 className="menu-container-price-title">Price Range</h2>
                     <div className="menu-container-price-inputs">
                        <div className="menu-container-price-field">
                           <label htmlFor="min-price" className="menu-container-price-label">
                              Min Price
                           </label>
                           <input
                              type="number"
                              id="min-price"
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                              className="menu-container-price-input"
                              placeholder="₱0"
                           />
                        </div>
                        <div className="menu-container-price-field">
                           <label htmlFor="max-price" className="menu-container-price-label">
                              Max Price
                           </label>
                           <input
                              type="number"
                              id="max-price"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              className="menu-container-price-input"
                              placeholder="₱100"
                           />
                        </div>
                        <button
                           className="menu-container-price-apply"
                           onClick={() => setCurrentPage(1)}
                        >
                           Apply Filter
                        </button>
                     </div>
                  </div>
               </div>
            </aside>

            <div className="menu-container-content">
               <div className="menu-container-sort-bar">
                  <p className="menu-container-results-count">
                     {sortedProducts.length} drinks found
                  </p>
                  <div className="menu-container-sort-controls">
                     <label htmlFor="sort" className="menu-container-sort-label">
                        Sort by:
                     </label>
                     <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => {
                           setSortBy(e.target.value);
                           setCurrentPage(1);
                        }}
                        className="menu-container-sort-select"
                     >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest Arrivals</option>
                     </select>
                  </div>
               </div>

               <div className="menu-container-products-grid">
                  {currentProducts.length > 0 ? (
                     currentProducts.map((product) => {
                        const isAtMaxQuantity = !canAddToCart(product.product_id);
                        const imagePath = getImageUrl(product.image);

                        return (
                           <div key={product.product_id} className="menu-container-product-card">
                              <div className="menu-container-product-image">
                                 <img
                                    src={imagePath}
                                    alt={product.name}
                                    className="menu-container-product-img"
                                    onError={(e) => {
                                       e.target.src = '/assets/img/default-product.jpg';
                                    }}
                                 />
                              </div>
                              <div className="menu-container-product-details">
                                 <h3 className="menu-container-product-name">{product.name}</h3>
                                 {product.size && (
                                    <div className="menu-container-product-size">
                                       <span className="menu-container-size-label">Size: </span>
                                       <span className="menu-container-size-value">
                                          {product.size}
                                       </span>
                                    </div>
                                 )}
                                 <div className="menu-container-product-rating">
                                    {!isNaN(parseFloat(product.rating)) ? (
                                       <>
                                          {renderStarRating(parseFloat(product.rating))}
                                          <span className="menu-container-rating-text">
                                             {parseFloat(product.rating).toFixed(1)} (
                                             {product.review_count || 0} reviews)
                                          </span>
                                       </>
                                    ) : (
                                       <span className="menu-container-rating-text">
                                          No ratings yet
                                       </span>
                                    )}
                                 </div>
                                 <div className="menu-container-product-pricing">
                                    <p className="menu-container-product-price">
                                       ₱{parseFloat(product.price).toFixed(2)}
                                    </p>
                                    {product.original_price && (
                                       <p className="menu-container-product-original-price">
                                          ₱{parseFloat(product.original_price).toFixed(2)}
                                       </p>
                                    )}
                                 </div>
                                 <p className="menu-container-product-description">
                                    {product.description || 'No description available'}
                                 </p>
                                 <div className="menu-container-product-actions">
                                    <Link
                                       to={`/product/${product.product_id}`}
                                       className="menu-container-view-button"
                                    >
                                       View Details
                                    </Link>
                                    <button
                                       className={`menu-container-add-button ${
                                          isAtMaxQuantity
                                             ? 'menu-container-add-button-disabled'
                                             : ''
                                       }`}
                                       onClick={() => {
                                          if (isAtMaxQuantity) {
                                             Swal.fire({
                                                icon: 'warning',
                                                title: 'Maximum Limit Reached',
                                                text: `You have already added ${maxQuantityPerItem} of this item.`,
                                                confirmButtonColor: '#6b705c',
                                             });
                                          } else {
                                             handleAddToCart(product);
                                          }
                                       }}
                                    >
                                       {isAtMaxQuantity ? 'Max Limit' : 'Add to Cart'}
                                    </button>
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <div className="menu-container-no-products">
                        No products found for the selected filters.
                     </div>
                  )}
               </div>

               {totalPages > 0 && (
                  <div className="menu-container-pagination">
                     <nav className="menu-container-pagination-nav">
                        <button
                           className={`menu-container-pagination-prev ${
                              currentPage === 1 ? 'menu-container-pagination-disabled' : ''
                           }`}
                           onClick={handlePrevPage}
                           disabled={currentPage === 1}
                        >
                           Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                           <button
                              key={page}
                              onClick={() => handlePageClick(page)}
                              className={`menu-container-pagination-page ${
                                 page === currentPage ? 'menu-container-pagination-active' : ''
                              }`}
                           >
                              {page}
                           </button>
                        ))}
                        <button
                           className={`menu-container-pagination-next ${
                              currentPage === totalPages ? 'menu-container-pagination-disabled' : ''
                           }`}
                           onClick={handleNextPage}
                           disabled={currentPage === totalPages}
                        >
                           Next
                        </button>
                     </nav>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Menu;

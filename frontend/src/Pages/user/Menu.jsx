import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../components/Products';
import '../../style/Menu.css';

function Menu() {
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [sortBy, setSortBy] = useState('popular');
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 8; // Number of items to show per page

   // Filter products by category
   const filteredProducts =
      selectedCategory === 'all'
         ? products
         : products.filter((product) => product.category === selectedCategory);

   // Sort products based on selection
   const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return b.id - a.id;
      // Default: popular (by id)
      return a.id - b.id;
   });

   // Calculate pagination
   const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentProducts = sortedProducts.slice(startIndex, endIndex);

   // Handle page navigation
   const handlePrevPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   // Function to render star ratings
   const renderStarRating = (rating) => {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      return (
         <div className="menu-container-rating-stars">
            {/* Full stars */}
            {[...Array(fullStars)].map((_, i) => (
               <span key={`full-${i}`} className="menu-container-star-full">
                  ★
               </span>
            ))}

            {/* Half star if needed */}
            {hasHalfStar && <span className="menu-container-star-half">★</span>}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
               <span key={`empty-${i}`} className="menu-container-star-empty">
                  ☆
               </span>
            ))}
         </div>
      );
   };

   return (
      <div className="menu-container-main">
         <header className="menu-container-header">
            <h1 className="menu-container-title">Coffee Shop Menu</h1>
            <p className="menu-container-subtitle">
               Indulge in our handcrafted coffee and refreshing beverages
            </p>
         </header>

         <div className="menu-container-layout">
            {/* Sidebar/Filters */}
            <aside className="menu-container-sidebar">
               <div className="menu-container-filter-box">
                  <h2 className="menu-container-category-title">Categories</h2>
                  <ul className="menu-container-category-list">
                     {['all', 'coffee', 'matcha', 'milk', 'juice', 'hot'].map((category) => (
                        <li key={category} className="menu-container-category-item">
                           <button
                              onClick={() => {
                                 setSelectedCategory(category);
                                 setCurrentPage(1); // Reset to first page when changing category
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
                              className="menu-container-price-input"
                              placeholder="₱100"
                           />
                        </div>
                        <button className="menu-container-price-apply">Apply Filter</button>
                     </div>
                  </div>
               </div>
            </aside>

            {/* Main content */}
            <div className="menu-container-content">
               {/* Sort options */}
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
                           setCurrentPage(1); // Reset to first page when changing sort
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

               {/* Products grid */}
               <div className="menu-container-products-grid">
                  {currentProducts.map((product) => (
                     <div key={product.id} className="menu-container-product-card">
                        <div className="menu-container-product-image">
                           <img
                              src={product.image}
                              alt={product.name}
                              className="menu-container-product-img"
                           />
                        </div>
                        <div className="menu-container-product-details">
                           <h3 className="menu-container-product-name">{product.name}</h3>

                           {/* Rating display */}
                           <div className="menu-container-product-rating">
                              {renderStarRating(product.rating)}
                              <span className="menu-container-rating-text">
                                 {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                              </span>
                           </div>

                           <div className="menu-container-product-pricing">
                              <p className="menu-container-product-price">
                                 ₱{product.price.toFixed(2)}
                              </p>
                              <p className="menu-container-product-original-price">
                                 ₱{product.originalPrice.toFixed(2)}
                              </p>
                           </div>
                           <p className="menu-container-product-description">
                              {product.description}
                           </p>
                           <div className="menu-container-product-actions">
                              <Link
                                 to={`/product/${product.id}`}
                                 className="menu-container-view-button"
                              >
                                 View Details
                              </Link>
                              <button className="menu-container-add-button">Add to Cart</button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Pagination */}
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
                           onClick={() => setCurrentPage(page)}
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
            </div>
         </div>
      </div>
   );
}

export default Menu;

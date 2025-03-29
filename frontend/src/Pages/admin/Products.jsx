import ProductManagement from '@components/admin/ProductManagement';
import '@style/Products.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Products() {
   const [activeView, setActiveView] = useState('grid');
   const [searchQuery, setSearchQuery] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('all');

   return (
      <div className="products-page">
         <div className="products-header">
            <h1>Products Management</h1>
            <div className="products-controls">
               <div className="search-filter-group">
                  <input
                     type="text"
                     placeholder="Search products..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="search-input"
                  />
                  <select
                     value={categoryFilter}
                     onChange={(e) => setCategoryFilter(e.target.value)}
                     className="category-filter"
                  >
                     <option value="all">All Categories</option>
                     <option value="Coffee">Coffee</option>
                     <option value="Tea">Tea</option>
                     <option value="Pastries">Pastries</option>
                  </select>
               </div>
               <div className="view-toggle">
                  <button
                     className={`view-btn ${activeView === 'grid' ? 'active' : ''}`}
                     onClick={() => setActiveView('grid')}
                  >
                     Grid View
                  </button>
                  <button
                     className={`view-btn ${activeView === 'list' ? 'active' : ''}`}
                     onClick={() => setActiveView('list')}
                  >
                     List View
                  </button>
               </div>
            </div>
         </div>

         <div className="products-content">
            <ProductManagement
               viewMode={activeView}
               searchQuery={searchQuery}
               categoryFilter={categoryFilter}
            />
         </div>

         <Outlet />
      </div>
   );
}

export default Products;

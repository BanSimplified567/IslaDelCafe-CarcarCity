import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../components/Products';
function Menu() {
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [sortBy, setSortBy] = useState('popular');

   // Filter products by category
   const filteredProducts =
      selectedCategory === 'all'
         ? products
         : products.filter((product) => product.category === selectedCategory);

   return (
      <div className="container mx-auto px-4 py-8">
         <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Coffee Shop Menu</h1>
            <p className="text-gray-600">
               Indulge in our handcrafted coffee and refreshing beverages
            </p>
         </header>

         <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar/Filters */}
            <aside className="w-full md:w-64 flex-shrink-0">
               <div className="bg-gray-100 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
                  <ul className="space-y-2">
                     {['all', 'coffee', 'matcha', 'milk', 'juice', 'hot'].map((category) => (
                        <li key={category}>
                           <button
                              onClick={() => setSelectedCategory(category)}
                              className={`w-full text-left py-2 px-4 rounded ${
                                 selectedCategory === category
                                    ? 'bg-amber-600 text-white'
                                    : 'hover:bg-gray-200'
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

                  <div className="mt-8">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">Price Range</h2>
                     <div className="space-y-2">
                        <div>
                           <label htmlFor="min-price" className="block text-gray-600 mb-1">
                              Min Price
                           </label>
                           <input
                              type="number"
                              id="min-price"
                              className="w-full p-2 border rounded"
                              placeholder="₱0"
                           />
                        </div>
                        <div>
                           <label htmlFor="max-price" className="block text-gray-600 mb-1">
                              Max Price
                           </label>
                           <input
                              type="number"
                              id="max-price"
                              className="w-full p-2 border rounded"
                              placeholder="₱100"
                           />
                        </div>
                        <button className="w-full bg-amber-800 text-white py-2 px-4 rounded hover:bg-amber-700">
                           Apply Filter
                        </button>
                     </div>
                  </div>
               </div>
            </aside>

            {/* Main content */}
            <div className="flex-grow">
               {/* Sort options */}
               <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">{filteredProducts.length} drinks found</p>
                  <div className="flex items-center">
                     <label htmlFor="sort" className="mr-2 text-gray-600">
                        Sort by:
                     </label>
                     <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 border rounded"
                     >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest Arrivals</option>
                     </select>
                  </div>
               </div>

               {/* Products grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                     <div
                        key={product.id}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                     >
                        <div className="bg-amber-100 h-48 flex items-center justify-center text-amber-800 font-bold">
                           {/* Placeholder for image */}
                           {product.name}
                        </div>
                        <div className="p-4">
                           <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                           <div className="flex items-center mb-2">
                              <p className="text-amber-600 font-medium">
                                 ₱{product.price.toFixed(2)}
                              </p>
                              <p className="text-gray-500 text-sm line-through ml-2">
                                 ₱{product.originalPrice.toFixed(2)}
                              </p>
                           </div>
                           <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {product.description}
                           </p>
                           <div className="flex space-x-2">
                              <Link
                                 to={`/product/${product.id}`}
                                 className="bg-amber-600 text-white py-1 px-3 rounded text-sm hover:bg-amber-700"
                              >
                                 View Details
                              </Link>
                              <button className="bg-amber-800 text-white py-1 px-3 rounded text-sm hover:bg-amber-900">
                                 Add to Cart
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Pagination */}
               <div className="mt-8 flex justify-center">
                  <nav className="flex items-center">
                     <button className="px-3 py-1 rounded-l border border-gray-300 hover:bg-gray-100">
                        Previous
                     </button>
                     {[1, 2].map((page) => (
                        <button
                           key={page}
                           className={`px-3 py-1 border-t border-b border-gray-300 ${
                              page === 1 ? 'bg-amber-600 text-white' : 'hover:bg-gray-100'
                           }`}
                        >
                           {page}
                        </button>
                     ))}
                     <button className="px-3 py-1 rounded-r border border-gray-300 hover:bg-gray-100">
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

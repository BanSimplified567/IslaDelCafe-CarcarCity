import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../../components/Products';

function ProductDetails() {
   const { id } = useParams();
   const navigate = useNavigate();

   // Find the product based on the ID
   const product = products.find((p) => p.id === parseInt(id));

   if (!product) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
               <button
                  onClick={() => navigate(-1)}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700"
               >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
            <button
               onClick={() => navigate(-1)}
               className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-800"
            >
               <ArrowLeft className="w-5 h-5 mr-2" />
               Back to Menu
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <div className="md:flex">
                  {/* Product Image */}
                  <div className="md:w-1/2">
                     <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[500px] object-cover"
                     />
                  </div>

                  {/* Product Info */}
                  <div className="md:w-1/2 p-8">
                     <div className="flex justify-between items-start">
                        <div>
                           <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                           <div className="mt-2 flex items-center">
                              {[...Array(5)].map((_, index) => (
                                 <Star
                                    key={index}
                                    className={`w-5 h-5 ${
                                       index < product.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                    }`}
                                 />
                              ))}
                              <span className="ml-2 text-gray-600">
                                 ({product.reviews} reviews)
                              </span>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-3xl font-bold text-brown-600">
                              ₱{product.price.toFixed(2)}
                           </p>
                           {product.originalPrice > product.price && (
                              <p className="text-sm text-gray-500 line-through">
                                 ₱{product.originalPrice.toFixed(2)}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
                     </div>

                     <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900">Details</h2>
                        <dl className="mt-4 space-y-4">
                           <div className="flex items-center">
                              <dt className="w-1/3 text-gray-600">Category:</dt>
                              <dd className="w-2/3 font-medium text-gray-900 capitalize">
                                 {product.category}
                              </dd>
                           </div>
                           <div className="flex items-center">
                              <dt className="w-1/3 text-gray-600">Temperature:</dt>
                              <dd className="w-2/3 font-medium text-gray-900">
                                 {product.temperature}
                              </dd>
                           </div>
                           <div className="flex items-center">
                              <dt className="w-1/3 text-gray-600">Size Options:</dt>
                              <dd className="w-2/3 font-medium text-gray-900">
                                 {product.sizes.join(', ')}
                              </dd>
                           </div>
                        </dl>
                     </div>

                     <div className="mt-8 space-y-4">
                        <div className="flex items-center space-x-4">
                           <label htmlFor="size" className="text-gray-700 font-medium">
                              Size:
                           </label>
                           <select
                              id="size"
                              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
                           >
                              {product.sizes.map((size) => (
                                 <option key={size} value={size}>
                                    {size}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div className="flex items-center space-x-4">
                           <label htmlFor="quantity" className="text-gray-700 font-medium">
                              Quantity:
                           </label>
                           <select
                              id="quantity"
                              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
                           >
                              {[1, 2, 3, 4, 5].map((num) => (
                                 <option key={num} value={num}>
                                    {num}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <button className="w-full bg-brown-600 text-white py-3 px-6 rounded-md hover:bg-brown-700 flex items-center justify-center">
                           <ShoppingCart className="w-5 h-5 mr-2" />
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

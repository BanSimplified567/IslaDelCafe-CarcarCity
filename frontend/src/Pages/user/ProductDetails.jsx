import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
   const { id } = useParams();
   const [quantity, setQuantity] = useState(1);
   const [selectedImage, setSelectedImage] = useState(0);
   const [activeTab, setActiveTab] = useState('description');

   // Dummy product data (would normally be fetched based on ID)
   const product = {
      id: id,
      name: 'Premium Wireless Headphones',
      price: 149.99,
      discountPrice: 99.99,
      rating: 4.5,
      reviewCount: 128,
      description:
         'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for all-day use.',
      features: [
         'Active Noise Cancellation',
         'Bluetooth 5.0 connectivity',
         '30-hour battery life',
         'Memory foam ear cushions',
         'Built-in microphone for calls',
         'Voice assistant compatible',
      ],
      specs: {
         Dimensions: '7.5 x 6.7 x 3.2 inches',
         Weight: '9.8 ounces',
         Battery: 'Lithium-ion rechargeable',
         Charging: 'USB-C',
         Warranty: '2-year limited',
      },
      images: [
         'headphone-main.jpg',
         'headphone-side.jpg',
         'headphone-folded.jpg',
         'headphone-case.jpg',
      ],
      colors: ['Black', 'Silver', 'Blue'],
      stock: 15,
   };

   const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value);
      if (value > 0 && value <= product.stock) {
         setQuantity(value);
      }
   };

   const decreaseQuantity = () => {
      if (quantity > 1) {
         setQuantity(quantity - 1);
      }
   };

   const increaseQuantity = () => {
      if (quantity < product.stock) {
         setQuantity(quantity + 1);
      }
   };

   return (
      <div className="container mx-auto px-4 py-8">
         <div className="mb-4">
            <Link to="/shop" className="text-blue-600 hover:underline flex items-center">
               ← Back to Shop
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
               <div className="bg-gray-100 h-80 md:h-96 rounded-lg mb-4">
                  {/* Main product image would go here */}
               </div>
               <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                     <button
                        key={index}
                        className={`bg-gray-200 h-20 rounded ${
                           selectedImage === index ? 'ring-2 ring-blue-600' : ''
                        }`}
                        onClick={() => setSelectedImage(index)}
                     >
                        {/* Thumbnail would go here */}
                     </button>
                  ))}
               </div>
            </div>

            {/* Product Info */}
            <div>
               <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

               <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                           key={star}
                           className={`w-5 h-5 ${
                              star <= Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                           }`}
                           viewBox="0 0 20 20"
                           fill="currentColor"
                        >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     ))}
                  </div>
                  <span className="text-gray-600">
                     {product.rating} ({product.reviewCount} reviews)
                  </span>
               </div>

               <div className="mb-6">
                  {product.discountPrice ? (
                     <div className="flex items-center">
                        <span className="text-3xl font-bold text-gray-800 mr-2">
                           ${product.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                           ${product.price.toFixed(2)}
                        </span>
                        <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                           Save ${(product.price - product.discountPrice).toFixed(2)}
                        </span>
                     </div>
                  ) : (
                     <span className="text-3xl font-bold text-gray-800">
                        ${product.price.toFixed(2)}
                     </span>
                  )}
                  <p className="text-green-600 mt-1">In Stock ({product.stock} available)</p>
               </div>

               {/* Color Selection */}
               <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Color</h3>
                  <div className="flex space-x-3">
                     {product.colors.map((color, index) => (
                        <button
                           key={index}
                           className={`px-4 py-2 border rounded ${
                              index === 0 ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
                           }`}
                        >
                           {color}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Quantity Selector */}
               <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Quantity</h3>
                  <div className="flex items-center">
                     <button onClick={decreaseQuantity} className="bg-gray-200 px-3 py-1 rounded-l">
                        -
                     </button>
                     <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 text-center py-1 border-t border-b"
                     />
                     <button onClick={increaseQuantity} className="bg-gray-200 px-3 py-1 rounded-r">
                        +
                     </button>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition">
                     Add to Cart
                  </button>
                  <button className="bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition">
                     Buy Now
                  </button>
               </div>

               {/* Delivery Info */}
               <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Delivery Information</h3>
                  <p className="text-gray-600 mb-2">Free shipping on orders over $50</p>
                  <p className="text-gray-600">Estimated delivery: 3-5 business days</p>
               </div>
            </div>
         </div>

         {/* Product Details Tabs */}
         <div className="mb-12">
            <div className="border-b mb-4">
               <div className="flex space-x-8">
                  {['description', 'features', 'specifications', 'reviews'].map((tab) => (
                     <button
                        key={tab}
                        className={`py-4 font-medium text-lg border-b-2 -mb-px ${
                           activeTab === tab
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setActiveTab(tab)}
                     >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                     </button>
                  ))}
               </div>
            </div>

            <div className="py-4">
               {activeTab === 'description' && (
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
               )}

               {activeTab === 'features' && (
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                     {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                     ))}
                  </ul>
               )}

               {activeTab === 'specifications' && (
                  <div className="border rounded-lg overflow-hidden">
                     {Object.entries(product.specs).map(([key, value], index) => (
                        <div
                           key={key}
                           className={`flex ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                        >
                           <div className="w-1/3 py-3 px-4 font-medium text-gray-800">{key}</div>
                           <div className="w-2/3 py-3 px-4 text-gray-700">{value}</div>
                        </div>
                     ))}
                  </div>
               )}

               {activeTab === 'reviews' && (
                  <div>
                     <div className="flex items-center mb-6">
                        <span className="text-5xl font-bold text-gray-800 mr-4">
                           {product.rating}
                        </span>
                        <div>
                           <div className="flex text-yellow-400 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                 <svg
                                    key={star}
                                    className={`w-5 h-5 ${
                                       star <= Math.floor(product.rating)
                                          ? 'fill-current'
                                          : 'text-gray-300'
                                    }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                 >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                 </svg>
                              ))}
                           </div>
                           <span className="text-gray-600">
                              Based on {product.reviewCount} reviews
                           </span>
                        </div>
                     </div>

                     <button className="bg-blue-600 text-white py-2 px-6 rounded font-medium hover:bg-blue-700 transition mb-8">
                        Write a Review
                     </button>

                     {/* Sample reviews would go here */}
                     <p className="text-gray-600">No reviews yet for this product.</p>
                  </div>
               )}
            </div>
         </div>

         {/* Related Products */}
         <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[1, 2, 3, 4].map((item) => (
                  <div
                     key={item}
                     className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                     <div className="bg-gray-200 h-48"></div>
                     <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2">Related Product</h3>
                        <p className="text-gray-600 mb-2">$79.99</p>
                        <Link to={`/product/${item}`} className="text-blue-600 hover:underline">
                           View Details
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ProductDetail;


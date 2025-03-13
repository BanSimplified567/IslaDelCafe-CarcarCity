import React, { useState } from 'react';
import IslaDelCafeCoffee from '../../assets/IslaDelCafeCoffee.jpg';
import IslaDelCafeBestSeller from '../../assets/IslaDelCafeJavaChips.jpg';
import IslaDelCafePeople from '../../assets/IslaDelCafePeople.jpg';
import IslaDelCafeShop from '../../assets/IslaDelCafeShop.jpg';
import IslaDelCafeOwner from '../../assets/OwnerIslaDelCafe.jpg';

import products from '../../components/Products'; // Assuming this is where your product data is
import '../../index.css';

function Index() {
   const [isCentered, setIsCentered] = useState(false);
   const [isMenu, setMenu] = useState(0); // Initialize to 0 for the first page
   const itemsPerPage = 5;
   const totalPages = Math.ceil(products.length / itemsPerPage);

   const currentItems = products.slice(isMenu * itemsPerPage, (isMenu + 1) * itemsPerPage);

   const prevSlide = () => {
      setMenu((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
   };

   const nextSlide = () => {
      setMenu((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
   };

   const toggleImageCenter = () => {
      setIsCentered(!isCentered);
   };

   const formatPrice = (price) => {
      return `$${price.toFixed(2)}`;
   };

   return (
      <div className="index-container ">
         <section className="index-section-header ">
            <div className="index-section-title">
               <h1>
                  WELCOME TO <span>ISLA DEL CAFE</span>
               </h1>
               <p>Your tropical coffee escape in the Heritage City of the South.</p>
               <button>ORDER NOW</button>
            </div>

            <div className="index-section-images">
               <div className="image-grid">
                  {[IslaDelCafeOwner, IslaDelCafePeople, IslaDelCafeCoffee, IslaDelCafeShop].map(
                     (src, index) => (
                        <div key={index} className="index-grid-item">
                           <img src={src} alt={`Isla Del Cafe Image ${index + 1}`} />
                        </div>
                     )
                  )}
               </div>
            </div>
         </section>

         <article className="index-container-bestseller">
            <img
               src={IslaDelCafeBestSeller}
               alt="Java Chips - Isla Del Cafe Best Seller"
               className={isCentered ? 'centered-image' : ''}
               onClick={toggleImageCenter}
            />
            <section className="index-bestseller-article">
               <h1>JAVA CHIPS</h1>
               <p>
                  A deliciously indulgent blend of rich coffee, chocolate chips, and creamy milk,
                  all served over ice. A perfect treat for coffee and chocolate lovers, offering a
                  smooth and satisfying crunch in every sip.
               </p>
               <div className="index-bestseller-features">
                  <h3>Rich Espresso</h3>
                  <h3>Creamy Milk</h3>
                  <h3>Chocolate Chips</h3>
               </div>
            </section>
         </article>
         <div className="index-article-shop">
            <section className="index-article-header">
               <h1>Isla Del Cafe</h1>
               <h3>
                  DELICIOUS HANDCRAFTED DRINKS AND SNACKS MADE FROM THE SIMPLEST, HIGHEST QUALITY
                  INGREDIENTS. COFFEE IS AT THE HEART OF WHAT WE DO, AND SO ARE ALL THE WAYS WE
                  BRING YOU THE COFFEE HOUSE EXPERIENCE WHEREVER YOU ARE.
               </h3>
               <p>
                  Whether it's a quick morning coffee from the nearest coffee shop or a quick midday
                  snack, we have something for everyone. Here are some options to help you celebrate
                  the little joys of each day with us.
               </p>
               <button>Our new taste</button>
            </section>
            <div className="index-isladelcafe-coffees">
               <div className="index-isladelcafe-section">
                  <section className="index-coffees-header">
                     <h1>COFFEE MENU</h1>
                     <h3>
                        From warm and smooth to cold and refreshing, there are endless drink options
                        to find and love at IslaDelCafe.
                     </h3>
                  </section>
                  <section className="index-coffees-options">
                     <h3>Cold coffee</h3>
                     <h3>Craft drinks</h3>
                     <h3>With coconut milk</h3>
                     <h3>Espresso based</h3>
                     <h3>Cappuccino/latte</h3>
                  </section>
               </div>

               <div className="index-menu-container">
                  <h1 className="index-menu-title">The Grind Coffee Menu</h1>

                  <div className="index-menu-grid">
                     {currentItems.map((product) => (
                        <div key={product.id} className="index-menu-item">
                           <div className="index-menu-image-wrapper">
                              <img
                                 src={product.image} // Use the image path from the product object
                                 alt={product.name}
                                 className="index-menu-image"
                              />
                           </div>
                           <div className="index-menu-content">
                              <h3 className="index-menu-product-name">{product.name}</h3>
                              <div className="index-menu-product-details">
                                 <div className="index-menu-price-container">
                                    <span className="index-menu-price">
                                       {formatPrice(product.price)}
                                    </span>
                                    <span className="index-menu-original-price">
                                       {formatPrice(product.originalPrice)}
                                    </span>
                                 </div>
                                 <span className="index-menu-category">{product.category}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="index-menu-pagination">
                     {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                           key={index}
                           onClick={() => setMenu(index)}
                           className={`index-menu-dot ${
                              isMenu === index ? 'index-menu-dot-active' : ''
                           }`}
                           aria-label={`Go to slide ${index + 1}`}
                        />
                     ))}
                  </div>

                  <div className="index-menu-slide-info">
                     Slide {isMenu + 1} of {totalPages}
                  </div>

                  <div className="index-menu-navigation">
                     <button
                        onClick={prevSlide}
                        className="index-menu-button index-menu-button-prev"
                     >
                        Previous
                     </button>
                     <button
                        onClick={nextSlide}
                        className="index-menu-button index-menu-button-next"
                     >
                        Next
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Index;

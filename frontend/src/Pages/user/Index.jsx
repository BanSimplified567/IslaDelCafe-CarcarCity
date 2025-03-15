import React, { useState } from 'react';
import IslaDelCafeCoffee from '../../assets/IslaDelCafeCoffee.jpg';
import IlaDelCafeCoffees from '../../assets/IslaDelCafeCoffees.jpg';
import IslaDelCafeBestSeller from '../../assets/IslaDelCafeJavaChips.jpg';
import IslaDelCafePeople from '../../assets/IslaDelCafePeople.jpg';
import IslaDelCafeShop from '../../assets/IslaDelCafeShop.jpg';
import IslaDelCafeOwner from '../../assets/OwnerIslaDelCafe.jpg';
import IslaDelCafeFoods from '../../assets/IslaDelCafeFoods.jpg';
import products from '../../components/Products';
import '../../index.css';

function Index() {
   const [isCentered, setIsCentered] = useState(false);
   const [currentPage, setCurrentPage] = useState(0);

   const itemsPerPage = 6;
   const totalPages = Math.ceil(products.length / itemsPerPage);
   const currentItems = products.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
   );

   const prevSlide = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
   const nextSlide = () => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
   const toggleImageCenter = () => setIsCentered(!isCentered);
   const formatPrice = (price) => `$${price.toFixed(2)}`;

   return (
      <div className="index-container">
         {/* Header Section */}
         <section className="index-section-header">
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

         {/* Bestseller Section */}
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
                  all served over ice.
               </p>
               <div className="index-bestseller-features">
                  <h3>Rich Espresso</h3>
                  <h3>Creamy Milk</h3>
                  <h3>Chocolate Chips</h3>
               </div>
            </section>
         </article>

         {/* Shop Section */}
         <div className="index-article-shop">
            <section className="index-article-header">
               <h1>Isla Del Cafe</h1>
               <h3>
                  Delicious handcrafted drinks and snacks made from the simplest, highest quality
                  ingredients.
               </h3>
               <p>
                  From morning coffee to midday snacks, we have something for everyone. Celebrate
                  the little joys with us.
               </p>
               <button>Our new taste</button>
            </section>

            {/* Coffee Menu */}
            <div className="index-isladelcafe-coffees">
               <div className="index-isladelcafe-section">
                  <section className="index-coffees-header">
                     <h1>COFFEE MENU</h1>
                     <h3>Discover warm and smooth or cold and refreshing drinks at IslaDelCafe.</h3>
                  </section>
                  <section className="index-coffees-options">
                     <h3>Cold coffee</h3>
                     <h3>Craft drinks</h3>
                     <h3>With coconut milk</h3>
                     <h3>Espresso based</h3>
                     <h3>Cappuccino/latte</h3>
                  </section>
               </div>

               {/* Product Menu */}
               <div className="index-menu-container">
                  <h1 className="index-menu-title">The Grind Coffee Menu</h1>
                  <div className="index-menu-grid">
                     {currentItems.map((product) => (
                        <div key={product.id} className="index-menu-item">
                           <div className="index-menu-image-wrapper">
                              <img
                                 src={product.image}
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

                  {/* Pagination Controls */}
                  <div className="index-menu-pagination">
                     {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                           key={index}
                           onClick={() => setCurrentPage(index)}
                           className={`index-menu-dot ${
                              currentPage === index ? 'index-menu-dot-active' : ''
                           }`}
                           aria-label={`Go to slide ${index + 1}`}
                        />
                     ))}
                  </div>

                  <div className="index-menu-slide-info">
                     Slide {currentPage + 1} of {totalPages}
                  </div>

                  {/* Navigation Buttons */}
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
         <div className="index-about-isladelcafe">
            <section className="index-about-header">
               <img src={IslaDelCafeCoffee} alt="IslaDelCafeCoffee" />
               <span className="index-about-span">
                  <h1>Our Shop</h1>
                  <h3>Our Dream gallery</h3>
                  <p>
                     Boost your productivity and build your mood with a short break in the most
                     comfortable place. Boost your productivity
                  </p>
               </span>
            </section>
            <section className="index-about-gallery">
               <div className="index-about-container-left">
                  <div className="index-about-grid">
                     <img
                        src={IlaDelCafeCoffees}
                        alt="Coffee Life"
                        className="index-about-item item1"
                     />
                     <img
                        src={IlaDelCafeCoffees}
                        alt="Espresso Machine"
                        className="index-about-item item2"
                     />
                     <img
                        src={IlaDelCafeCoffees}
                        alt="Hot Coffee"
                        className="index-about-item item3"
                     />
                  </div>
               </div>
               <div className="index-about-container-right">
                  <img
                     src={IslaDelCafeFoods}
                     alt="IslaDelCafeFoods"
                     className="index-about-item item4"
                  />
               </div>
            </section>
         </div>
      </div>
   );
}

export default Index;

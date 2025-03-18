import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IslaDelCafeCoffee from '../../assets/IslaDelCafeCoffee.jpg';
import IlaDelCafeCoffees from '../../assets/IslaDelCafeCoffees.jpg';
import IslaDelCafeFoods from '../../assets/IslaDelCafeFoods.jpg';
import IslaDelCafeBestSeller from '../../assets/IslaDelCafeJavaChips.jpg';
import IslaDelCafePeople from '../../assets/IslaDelCafePeople.jpg';
import IslaDelCafeShop from '../../assets/IslaDelCafeShop.jpg';
import IslaDelCafeOwner from '../../assets/OwnerIslaDelCafe.jpg';
import IslaDelCafeReviewOne from '../../assets/IslaDelCafeReviewOne.jpg';
import IslaDelCafeReviewTwo from '../../assets/IslaDelCafeReviewTwo.jpg';
import IslaDelCafeReviewThree from '../../assets/IslaDelCafeReviewThree.jpg';
import IslaDelCafeReviewFour from '../../assets/IslaDelCafeReviewFour.jpg';
import Footer from '../../components/Footer';
import products from '../../components/Products';


import '../../index.css';

function Index() {
   const navigate = useNavigate();
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
   const formatPrice = (price) => `₱${price.toFixed(2)}`;

   // Sample testimonials data
   const testimonials = [
      {
         name: 'Nikko',
         text: 'Bought 4x the taste is okay for its price if you can wait for 20min minimum',
         image: IslaDelCafeReviewOne,
      },
      {
         name: 'Vince Mar',
         text: 'The atmosphere here is unmatched. Perfect place to work remotely or just enjoy a quiet moment with excellent coffee and service.',
         image: IslaDelCafeReviewTwo,
      },
      {
         name: 'Kenzo Yap',
         text: 'I visit weekly for their specialty drinks. The staff is always friendly and remembers my order. Truly a gem in our community!',
         image: IslaDelCafeReviewThree,
      },
      {
         name: 'Fermosa Colección',
         text: 'I visit weekly for their specialty drinks. The staff is always friendly and remembers my order. Truly a gem in our community!',
         image: IslaDelCafeReviewFour,
      },
   ];
   const [activeIndex, setActiveIndex] = useState(0);

   // Calculate number of visible slides per view (always show 2)
   const slidesPerView = 2;

   // Calculate total number of "pages" of testimonials
   const totalImagesPages = Math.ceil(testimonials.length / slidesPerView);

   // Auto-slide effect
   useEffect(() => {
      const interval = setInterval(() => {
         // Only advance if we're not at the end
         setActiveIndex((current) => {
            const nextIndex = current + 1;
            // Reset to beginning if we've reached the end
            return nextIndex >= totalImagesPages ? 0 : nextIndex;
         });
      }, 5000);

      return () => clearInterval(interval);
   }, [totalImagesPages]);

   // Manual navigation
   const goToSlide = (index) => {
      setActiveIndex(index);
   };

   return (
      <div className="index-container">
         {/* Header Section */}
         <section className="index-section-header">
            <div className="index-section-title">
               <h1>
                  WELCOME TO <span>ISLA DEL CAFE</span>
               </h1>
               <p>Your tropical coffee escape in the Heritage City of the South.</p>
                  <button onClick={() => navigate('/menu')}>ORDER NOW</button>
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

               <button onClick={() => navigate('/menu')}>Our new taste</button>
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
            <div className="index-customer-container">
               <section className="index-customer-header">
                  <h1>What</h1>
                  <h3>Our customers say</h3>
               </section>

               {/* Carousel */}
               <div className="index-customer-wrapper">
                  {/* Testimonial Cards */}
                  <div className="index-customer-carousel">
                     <div
                        className="index-customer-slides"
                        style={{
                           transform: `translateX(-${(activeIndex * 100) / slidesPerView}%)`,
                        }}
                     >
                        {testimonials.map((testimonial, index) => (
                           <div key={index} className="index-customer-item">
                              <div className="index-customer-card">
                                 <div className="index-customer-profile">
                                    <img
                                       src={testimonial.image}
                                       alt={testimonial.name}
                                       className="index-customer-image"
                                    />
                                    <h3 className="index-customer-name">{testimonial.name}</h3>
                                 </div>
                                 <div className="index-customer-content">
                                    <h3 className="index-customer-text">"{testimonial.text}"</h3>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Navigation Dots */}
                  <div className="index-customer-navigation">
                     {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                           key={index}
                           onClick={() => goToSlide(index)}
                           className={`index-customer-dot ${activeIndex === index ? 'active' : ''}`}
                           aria-label={`Go to slide group ${index + 1}`}
                        />
                     ))}
                  </div>
               </div>
            </div>
            <section className="index-contactUs-container">
               {/* First Container - Location Frame */}
               <div className="index-contactUs-location">
                  <div className="index-contactUs-location-header">Our Location</div>
                  <div className="index-contactUs-location-content">
                     {/* Map Frame with Google Maps */}
                     <div className="index-contactUs-location-map">
                        <iframe
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.9292655632853!2d123.63531687450946!3d10.104875971222398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a97d004045a0fb%3A0x197b5dc4e6b0dba7!2sIsla%20del%20Caf%C3%A8%20-%20Carcar!5e0!3m2!1sen!2sph!4v1742131194650!5m2!1sen!2sph"
                           width="100%"
                           height="100%"
                           style={{ border: 0 }}
                           allowFullScreen=""
                           loading="lazy"
                           referrerPolicy="no-referrer-when-downgrade"
                           title="Isla del Cafè location"
                        ></iframe>
                     </div>
                     <h3 className="index-contactUs-location-title">Carcar City</h3>
                     <p className="index-contactUs-location-address">
                        Isla del Cafè - Carcar
                        <br />
                        Carcar City, Cebu
                        <br />
                        Philippines
                     </p>
                  </div>
               </div>

               {/* Second Container - Contact Form */}
               <div className="index-contactUs-form">
                  <div className="index-contactUs-form-header">Contact Us</div>
                  <div className="index-contactUs-form-content">
                     <form className="index-contactUs-form-fields">
                        <div className="index-contactUs-form-group">
                           <label htmlFor="email" className="index-contactUs-form-label">
                              Email
                           </label>
                           <input
                              type="email"
                              id="email"
                              name="email"
                              className="index-contactUs-form-input"
                              placeholder="example@email.com"
                              required
                           />
                        </div>

                        <div className="index-contactUs-form-group">
                           <label htmlFor="number" className="index-contactUs-form-label">
                              Phone Number
                           </label>
                           <input
                              type="tel"
                              id="number"
                              name="number"
                              className="index-contactUs-form-input"
                              placeholder="+63 123 456 7890"
                           />
                        </div>

                        <div className="index-contactUs-form-group">
                           <label htmlFor="message" className="index-contactUs-form-label">
                              Message
                           </label>
                           <textarea
                              id="message"
                              name="message"
                              rows="4"
                              className="index-contactUs-form-textarea"
                              placeholder="Write your message here..."
                              required
                           ></textarea>
                        </div>

                        <div className="index-contactUs-form-group">
                           <button type="submit" className="index-contactUs-form-button">
                              Send Message
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </section>
            <Footer />
         </div>
      </div>
   );
}

export default Index;

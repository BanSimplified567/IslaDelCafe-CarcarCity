import { useNavigate } from 'react-router-dom';
import IslaDelCafeCoffee from '../../assets/IslaDelCafeCoffee.jpg';
import IslaDelCafeKuyaKenn from '../../assets/IslaDelCafeKuyaKenn.jpg';
import IslaDelCafeShop from '../../assets/IslaDelCafeShop.jpg';
import IslaDelCafeAteGail from '../../assets/IslaDelCafeAteGail.jpg';
import Footer from '../../components/Footer';

import '../../style/AboutUs.css'; // Create this CSS file

function AboutUs() {
   const navigate = useNavigate();

   return (
      <div className="about-us-container">
         {/* Hero Section */}
         <section className="about-us-hero">
            <dv className="about-us-hero-content">
               <h1 className="about-us-title">
                  ABOUT <span>ISLA DEL CAFE</span>
               </h1>
               <p className="about-us-subtitle">
                  Your tropical coffee escape in the Heritage City of the South.
               </p>
            </dv>
         </section>

         {/* Our Story Section */}
         <section className="about-us-story">
            <div className="about-us-story-content">
               <div className="about-us-story-text">
                  <h2 className="about-us-section-title">Our Story</h2>
                  <p className="about-us-text">
                     Founded in 2020, Isla Del Cafe began as a dream to create a tropical coffee
                     sanctuary in the heart of Carcar City. Our name, meaning "Coffee Island,"
                     reflects our vision to be an oasis of exceptional coffee and warm hospitality.
                  </p>
                  <p className="about-us-text">
                     What started as a small kiosk has grown into a beloved local destination where
                     coffee lovers gather to enjoy handcrafted beverages and delicious snacks in a
                     relaxing atmosphere that celebrates our Filipino heritage.
                  </p>
               </div>
               <div className="about-us-story-image">
                  <img src={IslaDelCafeShop} alt="Isla Del Cafe Shop" />
               </div>
            </div>
         </section>

         {/* Our Mission Section */}
         <section className="about-us-mission">
            <div className="about-us-mission-content">
               <div className="about-us-mission-image">
                  <img src={IslaDelCafeCoffee} alt="Isla Del Cafe Coffee" />
               </div>
               <div className="about-us-mission-text">
                  <h2 className="about-us-section-title">Our Mission</h2>
                  <p className="about-us-text">
                     At Isla Del Cafe, our mission is to serve exceptional coffee experiences that
                     bring people together. We are committed to:
                  </p>
                  <ul className="about-us-list">
                     <li>Sourcing the highest quality coffee beans from sustainable producers</li>
                     <li>Creating a warm, welcoming space for our community</li>
                     <li>Supporting local suppliers and celebrating Filipino culture</li>
                     <li>Providing outstanding service that makes every customer feel at home</li>
                  </ul>
               </div>
            </div>
         </section>

         {/* Meet The Team Section */}
         <section className="about-us-team">
            <h2 className="about-us-section-title centered">Meet Our Team</h2>
            <div className="about-us-team-grid">
               <div className="about-us-team-member">
                  <div className="about-us-team-image">
                     <img src={IslaDelCafeAteGail} alt="Miss Gail Labasan - Owner" />
                  </div>
                  <h3 className="about-us-team-name">Miss Gail Labasan</h3>
                  <p className="about-us-team-role">Founder & Owner</p>
                  <p className="about-us-team-bio">
                     With a passion for coffee and hospitality, Gail Labasan created Isla Del Cafe to
                     share her love for quality beverages and Filipino culture with the community of
                     Carcar City.
                  </p>
               </div>
               <div className="about-us-team-member">
                  <div className="about-us-team-image">
                     <img src={IslaDelCafeKuyaKenn} alt="Isla Del Cafe Team" />
                  </div>
                  <h3 className="about-us-team-name">Our Baristas</h3>
                  <p className="about-us-team-role">Coffee Specialists</p>
                  <p className="about-us-team-bio">
                     Our skilled team of baristas is dedicated to crafting the perfect cup every
                     time. Each member brings their unique talents and passion to create an
                     exceptional coffee experience.
                  </p>
               </div>
            </div>
         </section>

         {/* Values Section */}
         <section className="about-us-values">
            <h2 className="about-us-section-title centered">Our Values</h2>
            <div className="about-us-values-grid">
               <div className="about-us-value-card">
                  <div className="about-us-value-icon">☕</div>
                  <h3 className="about-us-value-title">Quality</h3>
                  <p className="about-us-value-text">
                     We never compromise on the quality of our ingredients or our products.
                  </p>
               </div>
               <div className="about-us-value-card">
                  <div className="about-us-value-icon">🌿</div>
                  <h3 className="about-us-value-title">Sustainability</h3>
                  <p className="about-us-value-text">
                     We're committed to environmentally friendly practices and supporting
                     sustainable coffee farming.
                  </p>
               </div>
               <div className="about-us-value-card">
                  <div className="about-us-value-icon">🏝️</div>
                  <h3 className="about-us-value-title">Community</h3>
                  <p className="about-us-value-text">
                     We celebrate and support our local community and culture in everything we do.
                  </p>
               </div>
               <div className="about-us-value-card">
                  <div className="about-us-value-icon">😊</div>
                  <h3 className="about-us-value-title">Hospitality</h3>
                  <p className="about-us-value-text">
                     We treat every customer like family and provide a warm, welcoming experience.
                  </p>
               </div>
            </div>
         </section>

         {/* Visit Us CTA Section */}
         <section className="about-us-cta">
            <div className="about-us-cta-content">
               <h2 className="about-us-cta-title">Come Visit Us</h2>
               <p className="about-us-cta-text">
                  Experience the warm hospitality and exceptional coffee at Isla Del Cafe. We're
                  open daily from 11:00 AM to 8:00 PM.
               </p>
               <div className="about-us-cta-buttons">
                  <button className="about-us-cta-button" onClick={() => navigate('/menu')}>
                     View Our Menu
                  </button>
                  <button
                     className="about-us-cta-button secondary"
                     onClick={() => {
                        const contactSection = document.querySelector('.index-contactUs-container');
                        if (contactSection) {
                           contactSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                           navigate('/');
                        }
                     }}
                  >
                     Contact Us
                  </button>
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
}

export default AboutUs;

import '@style/Footer.css';
import { Clock, Coffee, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
   const currentYear = new Date().getFullYear();

   return (
      <footer>
         <div className="footer-container">
            <div className="footer-grid">
               <div className="footer-section">
                  <div className="flex items-center">
                     <Coffee className="icon" />
                     <h3>Isla Del Cafe</h3>
                  </div>
                  <p>
                     Welcome to Isla del Café - your tropical coffee escape in the Heritage City of
                     the South🌴🐚🍃
                  </p>
                  <div className="footer-icons">
                     <a href="https://www.facebook.com/profile.php?id=61571726873185">
                        <Facebook className="icon" />
                     </a>
                     <a href="https://www.instagram.com/isladelcafe.carcar">
                        <Instagram className="icon" />
                     </a>
                  </div>
               </div>

               <div className="footer-section">
                  <h3>Recent Blog</h3>
                  <ul>
                     <li>
                        <a href="#">Isla Del Cafe Grand Opening CarCar City - Feb 20, 2025</a>
                     </li>
                  </ul>
               </div>

               <div className="footer-section footer-links">
                  <h3>Our Services</h3>
                  <ul>
                     <li>
                        <a href="#">Specialty Coffee</a>
                     </li>
                     <li>
                        <a href="#">Fresh Pastries</a>
                     </li>
                     <li>
                        <a href="#">Private Events</a>
                     </li>
                     <li>
                        <a href="#">Custom Blends</a>
                     </li>
                  </ul>
               </div>

               <div className="footer-section footer-contact">
                  <h3>Have a Question?</h3>
                  <ul>
                     <li>
                        <MapPin />
                        <span>Isla Del Cafe, Cogon, Poblacion 1, Carcar City</span>
                     </li>
                     <li>
                        <Phone />
                        <a href="tel:09751883932">09751883932</a>
                     </li>
                     <li>
                        <Mail />
                        <a
                           href="mailto:isladelcafecarcar@gmail.com
"
                        >
                           isladelcafecarcar@gmail.com
                        </a>
                     </li>
                     <li>
                        <Clock />
                        <div>
                           <p>Mon-Fri: 11:00 AM - 8:00 PM</p>
                           <p>Sat-Sun: 8:00 AM - 9:00 PM</p>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="footer-bottom">
               <p>&copy; {currentYear} Isla Del Cafe. All Rights Reserved.</p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;

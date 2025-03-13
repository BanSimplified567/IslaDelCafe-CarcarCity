import { Clock, Coffee, Mail, MapPin, Phone } from 'lucide-react';
import '../style/Footer.css';

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
                     Welcome to Isla Del Cafe, where passion meets perfection in every cup. Since
                     2020, we've been serving premium coffee sourced from local farms, handcrafted
                     with care by our skilled baristas.
                  </p>
                  <div className="footer-icons">
                     <a href="#">[FB ICON]</a>
                     <a href="#">[TWITTER ICON]</a>
                     <a href="#">[INSTAGRAM ICON]</a>
                  </div>
               </div>

               <div className="footer-section">
                  <h3>Recent Blog</h3>
                  <ul>
                     <li>
                        <a href="#">The Art of Coffee Cupping - Jan 15, 2025</a>
                     </li>
                     <li>
                        <a href="#">Local Coffee Farmers: Our Partners - Dec 28, 2024</a>
                     </li>
                     <li>
                        <a href="#">Seasonal Coffee Specials - Dec 10, 2024</a>
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
                        <a href="#">Coffee Workshops</a>
                     </li>
                     <li>
                        <a href="#">Custom Blends</a>
                     </li>
                     <li>
                        <a href="#">Catering Services</a>
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
                        <a href="tel:09562856829">09562856829</a>
                     </li>
                     <li>
                        <Mail />
                        <a href="mailto:isladelcafecarcar@gmail.com">isladelcafecarcar@gmail.com</a>
                     </li>
                     <li>
                        <Clock />
                        <div>
                           <p>Mon-Fri: 7:00 AM - 8:00 PM</p>
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

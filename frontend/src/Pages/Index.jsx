import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import IslaDelCafe from '../assets/IslaDelCafe.png';
import Footer from '../components/Footer';
import NavLink from '../components/Navbar';
import '../style/index.css';

function Index() {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <>
         <header className="index-header">
            <div className="index-IslaDelCafe-Logo-title">IslaDelCafe</div>

            {/* Mobile Menu Toggle */}
            <button className="index-mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
               {menuOpen ? (
                  <X className="index-mobile-menu-icon" />
               ) : (
                  <Menu className="index-mobile-menu-icon" />
               )}
            </button>

            {/* Navigation */}
            <nav className={`index-nav ${menuOpen ? 'index-nav-open' : 'index-nav-closed'}`}>
               <ul className="index-nav-list">
                  <li className="index-nav-list-item">
                     <NavLink to="/index">Home</NavLink>
                  </li>
                  <li className="index-nav-list-item">
                     <NavLink to="/menu">Menu</NavLink>
                  </li>
                  <li className="index-nav-list-item">
                     <NavLink to="/about">About Us</NavLink>
                  </li>
                  <li className="index-nav-list-item">
                     <NavLink to="/contact">Contact Us</NavLink>
                  </li>
               </ul>
            </nav>

            {/* Search & Sign In */}
            <div className="index-search-signin">
               <div className="index-search-icon">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="index-search-svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                     />
                  </svg>
               </div>
               <button className="index-signin-button">Sign In</button>
            </div>
         </header>
         <section className="index-container">
            <div className="index-container-title">
               <h1>
                  Welcome To 
               </h1>
            </div>
         </section>
         <section
            className="index-hero-section"
         >
            <div className="index-hero-content-left">
               <h1 className="index-IslaDelCafe-Title">IslaDelCafe</h1>
               <p className="index-hero-paragraph">
                  Bean Scene is a coffee shop that provides you with quality coffee that helps boost
                  your productivity and helps build your mood. Having a cup of coffee is good, but
                  having a cup of real coffee is greater. There is no doubt that you will enjoy this
                  coffee more than others you have ever tasted.
               </p>
               <div className="index-hero-buttons">
                  <button className="index-order-button">Order Now</button>
                  <button className="index-learn-button">Learn More</button>
               </div>
            </div>
            <div className="index-hero-content-right">
               <img src={IslaDelCafe} alt="IslaDelCafe" className="index-hero-image" />
            </div>
         </section>
         <Footer />
      </>
   );
}

export default Index;

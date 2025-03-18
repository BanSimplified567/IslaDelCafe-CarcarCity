import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '@style/NavbarMain.css';

function NavbarMain() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(true);
   const [isScrolled, setIsScrolled] = useState(false);

   // Handle scroll event to change header transparency
   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 50) {
            setIsScrolled(true);
         } else {
            setIsScrolled(false);
         }
      };

      window.addEventListener('scroll', handleScroll);

      // Clean up event listener on component unmount
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <>
         <header className={`index-header ${isScrolled ? 'index-header-scrolled' : ''}`}>
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

            {/* Search & Sign In / User Account Section */}
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

               {isLoggedIn ? (
                  <div className="index-user-actions">
                     <NavLink to="/cart" className="index-icon-button">
                        <ShoppingCart className="index-icon" />
                     </NavLink>
                     <NavLink to="/" className="index-icon-button">
                        <User className="index-icon" />
                     </NavLink>
                  </div>
               ) : (
                  <button className="index-signin-button">Sign In</button>
               )}
            </div>
         </header>
      </>
   );
}

export default NavbarMain;

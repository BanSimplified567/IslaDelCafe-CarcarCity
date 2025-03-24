import '@style/NavbarMain.css';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavbarMain() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);

   // Handle scroll event to change header appearance when scrolled
   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 50) {
            setIsScrolled(true);
         } else {
            setIsScrolled(false);
         }
      };

      // Initial check
      handleScroll();

      // Add event listener
      window.addEventListener('scroll', handleScroll);

      // Clean up event listener on component unmount
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   // Close mobile menu when clicking a link
   const handleNavLinkClick = () => {
      if (menuOpen) {
         setMenuOpen(false);
      }
   };

   return (
      <header className={`index-header ${isScrolled ? 'index-header-scrolled' : ''}`}>
         <div className="index-IslaDelCafe-Logo-title">IslaDelCafe</div>

         {/* Navigation */}
         <nav className={`index-nav ${menuOpen ? 'index-nav-open' : 'index-nav-closed'}`}>
            <ul className="index-nav-list">
               <li className="index-nav-list-item">
                  <NavLink
                     to="/index"
                     onClick={handleNavLinkClick}
                     className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                     Home
                  </NavLink>
               </li>
               <li className="index-nav-list-item">
                  <NavLink
                     to="/menu"
                     onClick={handleNavLinkClick}
                     className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                     Menu
                  </NavLink>
               </li>
               <li className="index-nav-list-item">
                  <NavLink
                     to="/about"
                     onClick={handleNavLinkClick}
                     className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                     About Us
                  </NavLink>
               </li>
               <li className="index-nav-list-item">
                  <NavLink
                     to="/contact"
                     onClick={handleNavLinkClick}
                     className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                     Contact Us
                  </NavLink>
               </li>
            </ul>
         </nav>

         {/* Search & Sign In / User Account Section */}
         <div className="index-search-signin">
            {isLoggedIn ? (
               <div className="index-user-actions">
                  <NavLink to="/cart" className="index-icon-button">
                     <ShoppingCart className="index-icon" />
                  </NavLink>
                  <NavLink to="/profile" className="index-icon-button">
                     <User className="index-icon" />
                  </NavLink>
               </div>
            ) : (
               <NavLink to="/" className="index-icon-button index-signin-button">
                  SIGN IN
               </NavLink>
            )}
         </div>

         {/* Mobile Menu Toggle - Keep at the end for proper order in mobile view */}
         <button
            className="index-mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
         >
            {menuOpen ? (
               <X className="index-mobile-menu-icon" />
            ) : (
               <Menu className="index-mobile-menu-icon" />
            )}
         </button>
      </header>
   );
}

export default NavbarMain;

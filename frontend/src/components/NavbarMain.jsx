import { useAuth } from '@context/AuthContext'; // Adjust the import path
import '@style/NavbarMain.css';
import { LogOut, Menu, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavbarMain() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const { isAuthenticated, logoutUser } = useAuth();
   const navigate = useNavigate(); // ✅ For programmatic navigation

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleNavLinkClick = () => {
      if (menuOpen) setMenuOpen(false);
   };

   const handleLogout = () => {
      logoutUser(); // Update to use logoutUser instead of logout
      navigate('/'); // Redirect to login page
   };

   return (
      <header className={`index-header ${isScrolled ? 'index-header-scrolled' : ''}`}>
         <div className="index-IslaDelCafe-Logo-title">IslaDelCafe</div>

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

         <div className="index-search-signin">
            {isAuthenticated ? (
               <div className="index-user-actions">
                  <NavLink to="/cart" className="index-icon-button" title="Shopping Cart">
                     <ShoppingCart size={20} />
                     <span className="sr-only">Cart</span>
                  </NavLink>
                  <NavLink to="/profile" className="index-icon-button" title="User Profile">
                     <User size={20} />
                     <span className="sr-only">Profile</span>
                  </NavLink>
                  <button
                     onClick={handleLogout}
                     className="index-icon-button"
                     title="Logout"
                     aria-label="Logout"
                  >
                     <LogOut size={20} />
                     <span className="sr-only">Logout</span>
                  </button>
               </div>
            ) : (
               <NavLink to="/" className="index-icon-button index-signin-button" title="Sign In">
                  SIGN IN
               </NavLink>
            )}
         </div>

         <button
            className="index-mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
         >
            {menuOpen ? <X /> : <Menu />}
         </button>
      </header>
   );
}

export default NavbarMain;

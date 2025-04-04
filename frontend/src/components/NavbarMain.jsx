import '@style/NavbarMain.css';
import axios from 'axios';
import { LogOut, Menu, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavbarMain() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   useEffect(() => {
      const checkAuth = async () => {
         // Fix: Safely get and parse session storage item
         const storedUserData = sessionStorage.getItem('user');
         const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

         if (storedUser?.email) {
            try {
               const response = await axios.get('/api/account.php?action=check-auth');

               if (response.data.success && response.data.user.email === storedUser.email) {
                  setIsAuthenticated(true);
               } else {
                  setIsAuthenticated(false);
                  sessionStorage.removeItem('user');
               }
            } catch (error) {
               console.error('Auth check failed:', error);
               setIsAuthenticated(false);
            }
         } else {
            setIsAuthenticated(false);
         }
      };

      checkAuth();
   }, []);

   const handleNavLinkClick = () => {
      if (menuOpen) setMenuOpen(false);
   };

   const handleLogout = async () => {
      try {
         await axios.post('/api/account.php?action=logout', {}, { withCredentials: true });
         sessionStorage.removeItem('user');
         setIsAuthenticated(false);
         navigate('/');
      } catch (error) {
         console.error('Logout failed:', error);
      }
   };

   return (
      <header className={`index-header ${isScrolled ? 'index-header-scrolled' : ''}`}>
         <div className="index-IslaDelCafe-Logo-title">IslaDelCafe</div>

         <nav className={`index-nav ${menuOpen ? 'index-nav-open' : 'index-nav-closed'}`}>
            <ul className="index-nav-list">
               {['/index', '/menu', '/about', '/contact'].map((path, i) => (
                  <li key={i} className="index-nav-list-item">
                     <NavLink
                        to={path}
                        onClick={handleNavLinkClick}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                     >
                        {path === '/index'
                           ? 'Home'
                           : path === '/menu'
                           ? 'Menu'
                           : path === '/about'
                           ? 'About Us'
                           : 'Contact Us'}
                     </NavLink>
                  </li>
               ))}
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

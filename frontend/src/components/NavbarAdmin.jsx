import { useAuth } from '@context/AuthContext';
import '@style/NavbarAdmin.css';
import {
   BarChart3,
   Boxes,
   ChevronLeft,
   Coffee,
   Home,
   LogOut,
   Package,
   Settings,
   ShoppingBag,
   Users,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function NavbarAdmin({ isCollapsed, setIsCollapsed }) {
   const { admin, logoutAdmin } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      Swal.fire({
         title: 'Logout Confirmation',
         text: 'Are you sure you want to logout?',
         icon: 'question',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Yes, logout',
      }).then((result) => {
         if (result.isConfirmed) {
            logoutAdmin();
            navigate('/loginadmin');
         }
      });
   };

   return (
      <nav className={`navbaradmin ${isCollapsed ? 'navbaradmin-collapsed' : ''}`}>
         <div className="navbaradmin-brand">
            <div className="icon">
               <Coffee size={24} />
            </div>
            <h2>Isla Del Cafe</h2>
            <button className="navbaradmin-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
               <ChevronLeft size={16} />
            </button>
         </div>

         <div className="navbaradmin-menu">
            <ul>
               <li data-tooltip="Dashboard">
                  <NavLink to="/dashboard" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <Home size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
                  </NavLink>
               </li>

               <li data-tooltip="Orders">
                  <NavLink to="/orders" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <ShoppingBag size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Orders</span>
                  </NavLink>
               </li>

               <li data-tooltip="Products">
                  <NavLink to="/products" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <Package size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Products</span>
                  </NavLink>
               </li>

               <li data-tooltip="Inventory">
                  <NavLink to="/inventory" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <Boxes size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Inventory</span>
                  </NavLink>
               </li>

               <li data-tooltip="Users">
                  <NavLink to="/users" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <Users size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Users</span>
                  </NavLink>
               </li>

               <li data-tooltip="Analytics">
                  <NavLink to="/analytics" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <BarChart3 size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Analytics</span>
                  </NavLink>
               </li>

               <li data-tooltip="Settings">
                  <NavLink to="/settings" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <Settings size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Settings</span>
                  </NavLink>
               </li>

               {/* Optional: Admin Profile */}
               {/* <li data-tooltip="My Account">
                  <NavLink to="/admin-profile" className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <UserCog size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>My Account</span>
                  </NavLink>
               </li> */}

               <li data-tooltip="Logout">
                  <button onClick={handleLogout} className="navbaradmin-item">
                     <span className="navbaradmin-icon-wrapper">
                        <LogOut size={20} />
                     </span>
                     <span className={`nav-label ${isCollapsed ? 'hidden' : ''}`}>Logout</span>
                  </button>
               </li>
            </ul>
         </div>
      </nav>
   );
}

export default NavbarAdmin;

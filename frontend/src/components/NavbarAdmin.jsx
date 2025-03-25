import IslaDelCafe from '@public/IslaDelCafeLogoText.png'; // Adjust the path as needed
import '@style/NavbarAdmin.css';
import {
   Activity,
   LogOut,
   MessageSquare,
   Package,
   Settings,
   ShoppingCart,
   Users,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const NavItem = ({ icon, label, to, isActive, collapsed }) => {
   return (
      <li data-tooltip={collapsed ? label : ''}>
         <NavLink to={to} className={`navbaradmin-item ${isActive ? 'active' : ''}`}>
            <div className="navbaradmin-icon-wrapper">{icon}</div>
            <span className={`nav-label ${collapsed ? 'hidden' : ''}`}>{label}</span>
         </NavLink>
      </li>
   );
};

const NavbarAdmins = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const location = useLocation();
   const [collapsed, setCollapsed] = useState(false);

   const toggleSidebar = () => {
      setCollapsed(!collapsed);
      setIsSidebarOpen(!isSidebarOpen);
   };

   const navItems = [
      { icon: <Activity size={20} />, label: 'Dashboard', to: '/dashboard' },
      { icon: <Package size={20} />, label: 'Products', to: '/products' },
      { icon: <ShoppingCart size={20} />, label: 'Orders', to: '/orders' },
      { icon: <Package size={20} />, label: 'Inventory', to: '/inventory' },
      { icon: <Users size={20} />, label: 'Employees', to: '/employees' },
      { icon: <MessageSquare size={20} />, label: 'Messages', to: '/messages' },
      { icon: <Settings size={20} />, label: 'Admin', to: '/admin' },
      { icon: <Users size={20} />, label: 'Users', to: '/users' },
      { icon: <LogOut size={20} />, label: 'Logout', to: '/loginadmin' },
   ];

   return (
      <div className="admin-layout">
         <aside className={`navbaradmin ${!isSidebarOpen ? 'navbaradmin-collapsed' : ''}`}>
            <div className="navbaradmin-brand">
               <div className="icon">
                  <img src={IslaDelCafe} alt="IslaDelCafe" />
               </div>
               <h2>
                  <span>IslaDelCafe</span>
               </h2>
            </div>
            <button className="navbaradmin-toggle" onClick={toggleSidebar}>
               {isSidebarOpen ? '←' : '→'}
            </button>
            <nav className="navbaradmin-menu">
               <ul>
                  {navItems.map((item) => (
                     <NavItem
                        key={item.to}
                        icon={item.icon}
                        label={item.label}
                        to={item.to}
                        isActive={location.pathname === item.to}
                        collapsed={!isSidebarOpen}
                     />
                  ))}
               </ul>
            </nav>
         </aside>
         {/* Main Content Area */}
         <div className={`content ${collapsed ? 'content-expanded' : ''}`}>
            <Outlet />
         </div>
      </div>
   );
};

export default NavbarAdmins;

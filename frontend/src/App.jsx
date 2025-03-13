import { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';

// Lazy load pages for code splitting
// User Pages
const Login = lazy(() => import('./components/form/Login.jsx'));
const Index = lazy(() => import('./Pages/user/Index.jsx'));
const About = lazy(() => import('./Pages/user/About.jsx'));
const Contact = lazy(() => import('./Pages/user/Contact.jsx'));
const Cart = lazy(() => import('./Pages/user/Cart.jsx'));
const ProductDetail = lazy(() => import('./Pages/user/ProductDetails.jsx'));
const Checkout = lazy(() => import('./Pages/user/Checkout.jsx'));
const Profile = lazy(() => import('./Pages/user/Profile.jsx'));

// Admin Pages
const LoginAdmin = lazy(() => import('./components/form/LogInAdmin.jsx'));
const Admin = lazy(() => import('./Pages/admin/Admin.jsx'));
const Dashboard = lazy(() => import('./Pages/admin/Dashboard.jsx'));
const Menu = lazy(() => import('./Pages/user/Menu.jsx'));
const Employees = lazy(() => import('./Pages/admin/Employees.jsx'));
const Inventory = lazy(() => import('./Pages/admin/Inventory.jsx'));
const Messages = lazy(() => import('./Pages/admin/Messages.jsx'));
const Orders = lazy(() => import('./Pages/admin/Orders.jsx'));
const Products = lazy(() => import('./Pages/admin/Products.jsx'));
const Users = lazy(() => import('./Pages/admin/Users.jsx'));

// Lazy load navbar components
const NavbarMain = lazy(() => import('./components/NavbarMain'));
const NavbarAdmin = lazy(() => import('./components/NavbarAdmin.jsx'));

// Loading component for better user experience
const PageLoader = () => (
   <div className="flex items-center justify-center h-screen bg-amber-50">
      <div className="text-center">
         <div className="inline-block w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
         <p className="mt-2 text-amber-800 font-medium">Loading...</p>
      </div>
   </div>
);

// Hamburger menu icon component
const MenuIcon = () => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
   </svg>
);

// Root layout with Navbar and dynamic Outlet for rendering children
const RootLayout = () => {
   const location = useLocation();
   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   // Check if current route is a login page
   const isLoginPage = location.pathname === '/' || location.pathname === '/loginadmin';

   // Check if current route is an admin page
   const isAdminPage =
      location.pathname.startsWith('/dashboard') ||
      location.pathname.startsWith('/admin') ||
      location.pathname.startsWith('/employees') ||
      location.pathname.startsWith('/inventory') ||
      location.pathname.startsWith('/messages') ||
      location.pathname.startsWith('/orders') ||
      location.pathname.startsWith('/products') ||
      location.pathname.startsWith('/users');

   // Responsive handler
   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 768);
      };

      // Initial check
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Close mobile nav when changing routes
      setIsMobileNavOpen(false);

      // Cleanup on unmount
      return () => window.removeEventListener('resize', handleResize);
   }, [location.pathname]);

   // If it's a login page, don't show any navbar
   if (isLoginPage) {
      return (
         <div className="login-page">
            <Suspense fallback={<PageLoader />}>
               <Outlet />
            </Suspense>
         </div>
      );
   }

   // If it's an admin page, we'll render Outlet which will show the AdminLayout
   // AdminLayout has its own Outlet for showing the specific admin page
   if (isAdminPage) {
      return (
         <Suspense fallback={<PageLoader />}>
            <Outlet />
         </Suspense>
      );
   }

   // For regular pages
   return (
      <main>

         {/* Navbar for regular pages */}
         <div className={`navbar-container ${isMobileNavOpen ? 'open' : ''}`}>
            <Suspense fallback={<PageLoader />}>
               <NavbarMain />
            </Suspense>
         </div>

         {/* Main content area */}
         <div className={`content-container ${isMobile && !isMobileNavOpen ? 'full-width' : ''}`}>
            <Suspense fallback={<PageLoader />}>
               <Outlet />
            </Suspense>
         </div>
      </main>
   );
};

// Admin layout with NavbarAdmin and Outlet for admin pages
const AdminLayout = () => {
   return (
      <Suspense fallback={<PageLoader />}>
         <NavbarAdmin />
      </Suspense>
   );
};

// Define routes
export const router = createBrowserRouter([
   {
      element: <RootLayout />,
      children: [
         // Auth routes
         { path: '/', element: <Login /> },
         { path: '/loginadmin', element: <LoginAdmin /> },

         // Regular pages
         { path: '/index', element: <Index /> },
         { path: '/menu', element: <Menu /> },
         { path: '/about', element: <About /> },
         { path: '/contact', element: <Contact /> },
         { path: '/checkout', element: <Checkout /> },
         { path: '/productdetails', element: <ProductDetail /> },
         { path: '/profile', element: <Profile /> },
         // Admin routes nested under AdminLayout
         {
            element: <AdminLayout />,
            children: [
               { path: '/dashboard', element: <Dashboard /> },
               { path: '/admin', element: <Admin /> },
               { path: '/employees', element: <Employees /> },
               { path: '/inventory', element: <Inventory /> },
               { path: '/messages', element: <Messages /> },
               { path: '/orders', element: <Orders /> },
               { path: '/products', element: <Products /> },
               { path: '/users', element: <Users /> },
            ],
         },
      ],
   },
]);

// Main App component
function App() {
   return <RouterProvider router={router} />;
}

export default App;

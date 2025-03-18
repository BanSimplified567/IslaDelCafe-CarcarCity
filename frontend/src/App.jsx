import { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';

// Lazy load pages for code splitting
// User Pages
const Login = lazy(() => import('@pages/user/Login'));
const Index = lazy(() => import('@pages/user/Index'));
const About = lazy(() => import('@pages/user/About'));
const Contact = lazy(() => import('@pages/user/Contact'));
const Cart = lazy(() => import('@pages/user/Cart'));
const ProductDetails = lazy(() => import('@pages/user/ProductDetails'));
const Checkout = lazy(() => import('@pages/user/Checkout'));
const Profile = lazy(() => import('@pages/user/Profile'));
const NotFound = lazy(() => import('@pages/Notfound')); // Ensure this path is correct

// Admin Pages
const LoginAdmin = lazy(() => import('@pages/admin/LogInAdmin'));
const Admin = lazy(() => import('@pages/admin/Admin'));
const Dashboard = lazy(() => import('@pages/admin/Dashboard'));
const Menu = lazy(() => import('@pages/user/Menu'));
const Employees = lazy(() => import('@pages/admin/Employees'));
const Inventory = lazy(() => import('@pages/admin/Inventory'));
const Messages = lazy(() => import('@pages/admin/Messages'));
const Orders = lazy(() => import('@pages/admin/Orders'));
const Products = lazy(() => import('@pages/admin/Products'));
const Users = lazy(() => import('@pages/admin/Users'));

import { CartProvider } from '@pages/user/CartContext';

// Lazy load navbar components
const NavbarMain = lazy(() => import('@components/NavbarMain'));
const NavbarAdmin = lazy(() => import('@components/NavbarAdmin'));

// Loading component for better user experience
const PageLoader = () => (
   <div className="flex items-center justify-center h-screen bg-amber-50">
      <div className="text-center">
         <div className="inline-block w-8 h-8 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
         <p className="mt-2 text-amber-800 font-medium">Loading...</p>
      </div>
   </div>
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
         <Outlet />
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
         { path: '/product/:id', element: <ProductDetails /> }, // Updated route with parameter
         { path: '/profile', element: <Profile /> },
         { path: '/cart', element: <Cart /> },

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

         // 404 - This must be the last route
         { path: '*', element: <NotFound /> },
      ],
   },
]);

// Main App component
function App() {
   return (
      <CartProvider>
         <RouterProvider router={router} />
      </CartProvider>
   );
}

export default App;

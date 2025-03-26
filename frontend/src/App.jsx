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
const OrderConfirmation = lazy(() => import('@pages/user/OrderConfirmation'));

import { CartProvider } from '@pages/user/CartContext';
const RegisterAdmin = lazy(() => import('@pages/admin/RegisterAdmin'));
const RegisterUsers = lazy(() => import('@pages/user/RegisterUsers'));

// Lazy load navbar components
const NavbarMain = lazy(() => import('@components/NavbarMain'));
const NavbarAdmin = lazy(() => import('@components/NavbarAdmin'));

// Loading component for better user experience
const PageLoader = () => (
   <div className="flex items-center justify-center h-screen bg-amber-50">
      <div className="text-center">
         {/* Coffee cup icon with animated steam */}
         <div className="relative inline-block">
            {/* Cup */}
            <div className="w-16 h-16 bg-amber-800 rounded-b-full border-t-4 border-amber-700"></div>
            {/* Handle */}
            <div className="absolute right-[-12px] top-4 w-4 h-8 border-4 border-amber-700 rounded-full"></div>
            {/* Steam */}
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 flex flex-col gap-1">
               <div className="w-1 h-4 bg-amber-300 rounded-full animate-steam"></div>
               <div className="w-1 h-4 bg-amber-300 rounded-full animate-steam delay-200"></div>
               <div className="w-1 h-4 bg-amber-300 rounded-full animate-steam delay-400"></div>
            </div>
         </div>

         <p className="mt-4 text-amber-800 font-semibold text-5xl tracking-wide">
            Isla Del Cafe...
         </p>

         {/* Tailwind custom animation */}
         <style>{`
        @keyframes rise {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }

        .animate-steam {
          animation: rise 1.2s infinite ease-in-out;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
      </div>
   </div>
);
const RootLayout = () => {
   const location = useLocation();
   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   // ✅ Include registeradmin as a login page
   const isLoginPage =
      location.pathname === '/' ||
      location.pathname === '/loginadmin' ||
      location.pathname === '/registeradmin' ||
      location.pathname === '/registerusers';

   const isAdminPage =
      location.pathname.startsWith('/admin') ||
      location.pathname.startsWith('/dashboard') ||
      location.pathname.startsWith('/employees') ||
      location.pathname.startsWith('/inventory') ||
      location.pathname.startsWith('/messages') ||
      location.pathname.startsWith('/orders') ||
      location.pathname.startsWith('/products') ||
      location.pathname.startsWith('/users');

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 768);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      setIsMobileNavOpen(false);

      return () => window.removeEventListener('resize', handleResize);
   }, [location.pathname]);

   if (isLoginPage) {
      return (
         <div className="login-page">
            <Outlet />
         </div>
      );
   }

   return (
      <main>
         {!isAdminPage && (
            <div className={`navbar-container ${isMobileNavOpen ? 'open' : ''}`}>
               <NavbarMain />
            </div>
         )}

         <div className={`content-container ${isMobile && !isMobileNavOpen ? 'full-width' : ''}`}>
            <Outlet />
         </div>
      </main>
   );
};

// Admin layout with NavbarAdmin and Outlet for admin pages
const AdminLayout = () => {
   return (
      <>
         <NavbarAdmin />
      </>
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
         { path: '/registeradmin', element: <RegisterAdmin /> },
         { path: '/registerusers', element: <RegisterUsers /> },
         // Regular pages
         { path: '/index', element: <Index /> },
         { path: '/menu', element: <Menu /> },
         { path: '/about', element: <About /> },
         { path: '/contact', element: <Contact /> },
         { path: '/checkout', element: <Checkout /> },
         { path: '/order-confirmation', element: <OrderConfirmation /> },
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
      <Suspense fallback={<PageLoader />}>
         <CartProvider>
            <RouterProvider router={router}></RouterProvider>
         </CartProvider>
      </Suspense>
   );
}

export default App;

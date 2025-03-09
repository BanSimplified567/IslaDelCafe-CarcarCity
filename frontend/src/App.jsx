import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// Lazy load pages for code splitting
const Login = lazy(() => import('./Pages/Login'));
const LoginAdmin = lazy(() => import('./Pages/LogInAdmin'));
const Index = lazy(() => import('./Pages/Index.jsx'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Menu = lazy(() => import('./Pages/Menu'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));

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
   return (

         <main>
            {/* Apply Suspense at the layout level for child routes */}
            <Suspense fallback={<PageLoader />}>
               <Outlet />
            </Suspense>
         </main>
   );
};

// Define routes
export const router = createBrowserRouter([
   {
      element: <RootLayout />,
      children: [
         { path: '/', element: <Login /> },
         { path: '/loginadmin', element: <LoginAdmin /> },
         { path: '/index', element: <Index /> },
         { path: '/dashboard', element: <Dashboard /> },
         { path: '/menu', element: <Menu /> },
         { path: '/about', element: <About /> },
         { path: '/contact', element: <Contact /> },
      ],
   },
]);

// Main App component
function App() {
   return <RouterProvider router={router} />;
}

export default App;

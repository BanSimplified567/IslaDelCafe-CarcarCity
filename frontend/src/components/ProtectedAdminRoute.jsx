import { useAdminAuth } from '@context/AdminAuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ProtectedAdminRoute({ children, requiredRole = null }) {
   const { admin, loading, isAuthenticated, hasRole } = useAdminAuth();
   const navigate = useNavigate();

   useEffect(() => {
      const checkAuth = async () => {
         if (!loading) {
            if (!isAuthenticated()) {
               // Not logged in
               await Swal.fire({
                  icon: 'warning',
                  title: 'Authentication Required',
                  text: 'Please log in to access this page',
                  confirmButtonColor: '#6f4e37',
               });
               navigate('/loginadmin');
               return;
            }

            if (requiredRole && !hasRole(requiredRole)) {
               // Insufficient permissions
               await Swal.fire({
                  icon: 'error',
                  title: 'Access Denied',
                  text: 'You do not have permission to access this page',
                  confirmButtonColor: '#6f4e37',
               });
               navigate('/dashboard');
               return;
            }
         }
      };

      checkAuth();
   }, [loading, isAuthenticated, hasRole, navigate, requiredRole]);

   if (loading) {
      return (
         <div className="admin-loading">
            <div className="admin-loading-spinner"></div>
            <p>Loading...</p>
         </div>
      );
   }

   return children;
}

export default ProtectedAdminRoute;

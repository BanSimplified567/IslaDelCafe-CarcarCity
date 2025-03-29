import { useAuth } from '@context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export function ProtectedRoute({ children, requireAdmin = false }) {
   const { user, admin, isAuthenticated } = useAuth();
   const location = useLocation();

   if (!isAuthenticated) {
      Swal.fire({
         icon: 'warning',
         title: 'Authentication Required',
         text: 'Please log in to access this page',
         confirmButtonColor: '#6f4e37',
      });
      return (
         <Navigate to={requireAdmin ? '/loginadmin' : '/'} state={{ from: location }} replace />
      );
   }

   if (requireAdmin && !admin) {
      Swal.fire({
         icon: 'error',
         title: 'Access Denied',
         text: 'This page requires admin privileges',
         confirmButtonColor: '#6f4e37',
      });
      return <Navigate to="/" replace />;
   }

   return children;
}

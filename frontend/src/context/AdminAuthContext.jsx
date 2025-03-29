import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

// Create the context
const AdminAuthContext = createContext();

// Export the custom hook for convenience
export const useAdminAuth = () => {
   const context = useContext(AdminAuthContext);
   if (!context) {
      throw new Error('useAdminAuth must be used within an AdminAuthProvider');
   }
   return context;
};

// Provider component
export const AdminAuthProvider = ({ children }) => {
   const [admin, setAdmin] = useState(null);
   const [loading, setLoading] = useState(true);
   const [initialized, setInitialized] = useState(false);

   // Initialize admin state from localStorage
   useEffect(() => {
      const initializeAuth = () => {
         try {
            const storedAdmin = localStorage.getItem('admin');
            if (storedAdmin) {
               setAdmin(JSON.parse(storedAdmin));
            }
         } catch (error) {
            console.error('Error initializing admin auth:', error);
            localStorage.removeItem('admin');
         } finally {
            setLoading(false);
            setInitialized(true);
         }
      };

      initializeAuth();
   }, []);

   // Login function
   const loginAdmin = async (credentials) => {
      try {
         setLoading(true);
         const response = await axios.post('/api/logInAdmin.php', credentials);

         if (response.data.success) {
            const adminData = response.data.admin;
            setAdmin(adminData);
            localStorage.setItem('admin', JSON.stringify(adminData));

            return { success: true };
         } else {
            throw new Error(response.data.message);
         }
      } catch (error) {
         const errorMessage = error.response?.data?.message || error.message;
         throw new Error(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   // Logout function
   const logoutAdmin = async () => {
      try {
         setLoading(true);

         // Clear admin session
         setAdmin(null);
         localStorage.removeItem('admin');

         // Show success message
         await Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have been successfully logged out',
            timer: 1500,
            showConfirmButton: false,
         });
      } catch (error) {
         console.error('Logout error:', error);
         Swal.fire({
            icon: 'error',
            title: 'Logout Error',
            text: 'An error occurred during logout',
         });
      } finally {
         setLoading(false);
      }
   };

   // Check if admin is authenticated
   const isAuthenticated = () => {
      return !!admin;
   };

   // Check if admin has specific role
   const hasRole = (role) => {
      return admin?.role === role;
   };

   // Refresh admin session
   const refreshAdminSession = async () => {
      try {
         if (!admin) return;

         const response = await axios.get(`/api/admin.php?action=check-session&id=${admin.id}`);

         if (!response.data.success) {
            await logoutAdmin();
            throw new Error('Session expired');
         }

         // Update admin data if needed
         if (response.data.admin) {
            setAdmin(response.data.admin);
            localStorage.setItem('admin', JSON.stringify(response.data.admin));
         }
      } catch (error) {
         console.error('Session refresh error:', error);
         await logoutAdmin();
      }
   };

   return (
      <AdminAuthContext.Provider
         value={{
            admin,
            loading,
            initialized,
            loginAdmin,
            logoutAdmin,
            isAuthenticated,
            hasRole,
            refreshAdminSession,
         }}
      >
         {children}
      </AdminAuthContext.Provider>
   );
};

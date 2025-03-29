import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [admin, setAdmin] = useState(null);
   const [loading, setLoading] = useState(true);

   // Load user from localStorage on app init
   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedAdmin = localStorage.getItem('admin');

      if (storedUser) {
         setUser(JSON.parse(storedUser));
      }
      if (storedAdmin) {
         setAdmin(JSON.parse(storedAdmin));
      }

      setLoading(false);
   }, []);

   // Login handler for user
   const loginUser = (userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
   };

   // Login handler for admin
   const loginAdmin = (adminData) => {
      setAdmin(adminData);
      localStorage.setItem('admin', JSON.stringify(adminData));
   };

   // Logout handler for user
   const logoutUser = () => {
      setUser(null);
      localStorage.removeItem('user');
   };

   // Logout handler for admin
   const logoutAdmin = () => {
      setAdmin(null);
      localStorage.removeItem('admin');
   };

   const checkAdminApproval = async (adminId) => {
      try {
         const response = await axios.get(`/api/admin.php?action=check-status&id=${adminId}`);
         return response.data.status === 'active';
      } catch (error) {
         console.error('Error checking admin status:', error);
         return false;
      }
   };

   return (
      <AuthContext.Provider
         value={{
            user,
            admin,
            loginUser,
            loginAdmin,
            logoutUser,
            logoutAdmin,
            checkAdminApproval,
            isUser: !!user,
            isAdmin: !!admin,
            loading,
            isAuthenticated: !!user || !!admin,
         }}
      >
         {!loading && children}
      </AuthContext.Provider>
   );
};

// Hook for using auth context
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};

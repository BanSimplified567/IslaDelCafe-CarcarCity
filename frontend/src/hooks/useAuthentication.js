import { useAuth } from '@context/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const useAuthentication = () => {
   const [loading, setLoading] = useState(false);
   const { loginUser, loginAdmin } = useAuth();

   const handleUserLogin = async (email, password) => {
      setLoading(true);
      try {
         const response = await axios.post('/api/users.php?action=login', {
            email,
            password,
         });

         if (response.data.success) {
            loginUser(response.data.user);
            await Swal.fire({
               icon: 'success',
               title: 'Welcome Back!',
               text: 'Login successful',
               timer: 1500,
               showConfirmButton: false,
            });
            return { success: true };
         } else {
            throw new Error(response.data.message);
         }
      } catch (error) {
         const errorMessage = error.response?.data?.message || error.message;
         await Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorMessage,
            confirmButtonColor: '#6f4e37',
         });
         return { success: false, error: errorMessage };
      } finally {
         setLoading(false);
      }
   };

   const handleAdminLogin = async (email, password) => {
      setLoading(true);
      try {
         const response = await axios.post('/api/admin.php?action=login', {
            email,
            password,
         });

         if (response.data.success) {
            loginAdmin(response.data.admin);
            await Swal.fire({
               icon: 'success',
               title: 'Welcome Back Admin!',
               text: 'Login successful',
               timer: 1500,
               showConfirmButton: false,
            });
            return { success: true };
         } else {
            throw new Error(response.data.message);
         }
      } catch (error) {
         const errorMessage = error.response?.data?.message || error.message;
         await Swal.fire({
            icon: 'error',
            title: 'Admin Login Failed',
            text: errorMessage,
            confirmButtonColor: '#6f4e37',
         });
         return { success: false, error: errorMessage };
      } finally {
         setLoading(false);
      }
   };

   return {
      loading,
      handleUserLogin,
      handleAdminLogin,
   };
};

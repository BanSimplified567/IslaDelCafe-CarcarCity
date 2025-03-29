import { useAuth } from '@context/AuthContext';
import '@style/Login.css';
import axios from 'axios';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function LoginAdmin() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [rememberMe, setRememberMe] = useState(false);
   const navigate = useNavigate();
   const { loginAdmin } = useAuth();

   const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         // Input validation
         if (!email || !password) {
            Swal.fire({
               icon: 'error',
               title: 'Missing Information',
               text: 'Please fill in all fields',
               confirmButtonColor: '#6f4e37',
            });
            setLoading(false);
            return;
         }

         const response = await axios.post('/api/admin.php?action=login', {
            email,
            password: password.trim(),
         });

         if (response.data.success) {
            // Successful login
            loginAdmin(response.data.admin);

            // Save to localStorage if remember me is checked
            if (rememberMe) {
               localStorage.setItem('adminEmail', email);
            } else {
               localStorage.removeItem('adminEmail');
            }

            Swal.fire({
               icon: 'success',
               title: 'Welcome Back!',
               text: 'Login successful',
               timer: 1500,
               showConfirmButton: false,
            }).then(() => {
               navigate('/dashboard');
            });
         } else if (
            response.data.accountExists &&
            response.data.admin &&
            response.data.admin.status === 'pending'
         ) {
            // Account exists but is pending
            Swal.fire({
               icon: 'warning',
               title: 'Account Pending',
               text: 'Your admin account is pending approval. Please contact the super admin.',
               confirmButtonColor: '#6f4e37',
            });
         } else {
            Swal.fire({
               icon: 'error',
               title: 'Login Failed',
               text: response.data.message || 'Invalid credentials',
               confirmButtonColor: '#6f4e37',
            });
         }
      } catch (error) {
         console.error('Login error:', error);

         Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'An error occurred during login. Please try again.',
            confirmButtonColor: '#6f4e37',
         });
      } finally {
         setLoading(false);
      }
   };

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   // Check for remembered email on component mount
   useState(() => {
      const savedEmail = localStorage.getItem('adminEmail');
      if (savedEmail) {
         setEmail(savedEmail);
         setRememberMe(true);
      }
   }, []);

   return (
      <div className="loginAdminContainer">
         <div className="loginAdminCard">
            <div className="loginAdminHeader">
               <Coffee className="loginAdminLogo" />
               <h2 className="loginAdminTitle">Isla Del Cafe (ADMIN)</h2>
               <p className="loginAdminSubtitle">Welcome back admin</p>
            </div>

            <form className="loginAdminForm" onSubmit={handleLogin}>
               <div className="loginAdminFormGroup">
                  <label htmlFor="email" className="loginAdminLabel">
                     Email
                  </label>
                  <input
                     id="email"
                     type="email"
                     placeholder="admin@isladecafe.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="loginAdminInput"
                     required
                     disabled={loading}
                  />
               </div>

               <div className="loginAdminFormGroup">
                  <label htmlFor="password" className="loginAdminLabel">
                     Password
                  </label>
                  <div className="loginAdminPasswordWrapper">
                     <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="loginAdminInput"
                        required
                        disabled={loading}
                     />
                     <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="loginAdminPasswordToggle"
                        aria-label="Toggle password visibility"
                        disabled={loading}
                     >
                        {showPassword ? (
                           <EyeOff className="loginAdminIcon" />
                        ) : (
                           <Eye className="loginAdminIcon" />
                        )}
                     </button>
                  </div>
               </div>

               <div className="loginAdminOptions">
                  <div className="loginAdminRemember">
                     <input
                        id="remember-me"
                        type="checkbox"
                        className="loginAdminCheckbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={loading}
                     />
                     <label htmlFor="remember-me" className="loginAdminCheckboxLabel">
                        Remember me
                     </label>
                  </div>
                  <div className="loginAdminForgot">
                     <Link to="/forgot-password" className="loginAdminLink">
                        Forgot password?
                     </Link>
                  </div>
               </div>

               <button type="submit" className="loginAdminButton" disabled={loading}>
                  {loading ? (
                     <div className="loginAdminButtonLoading">
                        <span className="loginAdminSpinner"></span>
                        Signing in...
                     </div>
                  ) : (
                     'Sign in'
                  )}
               </button>
            </form>

            <div className="loginAdminFooter">
               <p className="loginAdminFooterText">
                  New admin registration requires approval from existing admin.
                  <br />
                  Please contact the administrator for access.
               </p>
            </div>
         </div>
      </div>
   );
}

export default LoginAdmin;

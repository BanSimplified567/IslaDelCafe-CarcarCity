import '@style/Login.css';
import axios from 'axios';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
   const [rememberMe, setRememberMe] = useState(false);
   const navigate = useNavigate();

   // Check if user is already logged in
   useEffect(() => {
      const user = sessionStorage.getItem('user'); // Changed from localStorage to sessionStorage
      if (user) {
         navigate('/index');
      }
   }, [navigate]);
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // Clear any previous errors

      // Client-side validation for email and password
      if (!email || !password) {
         setError('Email and Password are required!');
         return;
      }

      try {
         // Prepare the data as a JSON object
         const requestData = {
            email: email,
            password: password,
         };

         // Send data as JSON
         const response = await axios.post('/api/account.php?action=login', requestData);

         if (response.data.success) {
            // ✅ Store user session data (so Navbar can read it)
            sessionStorage.setItem('user', JSON.stringify(response.data.user));

            Swal.fire({
               icon: 'success',
               title: 'Login Successful!',
               text: 'Welcome back!',
               confirmButtonColor: '#6f4e37',
            }).then(() => {
               navigate('/index');
            });
         } else {
            // If success is false, show the error message from the backend
            setError(response.data.message || 'Login failed. Please try again.');
         }
      } catch (err) {
         console.error(err);

         // Handle errors more gracefully by checking if we have a response and fallback messages
         const errorMessage =
            err.response?.data?.message ||
            'Login failed. Please check your connection or try again later.';
         setError(errorMessage);
      }
   };

   return (
      <div className="loginAdminContainer">
         <div className="loginAdminCard">
            <div className="loginAdminHeader">
               <Coffee className="loginAdminLogo" />
               <h2 className="loginAdminTitle">Isla Del Cafe</h2>
               <p className="loginAdminSubtitle">Sign in to your account</p>
            </div>

            {error && <p className="loginAdminError">{error}</p>}

            <form className="loginAdminForm" onSubmit={handleSubmit}>
               <div className="loginAdminFormGroup">
                  <label htmlFor="email" className="loginAdminLabel">
                     Email
                  </label>
                  <input
                     id="email"
                     type="email"
                     placeholder="Enter your email..."
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="loginAdminInput"
                     required
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
                     />
                     <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="loginAdminPasswordToggle"
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

               <button type="submit" className="loginAdminButton">
                  Sign In
               </button>
            </form>

            <div className="loginAdminFooter">
               Need an account?{' '}
               <Link to="/registerusers" className="loginAdminLink">
                  Register here
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Login;

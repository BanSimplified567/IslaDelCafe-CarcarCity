import '@style/Login.css'; // ✅ Adjust according to your actual path or alias setup
import axios from 'axios';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post('/api/logInAdmin.php', {
            email,
            password,
         });

         if (response.data.success) {
            console.log('Login successful:', response.data.admin);
            // You may store to localStorage/session if needed
            navigate('/dashboard');
         } else {
            alert(response.data.message || 'Login failed');
         }
      } catch (error) {
         console.error('Login error:', error);
         alert('An error occurred. Please try again.');
      }
   };

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

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
                     placeholder="email@example.com"
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
                        aria-label="Toggle password visibility"
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
                     <input id="remember-me" type="checkbox" className="loginAdminCheckbox" />
                     <label htmlFor="remember-me" className="loginAdminCheckboxLabel">
                        Remember me
                     </label>
                  </div>
                  <div className="loginAdminForgot">
                     <a href="#" className="loginAdminLink">
                        Forgot password?
                     </a>
                  </div>
               </div>

               <button type="submit" className="loginAdminButton">
                  Sign in
               </button>
            </form>

            <div className="loginAdminFooter">
               Need an account?
               <Link className="loginAdminLink" to="/register">
                  Register here
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Login;

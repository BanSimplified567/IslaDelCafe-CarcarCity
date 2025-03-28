import { useAuth } from '@context/AuthContext'; // adjust the import path as needed
import '@style/Login.css';
import axios from 'axios';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const navigate = useNavigate();
   const { login } = useAuth();

   const handleLogin = async () => {
      try {
         const response = await axios.post('api/users.php?action=login', {
            email,
            password,
         });

         const result = response.data;

         if (result.success) {
            setSuccess(result.message);
            setError('');
            login(result.user); // 🔐 Save login to context
            navigate('/index');
         } else {
            setError(result.message);
            setSuccess('');
         }
      } catch (err) {
         console.error('Login failed:', err);
         setError('Login failed. Please try again.');
         setSuccess('');
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
               <h2 className="loginAdminTitle">Isla Del Cafe</h2>
               <p className="loginAdminSubtitle">Sign in to your account</p>
            </div>

            <div className="loginAdminForm">
               {error && <p className="loginAdminError">{error}</p>}
               {success && <p className="loginAdminSuccess">{success}</p>}
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
                        name="remember-me"
                        type="checkbox"
                        className="loginAdminCheckbox"
                     />
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
               <button onClick={handleLogin} className="loginAdminButton">
                  Sign in
               </button>
            </div>

            <div className="loginAdminFooter">
               Need an account?{' '}
               <a href="/registerusers" className="loginAdminLink">
                  Register here
               </a>
            </div>
         </div>
      </div>
   );
}

export default Login;

import { useAuthentication } from '@hooks/useAuthentication';
import '@style/Login.css';
import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();
   const { loading, handleUserLogin } = useAuthentication();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await handleUserLogin(email, password);
      if (result.success) {
         navigate('/index');
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

               <button
                  type="submit"
                  className={`loginAdminButton ${loading ? 'loading' : ''}`}
                  disabled={loading}
               >
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

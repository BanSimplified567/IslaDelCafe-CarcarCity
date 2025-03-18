import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import '@style/Login.css'; // Import the CSS file

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const handleLogin = () => {
      console.log('Logging in with', { email, password });
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
               <div className="loginAdminFormGroup">
                  <label htmlFor="email" className="loginAdminLabel">
                     Email
                  </label>
                  <input
                     id="email"
                     type="email"
                     placeholder="barista@example.com"
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
               <a href="#" className="loginAdminLink">
                  Register here
               </a>
            </div>
         </div>
      </div>
   );
}

export default Login;

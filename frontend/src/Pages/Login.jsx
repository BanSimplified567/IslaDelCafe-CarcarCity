import { Coffee, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

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
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
               <Coffee className="w-12 h-12 text-amber-800" />
               <h2 className="mt-4 text-3xl font-bold text-amber-900">Isla Del Cafe</h2>
               <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            <div className="space-y-4">
               <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                     Email
                  </label>
                  <input
                     id="email"
                     type="email"
                     placeholder="barista@example.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
               </div>
               <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                     Password
                  </label>
                  <div className="relative">
                     <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10"
                     />
                     <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-amber-800 focus:outline-none"
                     >
                        {showPassword ? (
                           <EyeOff className="h-5 w-5" />
                        ) : (
                           <Eye className="h-5 w-5" />
                        )}
                     </button>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center">
                     <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                     />
                     <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                     </label>
                  </div>
                  <div className="text-sm">
                     <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                        Forgot password?
                     </a>
                  </div>
               </div>
               <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 text-white bg-amber-700 rounded-md hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
               >
                  Sign in
               </button>
            </div>

            <div className="text-sm text-center text-gray-500">
               Need an account?{' '}
               <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                  Register here
               </a>
            </div>
         </div>
      </div>
   );
}

export default Login;

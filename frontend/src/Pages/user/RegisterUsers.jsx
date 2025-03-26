import '@style/Register.css';
import axios from 'axios';
import { Coffee, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      number: '',
      termsAccepted: false,
   });

   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: type === 'checkbox' ? checked : value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      setError('');
      setSuccess('');

      if (formData.password !== formData.confirmPassword) {
         setError('Passwords do not match.');
         return;
      }

      if (!formData.termsAccepted) {
         setError('Please accept the terms and conditions.');
         return;
      }

      try {
         const response = await axios.post('/api/registerUsers.php', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            number: formData.number,
         });

         if (response.data.success) {
            setSuccess('Registration successful!');
            setFormData({
               name: '',
               email: '',
               password: '',
               confirmPassword: '',
               number: '',
               termsAccepted: false,
            });
         } else {
            setError(response.data.message || 'Registration failed.');
         }
      } catch (err) {
         console.error(err);
         setError('Server error. Please try again.');
      }
   };

   return (
      <div className="registerAdminContainer">
         <form onSubmit={handleSubmit} className="registerAdminCard">
            <div className="registerAdminHeader">
               <Coffee className="registerAdminLogo" />
               <h2 className="registerAdminTitle">Register User</h2>
               <p className="registerAdminSubtitle">Create a new user account</p>
            </div>

            {error && <p className="registerAdminError">{error}</p>}
            {success && <p className="registerAdminSuccess">{success}</p>}

            <div className="registerAdminFormGroup">
               <label>Name</label>
               <div className="registerAdminInputWrapper">
                  <User className="registerAdminInputIcon" size={20} />
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="Enter your full name"
                     required
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Email</label>
               <div className="registerAdminInputWrapper">
                  <Mail className="registerAdminInputIcon" size={20} />
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Enter your email address"
                     required
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Phone Number</label>
               <div className="registerAdminInputWrapper">
                  <Phone className="registerAdminInputIcon" size={20} />
                  <input
                     type="tel"
                     name="number"
                     value={formData.number}
                     onChange={handleChange}
                     placeholder="Enter your phone number"
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Password</label>
               <div className="passwordWrapper">
                  <div className="registerAdminInputWrapper">
                     <Lock className="registerAdminInputIcon" size={20} />
                     <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="passwordToggle"
                     >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                  </div>
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Confirm Password</label>
               <div className="registerAdminInputWrapper">
                  <Lock className="registerAdminInputIcon" size={20} />
                  <input
                     type={showPassword ? 'text' : 'password'}
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     placeholder="Confirm your password"
                     required
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <div className="registerAdminRemember">
                  <input
                     type="checkbox"
                     name="termsAccepted"
                     id="termsAccepted"
                     className="registerAdminCheckbox"
                     checked={formData.termsAccepted}
                     onChange={handleChange}
                  />
                  <label htmlFor="termsAccepted" className="registerAdminCheckboxLabel">
                     I accept the Terms and Conditions
                  </label>
               </div>
            </div>

            <button type="submit" className="registerAdminButton">
               Register
            </button>

            <div className="registerAdminFooter">
               Already have an account?
               <button
                  type="button"
                  onClick={() => navigate('/loginuser')}
                  className="registerAdminLink"
               >
                  Sign in
               </button>
            </div>
         </form>
      </div>
   );
}

export default RegisterUser;

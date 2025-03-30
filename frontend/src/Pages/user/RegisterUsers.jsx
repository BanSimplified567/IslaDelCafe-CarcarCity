import '@style/Register.css';
import axios from 'axios';
import { Coffee, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegisterUser() {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      city: '',
      zipcode: '',
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
      setLoading(true);

      if (formData.password !== formData.confirmPassword) {
         setError('Passwords do not match.');
         setLoading(false);
         return;
      }

      if (!formData.termsAccepted) {
         setError('Please accept the terms and conditions.');
         setLoading(false);
         return;
      }

      try {
         const response = await axios.post('/api/users.php?action=register', {
            firstName: formData.first_name,
            lastName: formData.last_name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zipcode: formData.zipcode,
         });

         if (response.data.success) {
            Swal.fire({
               icon: 'success',
               title: 'Registration Successful!',
               text: 'You can now login to your account.',
               confirmButtonColor: '#6f4e37',
            }).then(() => {
               navigate('/');
            });
         } else {
            setError(response.data.message || 'Registration failed.');
         }
      } catch (err) {
         console.error(err);
         setError(err.response?.data?.message || 'Server error. Please try again.');
      } finally {
         setLoading(false);
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
               <label>First Name</label>
               <div className="registerAdminInputWrapper">
                  <User className="registerAdminInputIcon" size={20} />
                  <input
                     type="text"
                     name="first_name"
                     value={formData.first_name}
                     onChange={handleChange}
                     placeholder="Enter your first name"
                     required
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Last Name</label>
               <div className="registerAdminInputWrapper">
                  <User className="registerAdminInputIcon" size={20} />
                  <input
                     type="text"
                     name="last_name"
                     value={formData.last_name}
                     onChange={handleChange}
                     placeholder="Enter your last name"
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
                     placeholder="Enter your email"
                     required
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Phone</label>
               <div className="registerAdminInputWrapper">
                  <Phone className="registerAdminInputIcon" size={20} />
                  <input
                     type="tel"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     placeholder="Enter your phone number"
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Address</label>
               <div className="registerAdminInputWrapper">
                  <input
                     type="text"
                     name="address"
                     value={formData.address}
                     onChange={handleChange}
                     placeholder="Enter your address"
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>City</label>
               <div className="registerAdminInputWrapper">
                  <input
                     type="text"
                     name="city"
                     value={formData.city}
                     onChange={handleChange}
                     placeholder="Enter your city"
                  />
               </div>
            </div>

            <div className="registerAdminFormGroup">
               <label>Zip Code</label>
               <div className="registerAdminInputWrapper">
                  <input
                     type="text"
                     name="zipcode"
                     value={formData.zipcode}
                     onChange={handleChange}
                     placeholder="Enter your zip code"
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

            <button type="submit" className="registerAdminButton" disabled={loading}>
               {loading ? 'Registering...' : 'Register'}
            </button>

            <div className="registerAdminFooter">
               Already have an account?
               <button type="button" onClick={() => navigate('/')} className="registerAdminLink">
                  Sign in
               </button>
            </div>
         </form>
      </div>
   );
}

export default RegisterUser;

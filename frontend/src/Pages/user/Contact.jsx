import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@components/Footer';

import '@style/ContactUs.css'; // Create this CSS file

function ContactUs() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
   });

   const [formSubmitted, setFormSubmitted] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      setFormSubmitted(true);

      // Reset the form after submission
      setTimeout(() => {
         setFormSubmitted(false);
         setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'General Inquiry',
            message: '',
         });
      }, 3000);
   };

   return (
      <div className="contact-us-container">
         {/* Hero Section */}
         <section className="contact-us-hero">
            <h1>Contact</h1>
         </section>



         {/* Contact Form and Map Section */}
         <section className="contact-us-form-map">
            <div className="contact-us-columns">
               {/* Form Column */}
               <div className="contact-us-form-column">
                  <div className="contact-us-form-container">
                     <h2 className="contact-us-section-title">Send Us a Message</h2>

                     {formSubmitted ? (
                        <div className="contact-us-success-message">
                           <div className="contact-us-success-icon">✓</div>
                           <h3>Thank You!</h3>
                           <p>
                              Your message has been sent successfully. We'll get back to you soon!
                           </p>
                        </div>
                     ) : (
                        <form className="contact-us-form" onSubmit={handleSubmit}>
                           <div className="contact-us-form-group">
                              <label htmlFor="name" className="contact-us-form-label">
                                 Full Name
                              </label>
                              <input
                                 type="text"
                                 id="name"
                                 name="name"
                                 value={formData.name}
                                 onChange={handleChange}
                                 className="contact-us-form-input"
                                 placeholder="Your Name"
                                 required
                              />
                           </div>

                           <div className="contact-us-form-row">
                              <div className="contact-us-form-group">
                                 <label htmlFor="email" className="contact-us-form-label">
                                    Email Address
                                 </label>
                                 <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="contact-us-form-input"
                                    placeholder="example@email.com"
                                    required
                                 />
                              </div>

                              <div className="contact-us-form-group">
                                 <label htmlFor="phone" className="contact-us-form-label">
                                    Phone Number
                                 </label>
                                 <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="contact-us-form-input"
                                    placeholder="+63 123 456 7890"
                                 />
                              </div>
                           </div>

                        
                           <div className="contact-us-form-group">
                              <label htmlFor="message" className="contact-us-form-label">
                                 Message
                              </label>
                              <textarea
                                 id="message"
                                 name="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 rows="6"
                                 className="contact-us-form-textarea"
                                 placeholder="Write your message here..."
                                 required
                              ></textarea>
                           </div>

                           <div className="contact-us-form-group">
                              <button type="submit" className="contact-us-form-button">
                                 Send Message
                              </button>
                           </div>
                        </form>
                     )}
                  </div>
               </div>

               {/* Map Column */}
               <div className="contact-us-map-column">
                  <div className="contact-us-map-container">
                     <h2 className="contact-us-section-title">Find Us</h2>
                     <div className="contact-us-map">
                        <iframe
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.9292655632853!2d123.63531687450946!3d10.104875971222398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a97d004045a0fb%3A0x197b5dc4e6b0dba7!2sIsla%20del%20Caf%C3%A8%20-%20Carcar!5e0!3m2!1sen!2sph!4v1742131194650!5m2!1sen!2sph"
                           width="100%"
                           height="100%"
                           style={{ border: 0 }}
                           allowFullScreen=""
                           loading="lazy"
                           referrerPolicy="no-referrer-when-downgrade"
                           title="Isla del Cafè location"
                        ></iframe>
                     </div>
                     <div className="contact-us-directions">
                        <h3>Directions</h3>
                        <p>
                           Isla Del Cafe is located in the heart of Carcar City, just a 5-minute
                           walk from the main plaza. Look for our tropical-themed facade with the
                           signature coffee cup logo.
                        </p>
                        <button
                           className="contact-us-directions-button"
                           onClick={() => {
                              window.open(
                                 'https://www.google.com/maps/dir//Isla+del+Caf%C3%A8+-+Carcar,+Carcar+City,+Cebu,+Philippines',
                                 '_blank'
                              );
                           }}
                        >
                           Get Directions
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>






         {/* Social Media Section */}
         <section className="contact-us-social">
            <div className="contact-us-social-content">
               <h2 className="contact-us-section-title centered">Connect With Us</h2>
               <p className="contact-us-social-text">
                  Follow us on social media for updates, promotions, and coffee inspiration!
               </p>
               <div className="contact-us-social-icons">
                  <a href="#" className="contact-us-social-icon">
                     <div className="contact-us-social-circle">📱</div>
                     <span>Facebook</span>
                  </a>
                  <a href="#" className="contact-us-social-icon">
                     <div className="contact-us-social-circle">📸</div>
                     <span>Instagram</span>
                  </a>
                  <a href="#" className="contact-us-social-icon">
                     <div className="contact-us-social-circle">🐦</div>
                     <span>Twitter</span>
                  </a>
                  <a href="#" className="contact-us-social-icon">
                     <div className="contact-us-social-circle">▶️</div>
                     <span>YouTube</span>
                  </a>
               </div>
            </div>
         </section>

         {/* FAQ Section */}
         <section className="contact-us-faq">
            <div className="contact-us-faq-content">
               <h2 className="contact-us-section-title centered">Frequently Asked Questions</h2>
               <div className="contact-us-faq-grid">
                  <div className="contact-us-faq-item">
                     <h3 className="contact-us-faq-question">Do you offer catering services?</h3>
                     <p className="contact-us-faq-answer">
                        Yes, we offer catering for events of all sizes. Please contact us at least
                        48 hours in advance to arrange your order.
                     </p>
                  </div>
                  <div className="contact-us-faq-item">
                     <h3 className="contact-us-faq-question">
                        Can I place a bulk order for coffee?
                     </h3>
                     <p className="contact-us-faq-answer">
                        Absolutely! We offer special pricing for bulk orders. Please use our contact
                        form and select "Bulk Order" as the subject.
                     </p>
                  </div>
                  <div className="contact-us-faq-item">
                     <h3 className="contact-us-faq-question">Do you have WiFi available?</h3>
                     <p className="contact-us-faq-answer">
                        Yes, we offer complimentary WiFi for all our customers. Just ask for the
                        password when you order.
                     </p>
                  </div>
                  <div className="contact-us-faq-item">
                     <h3 className="contact-us-faq-question">
                        Are you available for venue rental?
                     </h3>
                     <p className="contact-us-faq-answer">
                        We offer venue rental options for small gatherings and events. Please
                        contact us for availability and pricing.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
}

export default ContactUs;

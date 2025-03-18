import { Link } from 'react-router-dom';
import '@style/indexError.css'; // You'll need to create this CSS file with the styles

const NotFound = () => {
   return (
      <div className="index-error-container">
         <div className="index-error-box">
            <h1 className="index-error-code">404</h1>
            <h2 className="index-error-title">Page Not Found</h2>
            <div className="index-error-divider"></div>

            <p className="index-error-message">
               Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="index-error-actions">
               <Link to="/index" className="index-error-button-primary">
                  Back to Home
               </Link>
               <Link to="/menu" className="index-error-button-secondary">
                  Browse Menu
               </Link>
            </div>
         </div>
      </div>
   );
};

export default NotFound;

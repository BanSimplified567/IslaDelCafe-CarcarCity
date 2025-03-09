import { Link } from 'react-router-dom';

const NavLink = ({ to, children }) => {
   return (
      <li>
         <Link to={to} className="hover:text-brown-500">
            {children}
         </Link>
      </li>
   );
};

export default NavLink;

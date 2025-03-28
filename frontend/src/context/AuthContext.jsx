// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      }
   }, []);

   const login = (userData) => {
      sessionStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
   };

   const logout = () => {
      sessionStorage.removeItem('user');
      setUser(null);
   };

   const isLoggedIn = !!user;

   return (
      <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);

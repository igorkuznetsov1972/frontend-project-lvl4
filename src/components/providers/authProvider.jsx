import React, { useState } from 'react';
import { AuthContext } from '../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const isUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(isUser);
  const login = (token, username) => {
    localStorage.setItem('user', JSON.stringify({ token, username }));
    setUser({ token, username });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      logOut, user, setUser, isUser, login,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

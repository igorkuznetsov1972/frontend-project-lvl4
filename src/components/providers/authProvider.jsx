import React, { useState } from 'react';
import { AuthContext } from '../../contexts/index.jsx';

export default ({ children }) => {
  const isUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(isUser);
  const [signinUp, setSigninUp] = useState(false);
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      logOut, user, setUser, isUser, signinUp, setSigninUp,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

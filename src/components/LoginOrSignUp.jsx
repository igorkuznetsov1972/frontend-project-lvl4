import React from 'react';
import useAuth from '../hooks/useAuth';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';

export default () => {
  const auth = useAuth();
  return (
    auth.signinUp
      ? <SignUpForm setSigninUp={auth.setSigninUp} />
      : <LoginForm setSigninUp={auth.setSigninUp} />
  );
};

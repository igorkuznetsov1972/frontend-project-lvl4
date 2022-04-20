import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // Navigate,
  // useLocation,
} from 'react-router-dom';
import '../../assets/application.scss';
import { Button, Navbar, Container } from 'react-bootstrap';
import ChatPage from './chat/ChatPage.jsx';
import LoginForm from './LoginForm.jsx';
import LoginOrSignUp from './LoginOrSignUp.jsx';
// import NotFoundPage from './NotFound.jsx';

import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/useAuth';

const AuthProvider = ({ children }) => {
  const isUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(isUser);
  const [signinUp, setSigninUp] = useState(false);
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <authContext.Provider value={{
      logOut, user, setUser, isUser, signinUp, setSigninUp,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const ChatRoute = () => {
  const auth = useAuth();
  return (
    auth.isUser ? <ChatPage /> : <LoginOrSignUp />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  return (
    auth.isUser
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

export default () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm" variant="light" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        </Container>
        <AuthButton />
      </Navbar>
      <ChatRoute />
    </div>
  </AuthProvider>
);

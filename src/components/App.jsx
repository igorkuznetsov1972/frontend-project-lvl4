import React, { useState } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Link } from 'react-router-dom';
import '../../assets/application.scss';
import 'react-toastify/scss/main.scss';
import { Button, Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChatPage from './chat/ChatPage.jsx';
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
  const { t } = useTranslation();
  return (
    auth.isUser
      ? <Button onClick={auth.logOut}>{t('logout')}</Button>
      : null
  );
};

export default () => {
  const rollbarConfig = {
    accessToken: 'f5b203bfa926476694a28cf17d1205e1',
    environment: 'production',
  };
  const { t } = useTranslation();
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <Navbar className="shadow-sm" variant="light" bg="light" expand="lg">
              <Container>
                <Navbar.Brand as={Link} to="/">{t('root')}</Navbar.Brand>
              </Container>
              <AuthButton />
            </Navbar>
            <ChatRoute />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

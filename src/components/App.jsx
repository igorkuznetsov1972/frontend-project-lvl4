import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import '../../assets/application.scss';
import 'react-toastify/scss/main.scss';
import { Button, Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChatPage from './chat/ChatPage.jsx';
import useAuth from '../hooks/useAuth';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import NotFoundPage from './NotFound.jsx';

const ChatRoute = () => {
  const auth = useAuth();
  return (
    auth.isUser ? <ChatPage /> : <Navigate to="/login" />
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
const App = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" variant="light" bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">{t('root')}</Navbar.Brand>
          </Container>
          <AuthButton />
        </Navbar>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<ChatRoute />}>
            <Route path="" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
    </Router>
  );
};

export default App;

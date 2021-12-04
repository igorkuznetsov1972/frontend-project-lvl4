import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import HomePage from './HomePage.jsx';
import LoginForm from './LoginForm.jsx';
import NotFound from './NotFound.jsx';

export default function App() {
  function Home() {
    return (
      <HomePage />
    );
  }

  function Login() {
    return (
      <LoginForm />
    );
  }
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

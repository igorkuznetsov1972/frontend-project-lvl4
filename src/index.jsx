import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/chat/store/store.js';
import App from './components/App.jsx';
import './i18n';

// const container = document.getElementById('chat');
// console.log(container);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
    <App />
  </Provider>,
  document.getElementById('chat'),
);

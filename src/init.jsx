import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AuthProvider from './components/providers/authProvider.jsx';
import ApiProvider from './components/providers/apiProvider.jsx';
import store from './components/chat/store/store.js';
import App from './components/App.jsx';

const rollbarConfig = {
  accessToken: 'f5b203bfa926476694a28cf17d1205e1',
  environment: 'production',
};

export default (socket) => (
  <Provider store={store}>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <ApiProvider socket={socket}>
            <AuthProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<App />} />
                </Routes>
              </Router>
            </AuthProvider>
          </ApiProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </Provider>
);
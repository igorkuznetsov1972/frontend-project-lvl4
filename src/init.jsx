import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import i18n from './i18n';
import AuthProvider from './components/providers/authProvider.jsx';
import ApiProvider from './components/providers/apiProvider.jsx';
import App from './components/App.jsx';
import chatSliceReducer from './slices/chatSlice.js';
import modalSliceReducer from './slices/modalSlice.js'


const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
    modal: modalSliceReducer,
  },
});

const rollbarToken = process.env.ROLLBAR_KEY || null;
const rollbarConfig = {
  accessToken: rollbarToken,
  environment: 'production',
  enabled: true,
};

const init = async (socket) => (
  <Provider store={store}>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={await i18n}>
          <ApiProvider socket={socket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ApiProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </Provider>
);

export default init;

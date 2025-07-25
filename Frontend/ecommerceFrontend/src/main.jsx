import React from 'react'; // 👈 required for JSX
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from 'react-redux'
import { AuthContext,AuthProvider } from './context.jsx';
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
);

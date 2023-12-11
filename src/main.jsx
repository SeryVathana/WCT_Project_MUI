// import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

import { theme } from './theme/theme.jsx';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';

import { store } from './redux/store.js';
import { Provider } from 'react-redux';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </Provider>
  // </React.StrictMode>
);

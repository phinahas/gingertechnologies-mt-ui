
import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


import { store } from './store/index.js'
import App from './App.jsx';

import GlobalSnackbar from './components/ui-components/Snackbar/GlobalSnackbar.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <BrowserRouter >
        <App />
        <GlobalSnackbar />
      </BrowserRouter>
    </Provider>
  
);
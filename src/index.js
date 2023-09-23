import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import './index.css';
import Router from './Router';
import { store } from './store'
import CssBaseline from '@mui/material/CssBaseline';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
    <CssBaseline />
    <Provider store={store}>
      <Router />
    </Provider>
    </>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import './index.css';

import "react-image-gallery/styles/css/image-gallery.css";
import Router from './Router';
import { store } from './store'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@material-tailwind/react";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ThemeProvider>
  </>
);

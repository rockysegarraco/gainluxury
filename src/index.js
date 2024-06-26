import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';

import './i18n';

import './index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-image-gallery/styles/css/image-gallery.css";
import Router from './Router';
import { store } from './store'

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

root.render(
  <>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </>
);

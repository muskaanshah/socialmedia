import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import 'material-icons/iconfont/material-icons.css';
import { Routes } from './Routes';
import { store } from './app/store';
import './index.css';
import { theme } from './styles/theme';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <ColorModeScript />
          <Routes />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);

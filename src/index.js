import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { theme } from './styles/theme';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'material-icons/iconfont/material-icons.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);

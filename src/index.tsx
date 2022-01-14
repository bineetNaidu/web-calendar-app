import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ChakraProvider,
  ColorModeScript,
  ColorModeProvider,
} from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './lib/chakraui.theme';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ColorModeProvider options={{ initialColorMode: 'dark' }}>
          <App />
        </ColorModeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

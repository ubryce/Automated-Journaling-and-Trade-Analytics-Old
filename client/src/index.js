import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';



ReactDOM.render(
  //<React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById('root'),
);
// import 'vite/modulepreload-polyfill'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>,
);
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Hotjar from '@hotjar/browser';

try {
  const siteId = Number(import.meta.env.VITE_HOTJAR_ID);
  const hotjarVersion = Number(import.meta.env.VITE_HOTJAR_VERSION);

  Hotjar.init(siteId, hotjarVersion);
} catch (e) {
  console.log('Cannot initialize Hotjar:', e);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

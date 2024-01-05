import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/root';
import reportWebVitals from './scripts/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals(console.log);

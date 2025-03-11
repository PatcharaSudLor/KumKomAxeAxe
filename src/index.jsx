import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import QRCodePage from './qrCodePage';
import ShowOutputPage from './ShowOutput';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/qrCodePage" element={<QRCodePage />} />
    <Route path="/third" element={<ShowOutputPage />} />
    </Routes>
  </Router>
);

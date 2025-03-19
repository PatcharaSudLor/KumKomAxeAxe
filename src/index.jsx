import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ShowOutput from './ShowOutput';
import TelAndPoint from './TelAndPoint';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/qrCodePage" element={<ShowOutput />} />
    <Route path="/third" element={<TelAndPoint />} />
    </Routes>
  </Router>
);

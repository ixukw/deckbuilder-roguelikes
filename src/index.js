import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { SolitaireApp, Poker1v1App, MahjongApp } from './pages';

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/solitaire" element={<SolitaireApp />} />
      <Route path="/poker1v1" element={<Poker1v1App />} />
      <Route path="/mahjong" element={<MahjongApp />} />
    </Routes>
  </HashRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//import reportWebVitals from './reportWebVitals';
//reportWebVitals();

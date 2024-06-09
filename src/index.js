import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { SolitaireApp } from './solitaire';
import Poker1v1App from './poker1v1/Poker1v1App';
import { MahjongApp } from './mahjong';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/solitaire',
    element: <SolitaireApp />
  },
  {
    path: '/poker1v1',
    element: <Poker1v1App />
  },
  {
    path: '/mahjong',
    element: <MahjongApp />
  }
])

const root = createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//import reportWebVitals from './reportWebVitals';
//reportWebVitals();

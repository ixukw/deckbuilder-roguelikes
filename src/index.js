import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { insertCoin } from 'playroomkit'

import './index.css';

// Show popup and ask user permissions for their discord information
/*await insertCoin({
  gameId: "4roZe1ZWjp0zou4VY7Da",
  discord: true
}).catch(e => console.log(e));*/

const root = createRoot(document.getElementById('root'));
root.render(
  <App />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

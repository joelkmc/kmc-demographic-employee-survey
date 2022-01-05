import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import RoutesNavigation from './infrastructure/navigation/Routes.navigation';
import './infrastructure/styles/index.css';
import './infrastructure/styles/Datepicker.css';

ReactDOM.render(
  <React.StrictMode>
    <RoutesNavigation />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState';


ReactDOM.render(
  <Router>
    <DataProvider>
      <App />
    </DataProvider>
  </Router>
  ,
  document.getElementById('root')
);



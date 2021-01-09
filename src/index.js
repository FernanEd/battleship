import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Credits from './Credits';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(<Credits />, document.getElementById('credits'));

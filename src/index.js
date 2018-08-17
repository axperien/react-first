import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/styles.css';
import StopClock from './app.js';

ReactDOM.render(<StopClock />, document.getElementById('root'));

module.hot.accept();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'animate.css';
import AppLoader from './AppLoader';

const testMode:string = `${process.env.REACT_APP_TEST_MODE}`;

ReactDOM.render(
  <React.StrictMode>
    <AppLoader testMode={testMode}/>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "./App.css";
import styled from "styled-components";

var called = false;

if (!called)
ReactDOM.render(
  <React.StrictMode>
      {!called ? <App /> : ''}
      {called = true}
      <script><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous"></link></script>
    </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

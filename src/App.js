import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import { renderButton, checkSignedIn, changeStatus } from "./GoogleAuth/authUtils";
import DashBoard from "./Dashboard/dashboard";
import styled from "styled-components";
import BasicDashboard from './Dashboard/Basic/index.js';
import GoogleBtn from './googleBtn.js';
import FacebookBtn from './facebookBtn.js';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

var isGoogleSignedIn = false;

var iscalled = false;

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFacebookSignedIn, setIsFacebookSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init);
  });

  wait(3 * 1000).then(() => { iscalled = true });

  return (
    <div className="App" style={{ padding: "10px 10px 10px 30px" }}>
      <br></br>
      <div>
        <div style={{ float: "left" }}>Financial Literacy Analytics Dashboard</div>
        <div style={{ float: "right" }}>FinKAB.com</div>
      </div>
      <br></br>
      <div>
      <div style={{ margin: "0", textAlign: "left"}}><FacebookBtn /></div>
        <div style={{ margin: "0", textAlign: "left"}}><GoogleBtn /></div>
      </div>
      <div id='fb'></div>
      <div id='google'></div>
    </div>
  );
}

export default App;

const ButtonContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10vmin;
  margin-top: 0;
`;
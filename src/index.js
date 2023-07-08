import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
 <Auth0Provider
    domain="dev-508rkv0nejkhzxd7.us.auth0.com"
    clientId="U4f5gm34UW2xNSoRBLaWpqtDgjYmIvGq"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <>
  <div className="header" style={{ textAlign: "center" }}>
    <a href="./">QUIZ APP</a>
  </div>
    <App />
    </>
  </Auth0Provider>
, document.getElementById("root"));

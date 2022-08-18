// import 'vite/modulepreload-polyfill'
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      audience={import.meta.env.VITE_AUDIENCE}
      redirectUri={window.location.origin}
      screen_hint="signup"
      scope="read"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
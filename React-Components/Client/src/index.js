import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

import Signup from "./components/SignUp/SignUp";
import New from "./components/Backendfront/new";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    {/* < DailyDairy/> */}
    <New/>

  </React.StrictMode>
);

reportWebVitals();

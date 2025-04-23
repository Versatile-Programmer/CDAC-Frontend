import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById("root")).render(

    
    <RecoilRoot>
      <App/>
    </RecoilRoot>
    
);

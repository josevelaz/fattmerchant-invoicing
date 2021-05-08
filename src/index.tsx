import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@fontsource/roboto";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ApiProvider } from "./api";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <App />
      <ToastContainer />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

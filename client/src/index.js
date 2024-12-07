import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./utils.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer autoClose={2000} />
    <App />
  </>
);

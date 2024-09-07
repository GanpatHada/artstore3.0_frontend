import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import router from "./Router";
import { UserProvider } from "./context/userContext";
import ProductProvider from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

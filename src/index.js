import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import router from "./Router";
import { UserProvider } from "./context/userContext";
import ProductProvider from "./context/ProductContext";
import Alert from "./components/alert/Alert";
import CheckoutProvider from "./context/CheckoutContext";
import UserInitializer from "./components/UserInitializer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <UserInitializer/>
    <CheckoutProvider>
      <ProductProvider>
        <Alert />
        <RouterProvider router={router} />
      </ProductProvider>
    </CheckoutProvider>
    <UserInitializer/>
  </UserProvider>
);

reportWebVitals();

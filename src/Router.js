import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/products/Products";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Profile from "./pages/account/components/profile/Profile";
import Address from "./pages/account/components/address/Address";
import Order from "./pages/account/components/orders/Order";
import AddAddress from "./pages/add_address/AddAddress";
import PrivateRoute from "./components/private_route/PrivateRoute";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import ProductDetails from "./pages/product_details/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/my_account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/my_account/profile",
            element: <Profile />,
          },
          {
            path: "/my_account/address",
            element: <Address />,
          },
          {
            path: "/my_account/orders",
            element: <Order />,
          },
        ],
      },
      {
        path: "/my_account/address/add",
        element: (
          <PrivateRoute>
            <AddAddress />
          </PrivateRoute>
        ),
      },
      {
        path: "/my_account/address/edit/:addressId",
        element: (
          <PrivateRoute>
            <AddAddress />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;

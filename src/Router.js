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
import AddAddress from "./pages/add_address/AddAddress";
import PrivateRoute from "./components/private_route/PrivateRoute";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import ProductDetails from "./pages/product_details/ProductDetails";
import Checkout from "./pages/checkout/Checkout";
import Order from "./pages/order/Order";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success/:razorpay_order_id/:razorpay_payment_id/:razorpay_signature",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

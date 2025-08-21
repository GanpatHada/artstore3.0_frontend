import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./pages/error/Error";
import PageNotFound from "./pages/page-not-found/PageNotFound";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/product_details/ProductDetails";
import Review from "./pages/review/Review";
import SellerHome from "./pages/seller_home/SellerHome";

import PrivateRoute from "./components/private_route/PrivateRoute";
import PublicRoute from "./components/public-route/PublicRoute";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import Checkout from "./pages/checkout/Checkout";
import PaymentSuccess from "./pages/payment-success/PaymentSuccess";

import Account from "./pages/account/Account";
import MyProfile from "./pages/account/components/my-profile/MyProfile";
import MyOrders from "./pages/account/components/my-orders/MyOrders";
import MyAddresses from "./pages/account/components/my-addresses/MyAddresses";
import OrderDetails from "./pages/account/components/order-details/OrderDetails";
import AddAddress from "./pages/add_address/AddAddress";

import { CartProvider } from "./context/CartContext";
import ProductDetailsProvider from "./context/ProductDetailsContext";
import { WishlistProvider } from "./context/WishlistContext";

const privateWrapper = (component) => <PrivateRoute>{component}</PrivateRoute>;

const publicWrapper = (component) => <PublicRoute>{component}</PublicRoute>;

const router = createBrowserRouter([
  {
    path: "/login",
    element: publicWrapper(<Login />),
  },
  {
    path: "/signup",
    element: publicWrapper(<Signup />),
  },
  {
    path: "/checkout",
    element: privateWrapper(<Checkout />),
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "seller", element: <SellerHome /> },
      {
        path: "payment-success",
        element: privateWrapper(<PaymentSuccess />),
      },
      { path: "products", element: <Products /> },
      {
        path: "products/:productId",
        element:
          <ProductDetailsProvider>
            <ProductDetails />
          </ProductDetailsProvider>
      },
      {
        path: "products/:productId/review/:reviewId?",
        element:privateWrapper(<Review/>)
      },
      {
        path: "cart",
        element: privateWrapper(
          <CartProvider>
            <Cart />
          </CartProvider>
        ),
      },
      {
        path: "wishlist",
        element: privateWrapper(
        <WishlistProvider>
          <Wishlist />
        </WishlistProvider>),
      },
      {
        path: "my_account",
        element: privateWrapper(<Account />),
        children: [
          { path: "profile", element: <MyProfile /> },
          { path: "address", element: <MyAddresses /> },
          { path: "orders", element: <MyOrders /> },
        ],
      },
      {
        path: "my_account/orders/order_details",
        element: privateWrapper(<OrderDetails />),
      },
      {
        path: "my_account/address/:action/:addressId?",
        element: privateWrapper(<AddAddress />),
      },
    ],
  },
  {
    path: "/page-not-found",
    element: <PageNotFound />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

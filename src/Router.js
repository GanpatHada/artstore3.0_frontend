import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/products/Products";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import AddAddress from "./pages/add_address/AddAddress";
import PrivateRoute from "./components/private_route/PrivateRoute";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import ProductDetails from "./pages/product_details/ProductDetails";
import Checkout from "./pages/checkout/Checkout";
import SellerHome from "./pages/seller_home/SellerHome";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import MyProfile from "./pages/account/components/my-profile/MyProfile";
import MyOrders from "./pages/account/components/my-orders/MyOrders";
import MyAddresses from "./pages/account/components/my-addresses/MyAddresses";
import Review from "./pages/review/Review";
import ProductDetailsLayout from "./pages/product_details/ProductDetailsLayout";
import PublicRoute from "./components/public-route/PublicRoute";
import { CartProvider } from "./context/CartContext";
import PaymentSuccess from "./pages/payment-success/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />{" "}
      </PublicRoute>
    ),
  },
  {
    path: "/checkout", element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
  },
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/seller", element: <SellerHome /> },
      { path: "/products", element: <Products /> },
      {
        path: "/products/:productId", element: <ProductDetailsLayout />,
        children: [
          {
            index: true,
            element: <ProductDetails />,
          },
          {
            path: "review",
            element: (
              <PrivateRoute>
                <Review />
              </PrivateRoute>
            ),
          },
        ],
      },

      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartProvider>
              <Cart />
            </CartProvider>
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
          { path: "profile", element: <MyProfile /> },
          { path: "address", element: <MyAddresses /> },
          { path: "orders", element: <MyOrders /> },
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
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess/>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

export default router;

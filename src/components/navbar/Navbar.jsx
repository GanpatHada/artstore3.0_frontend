import { Link } from "react-router-dom";
import cartLogo from "../../images/cart_icon.svg";
import "./Navbar.css";
import DotLoader from "../dot-loader/DotLoader";
import { useUser } from "../../hooks/useUser";
import { SlLocationPin } from "react-icons/sl";
import Search from "../search/Search";
import SubNav from "../subNav/SubNav";

const Logo = () => {
  return (
    <section >
      <Link id="logo" to="/">Artstore</Link>
    </section>
  );
};

const DefaultAddress = () => {
  const { user, userLoading } = useUser();
  const getUserDefaultAddress = () => {
    const primaryAddress = user?.addresses[0];
    if (primaryAddress) {
      const { city, pinCode } = primaryAddress;
      return `${city} ${pinCode}`;
    } else return "Address";
  };
  return (
    <section id="address">
      <Link to="/my_account/address">
        <span className="all-centered">
          <SlLocationPin />
        </span>
        <div>
          <h5>
            Delivering to{" "}
            {userLoading ? <DotLoader /> : getUserDefaultAddress()}
          </h5>
          <p>
            <strong>Update location</strong>
          </p>
        </div>
      </Link>
    </section>
  );
};

const Profile = () => {
  const { user, userLoading } = useUser();
  const getUserName = () => {
    return user?.fullName.slice(0, 7) || "Login";
  };
  return (
    <Link to="/my_account/profile" id="account-nav">
      <div>
        <h5>Hello , {userLoading ? <DotLoader /> : getUserName()}</h5>
        <p>
          <strong>Account & List</strong>
        </p>
      </div>
    </Link>
  );
};

const MyOrders = () => {
  return (
    <Link to="/my_account/orders">
      <div>
        <h5>Returns</h5>
        <p>
          <strong>& Orders</strong>
        </p>
      </div>
    </Link>
  );
};

const Cart = () => {
  const { user } = useUser();
  return (
    <Link id='cart' to="/cart">
      <img src={cartLogo} alt="" />
      {user && <i id="cart-badge">{user?.cart?.length}</i>}
    </Link>
  );
};

const Wishlist = () => {
  return (
    <Link to="/wishlist">
      <div>
        <h5>Wishlist</h5>
        <p>
          <strong>& saved</strong>
        </p>
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div id="nav-wrapper">
      <nav>
      <ul>
        <li><Logo /></li>
        <li><DefaultAddress /></li>
        <li><Search /></li>
        <li><Profile /></li>
        <li><MyOrders /></li>
        <li><Cart /></li>
        <li><Wishlist /></li>
        <li><SubNav/></li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;

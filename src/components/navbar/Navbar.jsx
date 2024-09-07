import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import { BsSearch } from "react-icons/bs";
import cartLogo from "../../images/cart_icon.svg";
import "./Navbar.css";
import DotLoader from "../dot-loader/DotLoader";
const Navbar = () => {
  const navigate = useNavigate();
  const {
    state: { user, userLoading },
  } = useContext(UserContext);

  const getUserDefaultAddress = () => {
    if (user) {
      if (user.addresses.length > 0) {
        const { city } = user.addresses[0];
        if (city.length > 7)
          return city.slice(0, 7).concat(" ...");
        return city;
      }
    }
    return "Sign In"
   
  };

  const getUserName = () => {
    if (!user?.userName) return "Sign in";
    const { userName } = user;
    if (userName.length > 7) return userName.slice(0, 7).concat(" ...");
    return userName;
  };

  return (
    <nav>
      <section id="logo">
        <Link to="/">Artstore</Link>
      </section>
      <section id="address">
        <Link to="/my_account/address">
          <span>
            Delivering to{" "}
            {userLoading ? <DotLoader /> : getUserDefaultAddress()}
          </span>
          <strong>Update location</strong>
        </Link>
      </section>
      <section id="search-box" onClick={() => navigate("/products")}>
        <input type="search" placeholder="search in artstore" />
        <button>
          <BsSearch />
        </button>
      </section>
      <section className="navs">
        <ul>
          <li>
            <Link to="/my_account" id="account-nav">
              <span>Hello , {userLoading ? <DotLoader /> : getUserName()}</span>
              <strong>Account & List</strong>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <img src={cartLogo} alt="" />
              {user && <i id="cart-badge">{user?.cart?.length}</i>}
            </Link>
          </li>
          <li>
            <Link to="/wishlist">wishlist</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;

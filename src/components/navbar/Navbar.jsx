import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import cartLogo from "../../images/cart_icon.svg";
import "./Navbar.css";
import DotLoader from "../dot-loader/DotLoader";
import { useUser } from "../../hooks/useUser";
const Navbar = () => {
  const {user,userLoading}=useUser()
  
  const navigate = useNavigate();
  const getUserDefaultAddress = () => {
    return user?.addresses[0]?.city || 'Address'
  };

  const getUserName = () => {
    return user?.fullName.slice(0,7) || 'Login'
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

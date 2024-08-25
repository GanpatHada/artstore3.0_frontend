import React from "react";
import artstoreLogo from "../../images/artstore_logo.svg";
import cartLogo from "../../images/cart_icon.svg";
import "./Navbar.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate();
  return (
    <nav>
      <section id="logo">
        <Link to='/'>Artstore</Link>
      </section>
      {/* <section id="address">
        <Link to="/my_account/address">
           <span>Delivering to Mumbai 400014</span>
           <strong>Update location</strong>
        </Link>
      </section> */}
      <section id="search-box" onClick={()=>navigate("/products")}>
        <input type="search" placeholder="search in artstore" />
        <button>
          <BsSearch />
        </button>
      </section>
      <section className="navs">
        <ul>
          <li>
            <Link to="/my_account" id="account-nav">
                <span>Hello, sign in</span>
                <strong>Account & List</strong>
            </Link>
          </li>
          <li>
            <Link to="/userId/cart">
              <img src={cartLogo} alt="" />
              <i id="cart-badge">5</i>
            </Link>
          </li>
          <li>
            <Link to="/userId/wishlist">wishlist</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;

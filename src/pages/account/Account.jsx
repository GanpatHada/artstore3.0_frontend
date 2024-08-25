import React from "react";
import "./Account.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const Account = () => {
  const location=useLocation()  
  const getUrl=()=>{
    let url=location.pathname;
    console.log(url)
    url=url.replaceAll("/my_account","");
    url=url.replace("/","")
    return url.toUpperCase();

  }

  return (
    <div id="account-page">
      <div>
        <h1>My Account</h1>
        <p className="breadcrumbs">
          My Account {'>'} <span>{getUrl()}</span>
        </p>
        <div>
          <NavLink
            to={"/my_account/profile"}
            className={({ isActive }) => {
              return isActive ? "nav-active-box" : "nav-default-box";
            }}
          >
            <h4>Profile</h4>
            <p>view or edit your profile</p>
          </NavLink>
          <NavLink
            to={"/my_account/address"}
            className={({ isActive }) => {
              return isActive ? "nav-active-box" : "nav-default-box";
            }}
          >
            <h4>Address</h4>
            <p>edit,add or change your default address</p>
          </NavLink>
          <NavLink
            to={"/my_account/orders"}
            className={({ isActive }) => {
              return isActive ? "nav-active-box" : "nav-default-box";
            }}
          >
            <h4>My orders</h4>
            <p>track your order details from here</p>
          </NavLink>
        </div>
      </div>
      <div>
      <Outlet />
      </div>
      
    </div>
  );
};

export default Account;

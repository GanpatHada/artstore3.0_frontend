import React from "react";
import "./SellerHome.css";
import { useNavigate } from "react-router-dom";
const SellerHome = () => {
  const navigate=useNavigate()
 
  return (
    <div id="seller-welcome-page">
      <section>
              <div id="seller-auth-action">
                   <button id="seller-login-button" onClick={()=>navigate(`/seller/login`,{ state: { to: '/seller/dashboard' }})}>Login</button>
                   <button id="seller-signup-button" onClick={()=>navigate('/seller/signup')}>Signup</button>
                   <div id="seller-button-style">
                   </div>
              </div>
      </section>
    </div>
  );
};

export default SellerHome;

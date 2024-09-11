import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {

  const handleBackToTop=()=>{
    window.scrollTo({top:0})
  }

  return (
    <footer id="main-footer">
      <button onClick={handleBackToTop}>Back to top</button>
      <main>
        <div>
          <h4>Get to Know us</h4>
          <Link>About us</Link>
          <Link>Privacy policy</Link>
          <Link>Terms and conditions</Link>
          <Link>Meet the developer</Link>
        </div>
        <div>
          <h4>Contact with us</h4>
          <a href="/" target="_blank">Facebook</a>
          <a href="/" target="_blank">Instagram</a>
          <a href="/" target="_blank">Twitter</a>
          <a href="/" target="_blank">Whatsapp</a>
          <a href="/" target="_blank">Telegram</a>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link>Your Account</Link>
          <Link>Your Orders</Link>
          <Link>Rate the app</Link>
          <Link>Suggestions</Link>
        </div>
      </main>
      <footer>
        copyright &#169; All rights reserved @ artstore3.vercel.app 2024
      </footer>
    </footer>
  );
};

export default Footer;

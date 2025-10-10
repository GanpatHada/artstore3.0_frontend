import "./SellerHome.css";

const SellerHome = () => {
  return (
    <div id="seller-welcome-page">
      <section>
        <div id="seller-auth-action">
          <a
            id="seller-login-button"
            href="https://artstoreseller.vercel.app/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
          <a
            id="seller-signup-button"
            href="https://artstoreseller.vercel.app/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            Signup
          </a>
          <div id="seller-button-style"></div>
        </div>
      </section>
    </div>
  );
};

export default SellerHome;

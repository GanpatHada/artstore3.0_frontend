import React, {useState } from "react";
import isEmail from "validator/lib/isEmail";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import AuthErrorBox from "./AuthErrorBox";
import { login } from "../../services/AuthService";
import Loader from "../../images/loading.gif";
import { saveLogin } from "../../utils/AuthHelper";
import { toast } from "react-toastify";


const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
  });
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value, [name + "Error"]: null });
  };

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const checkEmptyFields = () => {
    const { email, password } = loginDetails;

    let emptyFields = false;
    let emailError = null;
    let passwordError = null;

    if (email.trim().length === 0) {
      emptyFields = true;
      emailError = "Email is required *";
    }

    if (password.trim().length === 0) {
      emptyFields = true;
      passwordError = "Password is required *";
    }
    setLoginDetails({ ...loginDetails, emailError, passwordError });
    return emptyFields;
  };

  const checkValidFields = () => {
    const { email } = loginDetails;

    let validFields = true;
    let emailError = null;

    if (!isEmail(email)) {
      validFields = false;
      emailError = "Invalid email";
    }

    setLoginDetails({ ...loginDetails, emailError });

    return validFields;
  };

  const handleLogin = async () => {
    setServerError(null);
    const emptyFields = checkEmptyFields();
    if (emptyFields) return 0;
    const validFields = checkValidFields();
    if (!validFields) return 0;


    const userCredentials={email:loginDetails.email,password:loginDetails.password}
    try {
      startLoading();
      const result = await login(userCredentials,startLoading,stopLoading);
      if(!result.token)
         return setServerError(result.message);
      saveLogin(result.token);
      navigate("/"); 
    }catch(error) {
        toast.error('something went wrong')
    }
    finally{
      stopLoading();
    }
   
    
  };
  return (
    <div className="auth-page">
      <AuthHeader />
      {serverError && <AuthErrorBox message={serverError} />}
      <section className="auth-box">
        <h1>Sign In</h1>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input
            className={
              loginDetails.emailError ? "error-input" : "default-input"
            }
            type="text"
            id="email"
            name="email"
            value={loginDetails.email}
            onChange={(e) => handleFieldChange(e)}
          />
          {loginDetails.emailError && (
            <i className="field-info">{loginDetails.emailError}</i>
          )}
        </div>
        <div>
          <label htmlFor="password">Enter Password</label>
          <input
            className={
              loginDetails.passwordError ? "error-input" : "default-input"
            }
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={loginDetails.password}
            onChange={(e) => handleFieldChange(e)}
          />
          {loginDetails.passwordError && (
            <i className="field-info">{loginDetails.passwordError}</i>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={toggleShowPassword}
            id="show-password"
          />
          &nbsp;
          <label htmlFor="show-password">Show Password</label>
        </div>
        <button
          className="auth-button primary-btn all-centered"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? <img src={Loader} alt="Login ..." /> : "Login"}
        </button>
        <p>
          Do not have an account <Link to="/signup">Signup</Link> Here
        </p>
      </section>
    </div>
  );
};

export default Login;

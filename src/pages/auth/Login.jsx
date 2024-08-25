import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import AuthErrorBox from "./AuthErrorBox";
import { login } from "../../services/AuthService";
import useNetworkStatus from "../../hooks/NetworkStatus";


const Login = () => {
  const{isOnline}=useNetworkStatus();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
  });
  const [serverError,setServerError]=useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value, [name + "Error"]: null });
  };

  const startLoading=()=>setLoading(true);

  const stopLoading=()=>setLoading(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async() => {
    const { email, password } = loginDetails;

    let emailError = null;
    let passwordError = null;

    if (email.trim().length === 0) emailError = "Email is required *";

    if (password.trim().length === 0) passwordError = "Enter Password *";

    if (!isEmail(email) && email.trim().length !== 0) emailError = "Enter valid Email";

    if (!emailError && !passwordError) {
      // login({email,password});
      const result = await login({email,password},startLoading,stopLoading);
      if(result.token)
          navigate('/login');
      else
         setServerError(result.message);   
    } else
      return setLoginDetails({ ...loginDetails, emailError, passwordError });
  };

  return (
    <div className="auth-page">
      <AuthHeader/>
      {serverError&&<AuthErrorBox message={serverError}/>}
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
          />&nbsp;
          <span>Show Password</span>
        </div>

        <button className="auth-button primary-btn" disabled={loading} onClick={handleLogin}>
        {loading?'Login ...':'Login'}
        </button>
        Do not have an account <Link to='/signup'>Signup</Link> Here
      </section>
      
    </div>
  );
};

export default Login;

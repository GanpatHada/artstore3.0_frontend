import React, {useState } from "react";
import { Link, useLocation, useNavigate,} from "react-router-dom";
import {login } from "../../services/AuthService";
import {verifyLoginFields } from "../../utils/AuthHelper";
import { toast } from "react-toastify";
import AuthHeader from "./AuthHeader";
import "./Auth.css";
import {useUser} from '../../hooks/useUser'

const Login = () => {
  const{setUserDetails}=useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const targetLocation=location.state?.to || -1;
  console.log(targetLocation)
  const initialLoginState={
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
  }
  const [loginDetails, setLoginDetails] = useState(initialLoginState);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value, [name + "Error"]: null });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);


  const handleLogin = async (e) => {
    e.preventDefault();
    const{email,password}=loginDetails;
    const{emailError,passwordError}=verifyLoginFields(email,password);
    if(emailError || passwordError)
      return setLoginDetails({...loginDetails,emailError,passwordError})
    try {
      setLoading(true);
      const result=await login(email,password);
      if(!result.success)
        return toast.error(result.message);
      setUserDetails({...result.data.user,...result.data.accessToken})
      navigate(targetLocation,{replace:true});
    } catch (error) {
      toast.error('Unable to process your request at the moment');
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <AuthHeader />
      <section className="auth-box">
        <form onSubmit={handleLogin}>
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
            type="submit"
            className="auth-button primary-btn all-centered"
            style={{backgroundColor:loading &&'#e1e1e1'}}
            disabled={loading}
          >
            {loading ? "Login ...":'Login'}
          </button>
          <p id="signup-link">
            Do not have an account <Link to="/signup">Signup</Link> Here
          </p>

         
        </form>
      </section>
    </div>
  );
};

export default Login;

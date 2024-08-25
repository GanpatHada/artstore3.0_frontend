import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import './Auth.css'
import AuthHeader from "./AuthHeader";
import AuthErrorBox from "./AuthErrorBox";
import { signup } from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userNameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
  });
  const [serverError,setServerError]=useState(null);
  const navigate=useNavigate()
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value,
      [name + "Error"]: null,
    });
  };

  const checkEmptyFields = () => {
    const { userName, email, password } = signupDetails;

    let emptyFields = false;
    let userNameFieldError = null;
    let emailFieldError = null;
    let passwordFieldError = null;

    if (userName.trim().length === 0) {
      emptyFields = true;
      userNameFieldError = "name is required *";
    }
    if (email.trim().length === 0) {
      emptyFields = true;
      emailFieldError = "email is required *";
    }
    if (password.trim().length === 0) {
      emptyFields = true;
      passwordFieldError = "password is required *";
    }

    setSignupDetails({
      ...signupDetails,
      userNameError: userNameFieldError,
      emailError: emailFieldError,
      passwordError: passwordFieldError,
    });

    return emptyFields;
  };

  const checkValidFields = () => {
    let validFields = true;
    let emailFieldError = null;
    let passwordFieldError = null;
    let confirmPasswordFieldError = null;

    const { email, password, confirmPassword } = signupDetails;

    if (!isEmail(email)) {
      validFields = false;
      emailFieldError = "Invalid email address";
    }
    if (password.trim().length < 6) {
      validFields = false;
      passwordFieldError = "Password must be atleast 6 characters";
    }
    if (confirmPassword.trim() !== password.trim()) {
      validFields = false;
      confirmPasswordFieldError = "please confirm password";
    }

    setSignupDetails({
      ...signupDetails,
      emailError: emailFieldError,
      passwordError: passwordFieldError,
      confirmPasswordError: confirmPasswordFieldError,
    });

    return validFields
  };

  const handleSignup = async() => {
    const{userName,email,password}=signupDetails
    const emptyFields = checkEmptyFields();
    if (emptyFields) return 0;
    const validFields = checkValidFields();
    if(validFields)
    {
      const result=await signup({userName,email,password})
      if(result.token)
        navigate('/login')
      else
        setServerError(result.message)

    }
  };

  return (
    <div className="auth-page">
      <AuthHeader/>
      {serverError&&<AuthErrorBox message={serverError}/>}
      <div className="auth-box">
        <h1>Create Account</h1>
        <div>
          <label htmlFor="userName">Enter full Name</label>
          <input
            type="text"
            maxLength={30}
            className={
              signupDetails.userNameError ? "error-input" : "default-input"
            }
            id="userName"
            value={signupDetails.userName}
            name="userName"
            onChange={(e) => handleFieldChange(e)}
          />
          {signupDetails.userNameError && (
            <i className="field-info">{signupDetails.userNameError}</i>
          )}
        </div>
        <div>
          <label htmlFor="signup-email">Enter email</label>
          <input
            className={
              signupDetails.emailError ? "error-input" : "default-input"
            }
            type="text"
            id="signup-email"
            value={signupDetails.email}
            name="email"
            onChange={(e) => handleFieldChange(e)}
          />
          {signupDetails.emailError && (
            <i className="field-info">{signupDetails.emailError}</i>
          )}
        </div>
        <div>
          <label htmlFor="signup-password">Enter Password</label>
          <input
            className={
              signupDetails.passwordError ? "error-input" : "default-input"
            }
            type="password"
            id="signup-password"
            value={signupDetails.password}
            placeholder="password should be atleast 6 characters"
            name="password"
            onChange={(e) => handleFieldChange(e)}
          />
          {signupDetails.passwordError && (
            <i className="field-info">{signupDetails.passwordError}</i>
          )}
        </div>
        <div>
          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input
            className={
              signupDetails.confirmPasswordError
                ? "error-input"
                : "default-input"
            }
            type="password"
            id="signup-confirm-password"
            value={signupDetails.confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleFieldChange(e)}
          />
          {signupDetails.confirmPasswordError && (
            <i className="field-info">{signupDetails.confirmPasswordError}</i>
          )}
        </div>
        <button className="primary-btn auth-button" onClick={handleSignup}>
          Create Account
        </button>
        Already have an account <Link to='/login'>login</Link>
      </div>
    </div>
  );
};

export default Signup;

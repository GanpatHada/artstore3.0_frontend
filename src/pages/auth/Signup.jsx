import { useState } from "react";
import AuthHeader from "./AuthHeader";
import { fetchUserRegistration} from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { verifySignupFields } from "../../utils/AuthHelper";
import { toast } from "react-toastify";
import "./Auth.css";
const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    fullNameError: null,
    emailError: null,
    phoneError: null,
    passwordError: null,
    confirmPasswordError: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value,
      [name + "Error"]: null,
    });
  };

const handleSignup = async (e) => {
  e.preventDefault();

  const { fullName, email, phone, password, confirmPassword } = signupDetails;

  const {
    emailError,
    phoneError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  } = verifySignupFields(fullName, email, phone, password, confirmPassword);

  const hasErrors = emailError || phoneError || passwordError || fullNameError || confirmPasswordError;

  if (hasErrors) {
    setSignupDetails((prev) => ({
      ...prev,
      emailError,
      phoneError,
      passwordError,
      fullNameError,
      confirmPasswordError,
    }));
    return;
  }
  try {
    setLoading(true);
    const data = await fetchUserRegistration(fullName, email, phone, password);
    navigate("/login",{state:{email:data}});
  } catch (error) {
    toast.error(error|| "Unable to process your request at the moment.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="auth-page">
      <AuthHeader />
      <div className="auth-box">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <div>
            <label htmlFor="fullName">Enter full Name</label>
            <input
              type="text"
              maxLength={30}
              className={
                signupDetails.fullNameError ? "error-input" : "default-input"
              }
              id="userName"
              value={signupDetails.fullName}
              name="fullName"
              onChange={(e) => handleFieldChange(e)}
            />
            {signupDetails.fullNameError && (
              <i className="field-info">{signupDetails.fullNameError}</i>
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
            <label htmlFor="signup-phone">Enter Phone number</label>
            <input
              className={
                signupDetails.phoneError ? "error-input" : "default-input"
              }
              type="text"
              id="signup-phone"
              value={signupDetails.phone}
              name="phone"
              onChange={(e) => handleFieldChange(e)}
            />
            {signupDetails.phoneError && (
              <i className="field-info">{signupDetails.phoneError}</i>
            )}
          </div>

          <div>
            <label htmlFor="signup-password">Enter Password</label>
            <input
              className={signupDetails.passwordError ? "error-input" : "default-input"}
              type="password"
              id="signup-password"
              value={signupDetails.password}
              placeholder="Password should be atleast 6 characters"
              name="password"
              onChange={(e) => handleFieldChange(e)}
              autoComplete="new-password"
            />
            {signupDetails.passwordError && (
              <i className="field-info">{signupDetails.passwordError}</i>
            )}
          </div>
          <div>
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input
              className={signupDetails.confirmPasswordError? "error-input": "default-input"}
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
          <div>
            <button
              className="primary-btn auth-button"
              style={{ backgroundColor: loading && "#e1e1e1" }}
              type="submit"
            >
              {`${loading
                  ? "Creating..."
                  : `Create Account`
                }`}
            </button>
          </div>
          <p id="login-link">
            Already have an account <Link to={`/login`}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

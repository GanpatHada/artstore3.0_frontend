import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUserLogin } from "../../services/AuthService";
import { verifyLoginFields } from "../../utils/AuthHelper";
import { toast } from "react-toastify";
import AuthHeader from "./AuthHeader";
import "./Auth.css";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const { setUserDetails} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultEmail = location.state?.email || "";
  const redirectTo = location.state?.from?.pathname || "/";

  const [loginDetails, setLoginDetails] = useState({
    email: defaultEmail,
    password: "",
    emailError: null,
    passwordError: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFieldChange = ({ target: { name, value } }) => {
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: null,
    }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;
    const { emailError, passwordError } = verifyLoginFields(email, password);

    if (emailError || passwordError) {
      return setLoginDetails((prev) => ({
        ...prev,
        emailError,
        passwordError,
      }));
    }

    try {
      setLoading(true);
      const { user, accessToken } = await fetchUserLogin(email, password);
      setUserDetails({ ...user, accessToken });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error?.message || "Unable to process your request.");
    } finally {
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
            <label htmlFor="email">Enter Email or phone</label>
            <input
              className={loginDetails.emailError ? "error-input" : "default-input"}
              type="text"
              id="email"
              name="email"
              value={loginDetails.email}
              autoComplete="username"
              onChange={handleFieldChange}
              required
            />
            {loginDetails.emailError && (
              <i className="field-info">{loginDetails.emailError}</i>
            )}
          </div>

          
          <div>
            <label htmlFor="password">Enter Password</label>
            <input
              className={loginDetails.passwordError ? "error-input" : "default-input"}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={loginDetails.password}
              autoComplete="current-password"
              onChange={handleFieldChange}
              required
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
            disabled={loading}
            style={{ backgroundColor: loading ? "#e1e1e1" : undefined }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p id="signup-link">
            Don't have an account? <Link to="/signup">Signup</Link> here
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;

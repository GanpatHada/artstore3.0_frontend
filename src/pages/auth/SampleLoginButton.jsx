import React, { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { fetchUserLogin } from "../../services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spin_Loader from '../../images/spinner.svg';

const SampleLoginButton = () => {
  const {setUserDetails}=useUser();
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || "/";


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, accessToken } = await fetchUserLogin();
      setUserDetails({ ...user, accessToken });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error?.message || "Unable to process your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={handleLogin} id="sample-login-btn">
      {loading&&<img src={Spin_Loader}  alt="..." />} Login as a Guest
    </button>
  );
};

export default SampleLoginButton;

import React from "react";
import './Alert.css'
import { Bounce,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Alert = () => {
  return <ToastContainer hideProgressBar={true} position="top-center" theme="colored" transition={Bounce}/>;
};

export default Alert;

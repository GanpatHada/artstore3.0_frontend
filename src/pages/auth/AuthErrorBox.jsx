import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

const AuthErrorBox = ({message}) => {
  return (
    <div id="auth-error-box">
      <div>
        <AiOutlineWarning id="auth-error-icon" />
      </div>
      <div>
        <h3>Message</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AuthErrorBox;

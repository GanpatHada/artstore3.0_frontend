import React from "react";
import "./Error.css";
import { useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-heading">Oops!</h1>
        <h2 className="error-subheading">Something Went Wrong</h2>
        <p className="error-message">
          {error ? error.message : "An unexpected error has occurred."}
        </p>
        <div className="error-buttons">
          <button className="error-button" onClick={handleGoHome}>
            Go to Homepage
          </button>
          <button
            className="error-button refresh-button"
            onClick={handleRefresh}
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;

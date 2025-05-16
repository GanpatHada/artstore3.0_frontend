import React from 'react'
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css'
const PageNotFound = () => {
    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
    <div className="not-found-content">
      <h1 className="not-found-heading">404</h1>
      <h2 className="not-found-subheading">Page Not Found</h2>
      <p className="not-found-message">
        Oops! It seems the page you're looking for doesn't exist.
      </p>
      <button className="not-found-button" onClick={handleGoHome}>
        Go to Homepage
      </button>
    </div>
  </div>
  );
  
}

export default PageNotFound

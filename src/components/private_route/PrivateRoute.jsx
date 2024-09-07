import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const {
    state: { user, userLoading },
  } = useContext(UserContext);
  const isAuthenticated = user;
  return (
    <>{!userLoading && (isAuthenticated ? children : <Navigate to="/login" />)}</>
  );
};

export default PrivateRoute;

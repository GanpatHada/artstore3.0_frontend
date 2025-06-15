import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const {state: { user, userLoading },} = useContext(UserContext);
  const location = useLocation();
  const isAuthenticated = user;
  let userDetailsFound = false;
  if (user)
    userDetailsFound = Object.keys(user).length !== 0;
  return (
    <>
      {userLoading ? (
        "fetching user"
      ) : (
        <>
          {!isAuthenticated ? (
            <Navigate to="/login" state={{ from: location }} />
          ) : (
            <>{userDetailsFound ?children :<Navigate to="/"/>}</>
          )}
        </>
      )}
    </>
  );
};

export default PrivateRoute;

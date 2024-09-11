import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const {
    state: { user, userLoading },
  } = useContext(UserContext);
  console.log(user)
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
            <Navigate to="/login" />
          ) : (
            <>{userDetailsFound ?children :<Navigate to="/"/>}</>
          )}
        </>
      )}
    </>
  );
};

export default PrivateRoute;

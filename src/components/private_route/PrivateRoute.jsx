import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../../context/userContext";
import TopLoading from "../top-loading/TopLoading";

const PrivateRoute = ({ children }) => {
  const {
    state: { user, userLoading },
  } = useContext(UserContext);
  const location = useLocation();

  const isAuthenticated = user && Object.keys(user).length > 0;

  if (userLoading) {
    return <TopLoading/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;

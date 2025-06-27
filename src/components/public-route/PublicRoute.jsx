import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const PublicRoute = ({ children }) => {
  const { user } = useUser();
  console.log(user)
  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;

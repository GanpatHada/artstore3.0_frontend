import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { fetchUserDetails } from "../services/UserService";

const UserInitializer = ({ children }) => {
  const { user, setUserDetails, stopUserLoading } = useUser();

  useEffect(() => {
    const getUserDetailsOnLoad = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUserDetails(userDetails);
      } catch (error) {
      } finally {
        stopUserLoading();
      }
    };
    if (!user) {
      getUserDetailsOnLoad();
    } else {
      stopUserLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default UserInitializer;

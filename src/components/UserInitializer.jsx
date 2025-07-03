import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { fetchUserDetails } from "../services/UserService";
import { toast } from "react-toastify";

const UserInitializer = ({ children }) => {
  const { user, setUserDetails, stopUserLoading } = useUser();

  useEffect(() => {
    const getUserDetailsOnLoad = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUserDetails(userDetails);
      } catch (error) {
        toast.error(error.message || "unable to load user details");
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

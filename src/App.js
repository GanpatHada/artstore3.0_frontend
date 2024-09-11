import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./App.css";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";
import SubNav from "./components/subNav/SubNav";
import Footer from "./components/footer/Footer";
import UserContext from "./context/userContext";
import { getUser, isAuthenticated } from "./services/UserService";
import { toast } from "react-toastify";
import { SERVER_ERROR } from "./Constent";

function App() {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  const handleUserLoggedIn = () => user?.userName;

  const handleUserData = async () => {
    try {
      if (!isAuthenticated())
        return dispatch({ type: "SET_USER", payload: null });
      dispatch({ type: "START_USER_LOADING" });
      const user = await getUser();
      if (user.success)
        return dispatch({ type: "SET_USER", payload: { ...user.data } });
    } catch (error) {
      dispatch({ type: "SET_USER", payload: {} });
      toast.error(SERVER_ERROR);
    } finally {
      dispatch({ type: "STOP_USER_LOADING" });
    }
  };

  const fetchUserDetails = async () => {
    const loggedIn = handleUserLoggedIn();
    if (loggedIn) return 0;
    return handleUserData();
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="App">
      <Alert />
      <Navbar />
      <SubNav />
      <main id="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

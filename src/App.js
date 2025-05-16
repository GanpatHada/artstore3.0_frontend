import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SubNav from "./components/subNav/SubNav";
import Footer from "./components/footer/Footer";
import { toast } from "react-toastify";
import { getUser } from "./services/UserService";
import { useUser } from "./hooks/useUser";
import FilterProvider from "./context/FilterContext";
import CheckoutProvider from "./context/CheckoutContext";

function App() {
  const {user,setUserDetails, stopUserLoading } = useUser();

  const fetchUserDetails = async () => {
    try {
      const {user,accessToken} = await getUser();
      setUserDetails({...user,accessToken});
    } catch (error) {
      toast.error(error.message || "unable to fetch user details");
    } finally {
      stopUserLoading();
    }
  };

  useEffect(() => {
    if(!user)
       fetchUserDetails();
  }, []);

  return (
    <div className="App">
      <FilterProvider>
        <Navbar />
        <SubNav />
        <CheckoutProvider>
        <main id="app-content">
          <Outlet />
        </main>
        </CheckoutProvider>
        <Footer />
      </FilterProvider>
    </div>
  );
}

export default App;

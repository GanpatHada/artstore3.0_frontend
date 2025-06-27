import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useUser } from "./hooks/useUser";
import FilterProvider from "./context/FilterContext";
import CheckoutProvider from "./context/CheckoutContext";
import { fetchUserDetails } from "./services/UserService";

function App() {
  const { user, setUserDetails, stopUserLoading } = useUser();
  console.log(user);
  const getUserDetailsOnLoad = async () => {
    try {
      const userDetails = await fetchUserDetails();
      setUserDetails(userDetails);
    } catch (error) {
    } finally {
      stopUserLoading();
    }
  };

  useEffect(() => {
    if (!user) 
      getUserDetailsOnLoad();
  }, []);

  return (
    <div className="App">
      <FilterProvider>
        <Navbar />
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

import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SubNav from "./components/subNav/SubNav";
import Footer from "./components/footer/Footer";
import { getUser } from "./services/UserService";
import { useUser } from "./hooks/useUser";
import FilterProvider from "./context/FilterContext";
import CheckoutProvider from "./context/CheckoutContext";

function App() {
  const {user,setUserDetails, stopUserLoading } = useUser();
  console.log(user)

  const fetchUserDetails = async () => {
    try {
      const {user,accessToken} = await getUser();
      setUserDetails({...user,accessToken});
    }
    catch (error) {
      console.log(error)
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

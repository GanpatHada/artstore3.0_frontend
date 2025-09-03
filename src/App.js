import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import FilterProvider from "./context/FilterContext";
import CustomAlert from "./components/alert/CustomAlert";

function App() {
  return (
    <div className="App">
      <CustomAlert/>
      <FilterProvider>
        <Navbar />
        <main id="app-content">
          <Outlet />
        </main>
        <Footer />
      </FilterProvider>
    </div>
  );
}

export default App;

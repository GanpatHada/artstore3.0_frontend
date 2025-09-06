import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import FilterProvider from "./context/FilterContext";
import CustomAlert from "./components/alert/CustomAlert";
import BodyCover from "./components/body_cover/BodyCover";
import { useState } from "react";
import SideNav from "./components/side_nav/SideNav";

function App() {
  const [showCover,setShowCover]=useState(false);
  const [sideNav,setSideNav]=useState(false)
  return (
    <div className="App">
      <CustomAlert/>
      <FilterProvider>
        <Navbar setSideNav={setSideNav} setShowCover={setShowCover} />
        {sideNav&&<SideNav setSideNav={setSideNav}/>}
        {showCover&&<BodyCover/>}
        <main id="app-content">
          <Outlet />
        </main>
        <Footer />
      </FilterProvider>
    </div>
  );
}

export default App;

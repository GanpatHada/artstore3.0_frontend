import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SubNav from "./components/subNav/SubNav";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer
         hideProgressBar={true}
         position="top-center"
      />
      <Navbar />
      <SubNav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import "./SpinLoader.css";
import Spin_Loader from '../../images/spinner.svg';
const SpinLoader = () => {
  return (
    <div id="spin-loader-wrapper" className="all-centered">
      <div id="spin-loader"><img src={Spin_Loader} alt="" /></div>
    </div>
  );
};

export default SpinLoader;

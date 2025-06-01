import React from "react";
import "./SpinLoader.css";
import Spin_Loader from '../../images/spinner.svg';
const SpinLoader = ({size}) => {
  return (
    <div id="spin-loader-wrapper" className="all-centered">
      <div id="spin-loader" style={{height:`${size}px`}}>
        <img src={Spin_Loader}  alt="" />
      </div>
    </div>
  );
};

export default SpinLoader;

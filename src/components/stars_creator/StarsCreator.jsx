import React from "react";
import "./StarsCreator.css";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { makeStarArray } from "../../utils/ProductHelper";
const StarsCreator = ({starsCount}) => {
  const starArray=makeStarArray(starsCount)
  return(
    <div id="stars-pic">
      {starArray.map((star, index) => {
        if (star === "FULL_STAR") return <IoMdStar key={index}/>;
        if (star === "HALF_STAR") return <IoMdStarHalf key={index} />;
        return <IoMdStarOutline key={index} />;
      })}
    </div>
  );
};

export default StarsCreator;

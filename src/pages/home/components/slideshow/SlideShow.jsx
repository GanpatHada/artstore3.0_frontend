import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import poster1 from "../../../../images/artstore_poster_1.svg";
import poster2 from "../../../../images/artstore_poster2.svg";
import poster3 from "../../../../images/artstore_poster3.svg";
import "./SlideShow.css";
const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesArray = [
    <img src={poster1} alt="" />,
    <img src={poster2} alt="" />,
    <img src={poster3} alt="" />,
  ];

  const handleSlide = (action) => {
    if (action === "PREV") {
      setCurrentSlide((currentSlide-1+3)%3)
    }
    if (action === "NEXT") {
      setCurrentSlide((currentSlide+1)%3)
    }
  };

  return (
    <section id="slide-show">
      <div className="slides">
        {slidesArray[currentSlide]}
      </div>
      <button id="slide-prev-button" onClick={() => handleSlide("PREV")}>
        <GrPrevious />
      </button>
      <button id="slide-next-button" onClick={() => handleSlide("NEXT")}>
        <GrNext />
      </button>
    </section>
  );
};

export default SlideShow;

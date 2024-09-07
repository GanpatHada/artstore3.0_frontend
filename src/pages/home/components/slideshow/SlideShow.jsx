import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import poster1 from "../../../../images/artstore_poster_1.svg";
import poster2 from "../../../../images/Buddha.jpg";
import poster3 from "../../../../images/demo_image_1.png";
import "./SlideShow.css";
const SlideShow = () => {
  const [slideTransform, setSlideTransform] = useState(0);
  const [currentSlide,setCurrentSlide]=useState(0)
  const slidesArray = [
    <img src={poster1} alt="" />,
    <img src={poster2} alt="" />,
    <img src={poster3} alt="" />,
    <img src={poster2} alt="" />,
    <img src={poster3} alt="" />,
  ];

  const handleSlide = (action) => {
    if (action === "PREV") {
    }
    if (action === "NEXT") {
      setSlideTransform(20);
      setCurrentSlide(currentSlide+1)

    }
  };

  return (
    <section id="slide-show">
      <div
        id="slides-container"
        style={{ transform: `translateX(-${slideTransform}%)` }}
      >
        {slidesArray.map((slides, index) => {
          return (
            <div key={index} className="slides">
              {slides}
            </div>
          );
        })}
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

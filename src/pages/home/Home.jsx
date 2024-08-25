import "./Home.css";
import poster1 from "../../images/artstore_poster_1.svg";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import demoImage1 from "../../images/Buddha.jpg";
import demoImage2 from "../../images/demo_image_1.png";

const Categories = () => {
  return (
    <section id="categories">
      {/* <div>
        <h2>1 Today's deal </h2>
        <div className="image-wrapper">
        <img src={demoImage1} alt="..." />
        </div>
        <button className="action">see more</button>
      </div>
      <div>
        <h2>2 50% off</h2>
        <div className="image-wrapper">
        <img src={demoImage2} alt="..." />
        </div>
        <button className="action">see more</button>
      </div>
      <div>
        <h2>3 Few in stocks</h2>
        <div className="image-wrapper">
        <img src={demoImage1} alt="..." />
        </div>
        <button className="action">see more</button>
      </div>
      <div>
        <h2>3 Few in stocks</h2>
        <div className="image-wrapper">
        <img src={demoImage1} alt="..." />
        </div>
        <button className="action">see more</button>
      </div>
      <div>
        <h2>3 Few in stocks</h2>
        <div className="image-wrapper">
        <img src={demoImage1} alt="..." />
        </div>
        <button className="action">see more</button>
      </div>
      <div>
        <h2>3 Few in stocks</h2>
        <div className="image-wrapper">
        <img src={demoImage1} alt="..." />
        </div>
        <button className="action">see more</button>
      </div>
      <div>
        <h2>3 Few in stocks</h2>
        <div className="image-wrapper">
        <img src={demoImage1} alt="..." />
        </div>
        <button className="action">see more</button>
      </div> */}
      {/* <div>
        <h2>3 Few in stocks</h2>
        <div className="image-wrapper">
        <img src={demoImage1} alt="..." />
        </div>
        <button className="action">see more</button>
      </div> */}
      <div><h2>Heading</h2>
        <div className="image-wrapper">
          <img src={demoImage1} alt="..." />
        </div>
      </div>
      <div><h2>Heading</h2>
        <div className="image-wrapper">
          <img src={demoImage1} alt="..." />
        </div>
      </div>
      <div><h2>Heading</h2>
        <div className="image-wrapper">
          <img src={demoImage1} alt="..." />
        </div>
      </div>
      <div><h2>Heading</h2>
        <div className="image-wrapper">
          <img src={demoImage1} alt="..." />
        </div>
      </div>
      <div><h2>Heading</h2>
        <div className="image-wrapper">
          <img src={demoImage1} alt="..." />
        </div>
      </div>
      <div><h2>Heading</h2>
        <div className="image-wrapper">
          <img src={demoImage1} alt="..." />
        </div>
      </div>
      <div><h2>Heading</h2>
        <div className="image-wrapper">
          <img src={demoImage1} alt="..." />
        </div>
      </div>
    </section>
  );
};

const SlideShow = () => {
  return (
    <section id="slide-show">
      <img src={poster1} alt="" />
      <button id="slide-prev-button">
        <GrPrevious />
      </button>
      <button id="slide-next-button">
        <GrNext />
      </button>
    </section>
  );
};

const Home = () => {
  return (
    <div id="home">
      <SlideShow />
      <Categories />
    </div>
  );
};

export default Home;

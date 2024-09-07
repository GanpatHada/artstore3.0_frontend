import "./Home.css";
import Categories from "./components/categories/Categories";
import SlideShow from "./components/slideshow/SlideShow";

const Home = () => {
  return (
    <div id="home">
      <SlideShow />
      <Categories />
    </div>
  );
};

export default Home;

import "./Home.css";
import Categories from "./components/categories/Categories";
import SlideShow from "./components/slideshow/SlideShow";

const HomeContent = () => {
  return (
    <div id="home-content">
      <SlideShow />
      <Categories />
    </div>
  );
};

const Home = () => {
  return (
    <div id="home">
      <HomeContent />
    </div>
  );
};

export default Home;

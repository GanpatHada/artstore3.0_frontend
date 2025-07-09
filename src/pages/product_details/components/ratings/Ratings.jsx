import "./Ratings.css";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import {
  ratingCount,
} from "../../../../utils/ProductDetailsHelper";
import { useProductDetails } from "../../../../hooks/useProductDetails";


const RatingCount = ({ rating, count, total }) => {
  const percentage = total === 0 ? 0 : ((count / total) * 100).toFixed(0); 

  return (
    <>
      <span>{rating} star</span>
      <div className="rate-graph">
        <div
          className="rate-graph-progress"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
      <span>{percentage}%</span>
    </>
  );
};


const Ratings = () => {
  const {
    productDetails: { averageRatings, reviews },
  } = useProductDetails();

  const ratingMap = ratingCount(reviews); 

  console.log(ratingMap)
  return (
    <section id="ratings-section">
      <h3>Ratings</h3>
      <span id="ratings-pic">
        <StarsCreator starsCount={averageRatings} />
        <i id="ratings-count">{averageRatings} out of 5</i>
      </span>
      <span id="global-ratings">{reviews.length} global ratings</span>
      <div id="ratings-graph">
        {Object.keys(ratingMap)
          .sort((a, b) => b - a)
          .map((rating) => (
            <RatingCount key={rating} rating={+rating} count={ratingMap[rating]} total={reviews.length} />
          ))}
      </div>
    </section>
  );
};

export default Ratings;



import "./Ratings.css";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import {
  getRatingPercentage,
  getRatingsFrequency,
} from "../../../../utils/ProductDetailsHelper";
import { useProductDetails } from "../../../../hooks/useProductDetails";

const ratingMap = [
  { number: 5, numberName: "FIVE" },
  { number: 4, numberName: "FOUR" },
  { number: 3, numberName: "THREE" },
  { number: 2, numberName: "TWO" },
  { number: 1, numberName: "ONE" }
]

const RatingCount = ({ ratingInName, ratingInNumber }) => {
  const {
    productDetails: { reviews },
  } = useProductDetails();
  const ratingsFrequency = getRatingsFrequency(reviews);
  const handleRatingPercentage = (percentType) => {
    return getRatingPercentage(percentType, ratingsFrequency, reviews.length);
  };
  return (
    <>
      <span>{ratingInNumber} star</span>
      <div className="rate-graph">
        <div
          className="rate-graph-progress"
          style={{
            width: `${handleRatingPercentage(ratingInName)}%`,
          }}
        ></div>
      </div>
      <span>{handleRatingPercentage(ratingInName)}%</span>
    </>
  );
};

const Ratings = () => {
  const {
    productDetails: { averageRatings, reviews },
  } = useProductDetails();

  return (
    <section id="ratings-section">
      <h3>Ratings</h3>
      <span id="ratings-pic">
        <StarsCreator starsCount={averageRatings} />
        <i id="ratings-count">{averageRatings} out of 5</i>
      </span>
      <span id="global-ratings">{reviews.length} global ratings</span>
      <div id="ratings-graph">
        {ratingMap.map((rating, index) => {
          return (
            <RatingCount
              key={index}
              ratingInNumber={rating.number}
              ratingInName={rating.numberName}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Ratings;

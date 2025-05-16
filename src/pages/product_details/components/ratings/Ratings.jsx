import React from "react";
import "./Ratings.css";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import {getRatingPercentage,getRatingsFrequency} from "../../../../utils/ProductDetailsHelper";
const Ratings = ({reviews,averageRatings}) => {
  const ratingsFrequency = getRatingsFrequency(reviews);
  const handleRatingPercentage = (percentType) => {
    return getRatingPercentage(
      percentType,
      ratingsFrequency,
      reviews.length
    );
  };

  return (
    <section id="ratings-section">
      <h3>Customer Ratings on Artist</h3>
      <span id="ratings-pic">
        <StarsCreator starsCount={averageRatings} />
        <i id="ratings-count">{averageRatings} out of 5</i>
      </span>
      <span id="global-ratings">{reviews.length} global ratings</span>
      <div id="ratings-graph">
        <div>
          <span>5 star</span>
          <div className="rate-graph">
            <div
              className="rate-graph-progress"
              style={{
                width: `${handleRatingPercentage("FIVE")}%`,
              }}
            ></div>
          </div>
          <span>{handleRatingPercentage("FIVE")}%</span>
        </div>
        <div>
          <span>4 star</span>
          <div className="rate-graph">
            <div
              className="rate-graph-progress"
              style={{
                width: `${handleRatingPercentage("FOUR")}%`,
              }}
            ></div>
          </div>
          <span>{handleRatingPercentage("FOUR")}%</span>
        </div>
        <div>
          <span>3 star</span>
          <div className="rate-graph">
            <div
              className="rate-graph-progress"
              style={{
                width: `${handleRatingPercentage("THREE")}%`,
              }}
            ></div>
          </div>
          <span>{handleRatingPercentage("THREE")}%</span>
        </div>
        <div>
          <span>2 star</span>
          <div className="rate-graph">
            <div
              className="rate-graph-progress"
              style={{
                width: `${handleRatingPercentage("TWO")}%`,
              }}
            ></div>
          </div>
          <span>{handleRatingPercentage("TWO")}%</span>
        </div>
        <div>
          <span>1 star</span>
          <div className="rate-graph">
            <div
              className="rate-graph-progress"
              style={{
                width: `${handleRatingPercentage("ONE")}%`,
              }}
            ></div>
          </div>
          <span>{handleRatingPercentage("ONE")}%</span>
        </div>
      </div>
    </section>
  );
};

export default Ratings;

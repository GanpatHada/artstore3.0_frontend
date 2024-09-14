import React from "react";
import "./Ratings.css";
import { calculateAverageRating } from "../../../../utils/ProductHelper";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import {
  getRatingPercentage,
  getRatingsFrequency,
} from "../../../../utils/ProductDetailsHelper";
const Ratings = ({ratings:ratingsList}) => {
  const ratingsFrequency = getRatingsFrequency(ratingsList);
  const handleRatingPercentage = (percentType) => {
    return getRatingPercentage(
      percentType,
      ratingsFrequency,
      ratingsList.length
    );
  };

  return (
    <section id="ratings-section">
      <h3>Customer Ratings</h3>
      <span id="ratings-pic">
        <StarsCreator starsCount={calculateAverageRating(ratingsList)} />
        <i id="ratings-count">{calculateAverageRating(ratingsList)} out of 5</i>
      </span>
      <span id="global-ratings">{ratingsList.length} global ratings</span>
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

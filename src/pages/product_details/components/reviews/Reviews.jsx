import React from "react";
import "./Reviews.css";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import { useProductDetails } from "../../../../hooks/useProductDetails";
const Reviews = () => {
  const {
    productDetails: { reviews },
  } = useProductDetails();

  console.log(reviews);

  const formatteDate = (date) => {
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <section id="reviews-section">
      <h3>Top Reviews</h3>
      {reviews.map((review) => {
        return (
          <div key={review._id} className="comment-box">
            <section className="profile-section">
              <section className="image-section all-centered">
                <i className="fa-solid fa-user"></i>
              </section>
              <span id="user-name">{review.user.fullName}</span>
            </section>
            <div>
              <div className="ratings">
                <StarsCreator starsCount={review.rating} />
              </div>
              <p id="review-date">
                Reviewed on {formatteDate(review.createdAt)}
              </p>
            </div>
            <p id="user-review">{review.review}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Reviews;

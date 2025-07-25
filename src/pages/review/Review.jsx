import { useNavigate, useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import "./Review.css";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import defaultUserImage from "../../images/userImage.png";
import SpinLoader from '../../components/spin-loader/SpinLoader'
import {
  fetchAddReview,
  fetchEditReview,
  fetchgetReview,
  fetchProductDetails,
} from "../../services/ProductService";
import { toast } from "react-toastify";
import { makeCapitalize } from "../../utils/GlobalUtils";

const stars = new Array(5).fill(null);

const Review = () => {
  const navigate = useNavigate();
  const { user, setUserDetails } = useUser();
  const { productId, reviewId } = useParams();
  const mode = reviewId ? "EDIT" : "ADD";

  const [reviewData, setReviewData] = useState({
    productDetails: null,
    _id: null,
    rating: 0,
    review: "",
    loading: false,
  });

  const updateReviewData = (newData) => {
    setReviewData((prev) => ({ ...prev, ...newData }));
  };

  const isValidReview = () => {
    if (reviewData.rating === 0 || reviewData.review.trim().length === 0) {
      toast.error("* fields are mandatory");
      return false;
    }
    return true;
  };

  const submitReviewHandler = async () => {
    if (!isValidReview()) return;

    updateReviewData({ loading: true });

    try {
      const reviewPayload = {
        rating: reviewData.rating,
        review: reviewData.review,
      };

      if (mode === "EDIT") {
        await fetchEditReview(
          user,
          setUserDetails,
          productId,
          reviewId,
          reviewPayload
        );
        toast.success("Review updated successfully");
      } else {
        await fetchAddReview(user, setUserDetails, productId, reviewPayload);
        toast.success("Review added successfully");
      }
    } catch (error) {
      toast.error(error.message || `Unable to ${mode.toLowerCase()} review`);
    } finally {
      updateReviewData({ loading: false });
      navigate(-1);
    }
  };

  const handleClearReview = () => {
    updateReviewData({ review: "", rating: 0 });
  };

  const getProductAndReview = async () => {
    try {
      updateReviewData({ loading: true });

      const productDetails = await fetchProductDetails(productId, [
        "title,productImages",
      ]);
      updateReviewData({ productDetails });

      if (mode === "EDIT") {
        const myReview = await fetchgetReview(
          user,
          setUserDetails,
          productId
        );
        const { review, rating, _id } = myReview;
        updateReviewData({ review, rating, _id });
      }
    } catch (error) {
      toast.error(error.message || "Unable to load product details");
    } finally {
      updateReviewData({ loading: false });
    }
  };

  useEffect(() => {
    getProductAndReview();
  }, []);

  return (
    <div id="review-page">
      <header>
        <div>
          <span>
            <img src={user?.profileImage || defaultUserImage} alt="user" />
          </span>
          <h4>{user?.fullName}</h4>
          <button className="secondary-text-btn">Edit public name</button>
        </div>
      </header>

      <main>
        {
          reviewData.loading&&<SpinLoader/>
        }
        <h3>{makeCapitalize(mode)} Review</h3>

        <section className="product-info">
          <div id="product-image">
            <img src={reviewData.productDetails?.productImages[0]} alt="product" />
          </div>
          <h4>{reviewData.productDetails?.title}</h4>
        </section>

        <hr />

        <section>
          <h4>Overall rating</h4>
          <div id="stars-wrapper">
            {stars.map((_, index) => (
              <button
                key={index}
                className="star"
                onClick={() => updateReviewData({ rating: index + 1 })}
                title={index + 1}
              >
                {index + 1 <= reviewData.rating ? <FaStar /> : <FaRegStar />}
              </button>
            ))}
          </div>
        </section>

        <hr />

        <section>
          <h4>Add a written review</h4>
          <textarea
            id="write-review"
            value={reviewData.review}
            onChange={(e) =>
              updateReviewData({ review: e.target.value })
            }
          />
        </section>

        <hr />

        <div className="all-centered">
          <span id="review-info">Your review will be available for others</span>
          <button id="clear-review" onClick={handleClearReview}>
            Clear
          </button>
          <button
            id="submit-review"
            className="primary-btn"
            onClick={submitReviewHandler}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default Review;

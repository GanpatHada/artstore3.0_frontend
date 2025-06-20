import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import "./Review.css";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import defaultUserImage from "../../images/userImage.png";
import { fetchAddReview, fetchEditReview } from "../../services/ProductService";
import { toast } from "react-toastify";
import { useProductDetails } from "../../hooks/useProductDetails";
import { makeCapitalize } from "../../utils/GlobalUtils";

const stars = new Array(5).fill(null);
const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { user, setUserDetails } = useUser();
  const { profileImage, fullName } = user;
  const {
    productDetails: { title, productImages, reviews },
  } = useProductDetails();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { addReview, updateReview } = useProductDetails();
  const [loading, setLoading] = useState(false);
  const reviewId = location.state?.reviewId;

  const mode = () => (reviewId ? "EDIT" : "CREATE");

  const addReviewHandler = async () => {
    if (rating === 0 || review.trim().length === 0)
      return toast.error("* fields are mandetory");
    try {
      setLoading(true);
      const addedReview = await fetchAddReview(
        user,
        setUserDetails,
        productId,
        { rating, review }
      );
      addReview(addedReview);
      toast.success("Review added successfully");
    } catch (error) {
      toast.error(error.message || "unable to add review");
    } finally {
      setLoading(false);
      navigate(-1);
    }
  };
  const editReviewHandler = async () => {
    if (rating === 0 || review.trim().length === 0)
      return toast.error("* fields are mandetory");
    try {
      setLoading(true);
      const updatedReview = await fetchEditReview(
        user,
        setUserDetails,
        productId,
        reviewId,
        { rating, review }
      );
      updateReview(updatedReview);
      toast.success("Review updated successfully");
    } catch (error) {
      toast.error(error.message || "unable to edit review");
    } finally {
      setLoading(false);
      navigate(-1);
    }
  };

  const isProductEdited = () => {
    if (mode() !== "EDIT") return false;
    const originalReview = reviews.find((r) => r._id === reviewId);
    if (!originalReview) return false;
    return originalReview.rating !== rating || originalReview.review !== review;
  };

  const handleReviewSubmit = () => {
    if (mode() === "CREATE") return addReviewHandler();
    if (mode() === "EDIT") {
      if (!isProductEdited()) {
        return toast.info("No changes made to the review");
      }
      return editReviewHandler();
    }
  };

  useEffect(() => {
    if (mode() !== "EDIT") return;
    const reviewData = reviews.find((review) => review._id === reviewId);
    if (!reviewData) return;
    setReview(reviewData.review);
    setRating(reviewData.rating);
  }, [reviewId]);

  return (
    <div id="review-page">
      <header>
        <div>
          <span>
            <img src={profileImage || defaultUserImage} alt="" />
          </span>
          <h4>{fullName}</h4>
          <button className="secondary-text-btn">Edit public name</button>
        </div>
      </header>
      <main>
        <h3>{makeCapitalize(mode())} Review</h3>
        <section className="product-info">
          <div id="product-image">
            <img src={productImages[0]} alt="" />
          </div>
          <h4>this is product title {title}</h4>
        </section>
        <hr />
        <section>
          <h4>Overall rating</h4>
          <div id="stars-wrapper">
            {stars.map((star, index) => {
              return (
                <button
                  onClick={() => setRating(index + 1)}
                  title={index + 1}
                  className="star"
                  key={index}
                >
                  {index + 1 <= rating ? <FaStar /> : <FaRegStar />}
                </button>
              );
            })}
          </div>
        </section>
        <hr />
        <section>
          <h4>Add a written review</h4>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            id="write-review"
          ></textarea>
        </section>
        <hr />
        <div className="all-centered">
          <span id="review-info">Your review will be available for others</span>
          <button id="clear-review">Clear</button>
          <button
            disabled={loading}
            onClick={handleReviewSubmit}
            id="submit-review"
            className="primary-btn"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Review;

import "./Reviews.css";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import { useProductDetails } from "../../../../hooks/useProductDetails";
import { useUser } from "../../../../hooks/useUser";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { arrangeReviews, formatteDate } from "../../../../utils/ProductHelper";
import { fetchDeleteReview } from "../../../../services/ProductService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Review = ({ review, productId }) => {
  const isThisMyReview = (revieweeId) => user?._id === revieweeId;
  const [deleting, setDeleting] = useState(false);
  const { user, setUserDetails } = useUser();
  const { deleteReview } = useProductDetails();
  const navigate = useNavigate();

  const handleDeleteReview = async (reviewId) => {
    try {
      setDeleting(true);
      const deletedReview = await fetchDeleteReview(
        user,
        setUserDetails,
        productId,
        reviewId
      );
      deleteReview(deletedReview);
    } catch (error) {
      toast.error(error.message || "unable to delete review");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`comment-box ${deleting && "loading"}`}>
      <section className="profile-section">
        <div>
          <section className="image-section all-centered">
            {review.user?.profileImage ? (
              <img src={review.user?.profileImage} />
            ) : (
              <i className="fa-solid fa-user"></i>
            )}
          </section>
          <span id="user-name">
            {review.user?.fullName || 'unknown'}
            {isThisMyReview(review.user?._id) && <strong>(You)</strong>}
          </span>
        </div>
        {isThisMyReview(review.user?._id) && (
          <div>
            <button onClick={() => navigate(`/products/${productId}/review/${review._id}`)}>
              <FiEdit />
            </button>
            <button onClick={() => handleDeleteReview(review._id)}>
              <FaRegTrashAlt />
            </button>
          </div>
        )}
      </section>
      <div>
        <div className="ratings">
          <StarsCreator starsCount={review.rating} />
        </div>
        <p id="review-date">Reviewed on {formatteDate(review.createdAt)}</p>
      </div>
      <p id="user-review">{review.review}</p>
    </div>
  );
};

const Reviews = () => {
  const {productDetails: { reviews, _id }} = useProductDetails();
  const {user}=useUser()
  return (
    <section id="reviews-section">
      <h3>Top Reviews</h3>
      {arrangeReviews(reviews,user?._id).map((review) => {
        return <Review key={review._id} review={review} productId={_id} />;
      })}
    </section>
  );
};

export default Reviews;

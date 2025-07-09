import { useProductDetails } from '../../../../hooks/useProductDetails';
import { useUser } from '../../../../hooks/useUser'
import './PostReview.css'
import { useNavigate, useParams } from 'react-router-dom'
const PostReview = () => {
  const {user}=useUser();
  const navigate = useNavigate();
  const { productId } = useParams();
  const {productDetails}=useProductDetails()

  const isAlreadyReviewed = productDetails.reviews.find(review=>review.user._id===user?._id)

  return (
    <div id='post-review'>
      <h3>Review this product</h3>
      <p>share your thought with other customers</p>
      <button disabled={isAlreadyReviewed} onClick={() => navigate(`/products/${productId}/review`)}>{isAlreadyReviewed?'Reviewed already':'Write a product review'}</button>
    </div>
  )
}

export default PostReview

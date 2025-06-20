import './PostReview.css'
import { useNavigate, useParams } from 'react-router-dom'
const PostReview = () => {
  const navigate = useNavigate();
  const { productId } = useParams()
  return (
    <div id='post-review'>
      <h3>Review this product</h3>
      <p>share your thought with other customers</p>
      <button onClick={() => navigate(`/products/${productId}/review`)}>Write a product review</button>
    </div>
  )
}

export default PostReview

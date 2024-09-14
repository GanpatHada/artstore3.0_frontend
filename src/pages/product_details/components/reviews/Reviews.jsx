import React from 'react'
import './Reviews.css'
const Reviews = ({reviews}) => {
    
  return (
    <section id="reviews-section">
            <h3>Customers say</h3>
            {reviews.map((review) => {
              return (
                <div key={review.userId} className="comment-box">
                  <section className="profile-section">
                    <section className="image-section all-centered">
                      <i className="fa-solid fa-user"></i>
                    </section>
                    <strong>{review.userId.userName}</strong>
                  </section>
                  <p>
                    {
                      "this is my first comment i have ever write on this platfomr"
                    }
                    {review.review}
                  </p>
                </div>
              );
            })}
          </section>
  )
}

export default Reviews
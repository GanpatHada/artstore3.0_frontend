import React from 'react'
import './Reviews.css'
import StarsCreator from '../../../../components/stars_creator/StarsCreator';
const Reviews = ({reviews}) => {


  const formatteDate=(date)=>{
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    return formattedDate
  }
    
  return (
    <section id="reviews-section">
            <h3>Customers say on Artist</h3>
            {reviews.map((review) => {
              return (
                <div key={review._id} className="comment-box">
                  <section className="profile-section">
                    <section className="image-section all-centered">
                      <i className="fa-solid fa-user"></i>
                    </section>
                    <span id='user-name'>{review.user.fullName}</span>
                  </section>
                  <StarsCreator starsCount={review.userRatings}/>
                  <p id='review-date'>Reviewed on {formatteDate(review.createdAt)}</p>
                  <p id='user-review'>{review.userReview}</p>
                </div>
              );
            })}
          </section>
  )
}

export default Reviews
export function makeStarArray(ratingCount){
    const starArray=[];
    for(let i=0;i<5;i++)
        {
           if(i<Math.floor(ratingCount))
            starArray.push('FULL_STAR');
          else
             if(i<ratingCount)
               starArray.push('HALF_STAR')
            else
              starArray.push('EMPTY_STAR')
        }
     return starArray   
}

export const formatteDate = (date) => {
  const formattedDate = new Date(date);

  const datePart = formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const timePart = formattedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart}, ${timePart}`;
};


export const arrangeReviews = (reviews, userId) => {
  const userReview = reviews.find((review) => review.user?._id === userId);
  const otherReviews = reviews
    .filter((review) => review.user?._id !== userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return userReview ? [userReview, ...otherReviews] : otherReviews;
};

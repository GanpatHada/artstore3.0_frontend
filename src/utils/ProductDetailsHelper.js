export const ratingCount =(reviews)=> {
  const ratingCount=reviews.reduce((acc, curr) => {
  const rating = curr.rating;
  acc[rating] = (acc[rating] || 0) + 1;
  return acc;
}, {});

for (let i = 1; i <= 5; i++) {
  if (!ratingCount[i]) ratingCount[i] = 0;
}

return ratingCount
}


export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((total / reviews.length).toFixed(1));
};
export function calculateOffPrice(discountInPercent, actualPrice) {
  return Math.floor((actualPrice / 100) * discountInPercent);
}

export function calculatePrice(discountInPercent, actualPrice) {
  return actualPrice - calculateOffPrice(discountInPercent, actualPrice);
}

export function calculateAverageRating(ratings) {
  const sumOfRatings = ratings.reduce((acc, cur) => {
    return (acc = acc + cur.rating);
  }, 0);
  return sumOfRatings / ratings.length;
}

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
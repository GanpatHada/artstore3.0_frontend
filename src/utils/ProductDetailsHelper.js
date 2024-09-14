export function getRatingsFrequency(ratingsList) {
  const ratingsFrequency = ratingsList.reduce(
    (acc, cur) => {
      if (cur.rating === 1) return { ...acc, ONE: acc.ONE + 1 };
      if (cur.rating === 2) return { ...acc, TWO: acc.TWO + 1 };
      if (cur.rating === 3) return { ...acc, THREE: acc.THREE + 1 };
      if (cur.rating === 4) return { ...acc, FOUR: acc.FOUR + 1 };
      if (cur.rating === 5) return { ...acc, FIVE: acc.FIVE + 1 };
      return { ...acc };
    },
    { ONE: 0, TWO: 0, THREE: 0, FOUR: 0, FIVE: 0 }
  );
  return ratingsFrequency;
}


export function getRatingPercentage(percentCountInWords,ratingsFrequency,totalRatings){
   return (ratingsFrequency[percentCountInWords]/totalRatings)*100
}

function StarRating({ rating, onStarClick }) {
  const starNum = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-2">
      {starNum.map(star => (
        <span
          role="button"
          key={star}
          onClick={() => onStarClick(star)}
          className={
            star <= rating ? 'text-[24px] text-starBlue' : 'text-[24px] text-starWhite'
          }
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default StarRating;

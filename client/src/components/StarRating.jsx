function StarRating({ rating, onStarClick }) {
  const starNum = [1, 2, 3, 4, 5];

  return (
    <div className="flex">
      {starNum.map(star => (
        <span
          key={star}
          onClick={() => onStarClick(star)}
          className={
            star <= rating ? 'text-[24px] text-[#7199ff]' : 'text-[24px] text-[#c3c3c3]'
          }
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default StarRating;

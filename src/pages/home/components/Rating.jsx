
const Rating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center">

      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= rating
              ? "text-yellow-400 text-sm"
              : "text-gray-300 text-sm"
          }
        >
          ★
        </span>
      ))}

    </div>
  );
};

export default Rating;

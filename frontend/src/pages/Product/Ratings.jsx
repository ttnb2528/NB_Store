import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStarts = Math.floor(value);
  const halfStarts = value - fullStarts > 0.5 ? 1 : 0;
  const emptyStart = 5 - fullStarts - halfStarts;

  return (
    <div className="flex items-center">
      {[...Array(fullStarts)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-1`} />
      ))}

      {halfStarts === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}

      {[...Array(emptyStart)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} ml-1`} />
      ))}

      <span className={`rating-text ml-[2rem] text-${color}`}>
        {text && text}
      </span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;

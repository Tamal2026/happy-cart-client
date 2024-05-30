import { useState } from "react";

const AddReview = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleTextAreaChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
  
    console.log("Review text:", reviewText);
    console.log("Rating:", rating);
 
    setReviewText("");
    setRating(0);
  };

  return (
    <div>
      <h2 className="font-semibold font-sans my-4 text-xl">Add Your Review</h2>
      <textarea
        value={reviewText}
        onChange={handleTextAreaChange}
        placeholder="Write your review here..."
        rows={6}
        cols={50}
      />
      <div className="flex w-1/6 justify-between items-center mb-5">
        <p className="font-semibold ">Give Rating:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span className="text-3xl"
            key={star}
            onClick={() => handleRatingChange(star)}
            style={{ cursor: "pointer", color: star <= rating ? "#90ee90" : "gray" }}
          >
            ★
          </span>
        ))}
      </div>
      <button className="btn bg-blue-500 text-white font-bold" onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default AddReview;

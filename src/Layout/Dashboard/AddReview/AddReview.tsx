import { useContext, useState, ChangeEvent } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext,AuthContextType } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const axiosPublic = useAxiosPublic();
  const authContext = useContext(AuthContext) as AuthContextType;
  const { user } = authContext;
  const navigate = useNavigate();

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const name = user ? user.displayName || "Anonymous" : "Anonymous";
  const email = user ? user.email || "" : "";
  const reviewData = {
    name: name,
    email: email,
    reviewText: reviewText,
    rating: rating,
  };

  const handleSubmit = async () => {
    const res = await axiosPublic.post("/reviews", reviewData);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Thanks For your Feedback",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    navigate("/");
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
          <span
            className="text-3xl"
            key={star}
            onClick={() => handleRatingChange(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "#90ee90" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>
      <button
        className="btn bg-blue-500 text-white font-bold"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default AddReview;

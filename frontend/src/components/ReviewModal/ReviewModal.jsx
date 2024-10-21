import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../store/reviews';  // Import postReview
import './ReviewModal.css';

const ReviewModal = ({ spotId, onClose }) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    // Validate the form input
    if (reviewText.length < 10) validationErrors.push('Review must be at least 10 characters.');
    if (!stars) validationErrors.push('Stars must be selected.');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Dispatch the postReview action to submit the review
    const reviewData = { review: reviewText, stars };

    try {
      await dispatch(postReview(spotId, reviewData));
      onClose();  // Close the modal after a successful review submission
    } catch (err) {
      console.error('Error posting review:', err);
      setErrors([err.message || 'Failed to post the review.']);
    }
  };

  return (
    <div className="review-modal">
      <h2>How was your stay?</h2>

      {/* Display errors */}
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        <div className="star-rating">
          <label>Stars</label>
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
          />
        </div>

        <button type="submit" disabled={reviewText.length < 10 || !stars}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewModal;

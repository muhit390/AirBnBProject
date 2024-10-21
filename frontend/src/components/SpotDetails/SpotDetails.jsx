import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../store/spots';
import { fetchSpotReviews, deleteReview } from '../../store/reviews'; // Import deleteReview
import './SpotDetails.css';
import { FaStar } from 'react-icons/fa';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewModal from '../ReviewModal/ReviewModal';

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots[spotId]);
  const reviews = useSelector(state => Object.values(state.reviews));
  const [error, setError] = useState(null);

  // Fetch spot details and reviews when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSpotById(spotId));
        await dispatch(fetchSpotReviews(spotId));
      } catch (err) {
        setError('Failed to load spot details.');
      }
    };
    fetchData();
  }, [dispatch, spotId]);

  if (error) return <div>{error}</div>;
  if (!spot) return <div>Loading...</div>;

  const isOwner = sessionUser?.id === spot.ownerId;
  const userReviewExists = reviews.some(review => review.userId === sessionUser?.id);

  const handleDeleteReview = async (reviewId) => {
    try {
      await dispatch(deleteReview(reviewId));
    } catch (err) {
      setError('Failed to delete review.');
    }
  };

  // Sort reviews in reverse chronological order
  const sortedReviews = reviews.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Handle Reserve button click
  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  return (
    <div className="spot-details">
      <div className="spot-main-content">
        <h1>{spot.name}</h1>
        <div className="spot-location">
          Location: {spot.city}, {spot.state}, {spot.country}
        </div>

        <div className="large-image">
          <img
            src={spot.previewImage || "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg"}
            alt={spot.name || 'Spot Image'}
            className="large-image"
          />
        </div>

        {/* Small Images */}
        {spot.SpotImages && spot.SpotImages.length > 0 && (
          <div className="small-images">
            {spot.SpotImages.map((image, idx) => (
              <img
                key={idx}
                src={image.url || "https://via.placeholder.com/150"}
                alt={`Spot image ${idx}`}
                className="small-image"
              />
            ))}
          </div>
        )}

        <div className="spot-host">
          Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
        </div>

        {/* Callout Information Box */}
        <div className="callout-box">
          <div className="dis">
            <p className="spot-description">{spot.description || 'No description available'}</p>
          </div>
          <div className="price">
            <strong>${spot.price}</strong> / night
            <button onClick={handleReserveClick} className="reserve-btn">Reserve</button>
          </div>
        </div>

        {/* Review Summary in both locations */}
        <div className="review-summary">
          <FaStar className="star-icon" />
          {spot.avgStarRating ? spot.avgStarRating.toFixed(1) : 'New'}
          {spot.numReviews > 0 && (
            <>
              &nbsp;·&nbsp;
              {spot.numReviews === 1 ? '1 Review' : `${spot.numReviews} Reviews`}
            </>
          )}
        </div>

        {/* "Post Your Review" Button with Modal */}
        {sessionUser && !isOwner && !userReviewExists && (
          <OpenModalMenuItem
            itemText="Post Your Review"
            modalComponent={<ReviewModal spotId={spotId} />}
            className="post-review-btn-container"
          />
        )}

        {/* Reviews Section */}
        <div className="reviews-list">
          <h2>Reviews</h2>
          {sortedReviews.length === 0 ? (
            <p>Be the first to post a review!</p>
          ) : (
            sortedReviews.map((review) => (
              <div key={review.id} className="review">
                <h3>{review.User?.firstName || 'Anonymous'}</h3>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="review-text">{review.review}</p>
                <div className="review-stars">
                  {[...Array(review.stars)].map((_, i) => (
                    <FaStar key={i} className="filled-star" />
                  ))}
                </div>
                {/* Delete Button for Review Author */}
                {sessionUser && sessionUser.id === review.userId && (
                  <button className="delete-review-btn" onClick={() => handleDeleteReview(review.id)}>
                    Delete Review
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;

import { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import './SpotsList.css';

const SpotsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch spots from Redux state
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    // Fetch spots when the component mounts
    dispatch(fetchSpots());
  }, [dispatch]);

  // If no spots are available, display a message
  if (!spots || spots.length === 0) {
    return <div>No spots available</div>;
  }

  return (
    <div className="container">  {/* Added container div */}
        <h1>Find Your Next Getaway</h1>
      <div className="spots-list">
        {spots.map((spot) => (
          <div
            key={spot.id}  // Ensure each spot has a unique key
            className="spot-tile"
            onClick={() => navigate(`/spots/${spot.id}`)}
            title={spot.name || spot.address}
          >

            <img
              src={spot.previewImage || "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg"}
              alt={spot.name ? `${spot.name} image` : 'Spot Image'}
              onError={(e) => (e.target.src = "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg")}  // Fallback if image fails
            />
            {/* <div className="spot-location">
              {spot.name}
            </div> */}

            <div className="spot-name">
              <h2>{spot.name}</h2>
            </div>

            <div className="spot-location">
              {spot.city}, {spot.state}
             <FaStar className="star-icon" />
                {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}{/* Show 'New' or the average rating */}

            </div>
             {/* Spot Rating */}


            <div className="spot-price">${spot.price ? spot.price : 'N/A'} /night</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotsList;

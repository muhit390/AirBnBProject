// frontend/src/components/ManageSpots/ManageSpots.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSpots, deleteSpot } from '../../store/spots';  // Import deleteSpot action
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ManageSpots.css'; // Add necessary styles

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSpots = useSelector((state) => Object.values(state.spots));  // Get the user spots from the store

  useEffect(() => {
    dispatch(fetchUserSpots());  // Fetch the spots created by the logged-in user
  }, [dispatch]);

  // Function to handle spot deletion
  const handleDeleteSpot = async (spotId) => {
    if (window.confirm("Are you sure you want to delete this spot?")) {
      try {
        await dispatch(deleteSpot(spotId));  // Dispatch the delete action
        alert("Spot successfully deleted.");
      } catch (error) {
        console.error("Failed to delete the spot", error);
        alert("Failed to delete the spot. Please try again.");
      }
    }
  };

  if (!userSpots.length) {
    return (
      <div className='no-spot-container'>
        <h1>Manage Spots</h1>
        <p>You have not created any spots yet.</p>
        <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
      </div>
    );
  }

  return (
    <div className="manage-spots">
      <h1>Manage Spots</h1>
      <div className="spots-list">
        {userSpots.map((spot) => (
          <div key={spot.id} className="spot-tile" onClick={() => navigate(`/spots/${spot.id}`)}>
            <img src={spot.previewImage || "https://via.placeholder.com/150"} alt="Spot preview" />
            <div>{spot.city}, {spot.state}
                <FaStar className="star-icon" />
                    {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}</div>
            <div> ${spot.price}/night</div>
            <button onClick={(e) => {
              e.stopPropagation();
              navigate(`/spots/${spot.id}/edit`); // Navigate to the update form
            }}>Update</button>
            <button onClick={(e) => {
              e.stopPropagation();
              handleDeleteSpot(spot.id);  // Call the delete handler
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSpots;

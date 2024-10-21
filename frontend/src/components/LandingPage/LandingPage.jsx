// frontend/src/components/LandingPage/LandingPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spotsSlice';
import SpotTile from '../SpotTile';
import './LandingPage.css';

function LandingPage() {
  const dispatch = useDispatch();
  const { spots, loading, error } = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="landing-page">
      <h1>All Spots</h1>
      <div className="spots-grid">
        {spots.map((spot) => (
          <SpotTile key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;

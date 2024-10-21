import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSpotById, updateSpot } from '../../store/spots'; // Import updateSpot
import './UpdateSpotForm.css';

const UpdateSpotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);

  // State for all form fields, including lat and lng
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [lat, setLat] = useState('');  // State for Latitude
  const [lng, setLng] = useState('');  // State for Longitude
  const [previewImage, setPreviewImage] = useState('');
  const [images, setImages] = useState(['', '', '', '', '']);
  const [errors, setErrors] = useState([]);

  // Fetch spot by ID when component loads
  useEffect(() => {
    dispatch(fetchSpotById(spotId));
  }, [dispatch, spotId]);

  // Populate form fields once the spot data is available
  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
      setLat(spot.lat); // Set Latitude
      setLng(spot.lng); // Set Longitude
      setPreviewImage(spot.previewImage);
    }
  }, [spot]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = [];

    // Validation
    if (!country) validationErrors.push('Country is required');
    if (!address) validationErrors.push('Address is required');
    if (!city) validationErrors.push('City is required');
    if (!state) validationErrors.push('State is required');
    if (!description || description.length < 30) validationErrors.push('Description needs 30 or more characters');
    if (!name) validationErrors.push('Name is required');
    if (!price || isNaN(price)) validationErrors.push('Price is required');
    if (!previewImage) validationErrors.push('Preview Image URL is required');
    if (!lat || isNaN(lat)) validationErrors.push('Latitude is required and must be a valid number');
    if (!lng || isNaN(lng)) validationErrors.push('Longitude is required and must be a valid number');

    // Set errors if validation fails
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare spot data for submission
    const spotData = {
      country,
      address,
      city,
      state,
      description,
      name,
      price: Number(price),
      lat: parseFloat(lat),  // Ensure lat is a float
      lng: parseFloat(lng),  // Ensure lng is a float
      previewImage,
      images: images.filter((image) => image !== ''),  // Filter out empty image URLs
    };

    // Dispatch update spot action
    const updatedSpot = await dispatch(updateSpot(spotId, spotData));

    // Navigate to updated spot's details page
    if (updatedSpot) {
      navigate(`/spots/${spotId}`);
    }
  };

  return (
    <div className="update-spot-form">
      <h1>Update your Spot</h1>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}

        {/* Form fields with existing spot data pre-populated */}
        <div className="form-section">
          <h2>Where is your place located?</h2>
          <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          <input type="text" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
          <input type="text" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
          <input type="text" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />
        </div>

        <div className="form-section">
          <h2>Describe your place to guests</h2>
          <textarea
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-section">
          <h2>Create a title for your spot</h2>
          <input type="text" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-section">
          <h2>Set a base price for your spot</h2>
          <input type="number" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="form-section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          {images.map((img, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Image URL ${idx + 1}`}
              value={img}
              onChange={(e) => {
                const newImages = [...images];
                newImages[idx] = e.target.value;
                setImages(newImages);
              }}
            />
          ))}
        </div>

        <button type="submit">Update your Spot</button>
      </form>
    </div>
  );
};

export default UpdateSpotForm;

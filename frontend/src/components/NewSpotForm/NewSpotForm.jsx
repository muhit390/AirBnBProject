import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';  // Redux action to create a spot
import './NewSpotForm.css';

const NewSpotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form fields
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [lat, setLat] = useState('');  // Added lat field
  const [lng, setLng] = useState('');  // Added lng field
  const [previewImage, setPreviewImage] = useState('');
  const [images, setImages] = useState(['', '', '', '', '']);

  // Errors state
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    // Validate form inputs
    if (!country) validationErrors.push('Country is required');
    if (!address) validationErrors.push('Address is required');
    if (!city) validationErrors.push('City is required');
    if (!state) validationErrors.push('State is required');
    if (!description || description.length < 30) validationErrors.push('Description needs 30 or more characters');
    if (!name) validationErrors.push('Name is required');
    if (!price || isNaN(price)) validationErrors.push('Price is required');
    if (!lat || isNaN(lat)) validationErrors.push('Latitude is required and must be a number');
    if (!lng || isNaN(lng)) validationErrors.push('Longitude is required and must be a number');
    if (!previewImage) validationErrors.push('Preview Image URL is required');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare the form data for submission
    const newSpotData = {
      country,
      address,
      city,
      state,
      description,
      name,
      price: Number(price),
      lat: parseFloat(lat),  // Make sure lat is a float
      lng: parseFloat(lng),  // Make sure lng is a float
      previewImage,
      images: images.filter((image) => image !== ''),  // Filter out empty image URLs
    };

    // Dispatch the action to create the spot
    const createdSpot = await dispatch(createSpot(newSpotData));

    // Redirect to the newly created spot's detail page
    if (createdSpot) {
      navigate(`/spots/${createdSpot.id}`);
    }
  };

  return (
    <div className="new-spot-form">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}

        {/* Location Inputs */}
        <div className="form-section">
          <h2>Where is your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          <input type="text" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
          <input type="text" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />  {/* New lat input */}
          <input type="text" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />  {/* New lng input */}
        </div>

        {/* Description Input */}
        <div className="form-section">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea placeholder="Please write at least 30 characters" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Name Input */}
        <div className="form-section">
          <h2>Create a title for your spot</h2>
          <p>Catch guests attention with a spot title that highlights what makes your place special.</p>
          <input type="text" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Price Input */}
        <div className="form-section">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <input type="number" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        {/* Image Upload Inputs */}
        <div className="form-section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input type="text" placeholder="Preview Image URL" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
          {images.map((img, idx) => (
            <input
              key={idx}
              type="text"
              placeholder="Image URL"
              value={img}
              onChange={(e) => {
                const newImages = [...images];
                newImages[idx] = e.target.value;
                setImages(newImages);
              }}
            />
          ))}
        </div>

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default NewSpotForm;

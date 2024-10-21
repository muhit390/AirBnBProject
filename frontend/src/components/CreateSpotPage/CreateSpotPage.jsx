// frontend/src/components/CreateSpotPage/CreateSpotPage.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spotsSlice';
import { useNavigate } from 'react-router-dom';
import './CreateSpotPage.css';

function CreateSpotPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    price: '',
    lat: '',
    lng: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSpot(formData)).then(() => {
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a Spot</h1>
      <input type="text" name="name" placeholder="Spot Name" value={formData.name} onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
      <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
      <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      <button type="submit">Create Spot</button>
    </form>
  );
}

export default CreateSpotPage;

import React, { useState } from 'react';
import axios from 'axios';
import './CreatePosts.css'

const CreatePosts = () => {
  const [formData, setFormData] = useState({
    productCategory: 'Crops', // Default value
    product: '',
    minPrice: '',
    agreementType: 'Pre-harvest', // Default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/buyers/me/post', formData, {
        headers: {
          'Content-Type': 'application/json',
           "Authorization": `Bearer ${token}` 
        },
      });

      if (response.status === 200) {
        // Handle success (e.g., clear form, show success message)
        alert('Post created successfully!!');
      } else {
        // Handle error
        alert('Failed to create post!!');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  return (
    <div className="buyer-posts">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Category:</label>
          <select name="productCategory" value={formData.productCategory} onChange={handleChange}>
            <option value="Crops">Crops</option>
            <option value="Dairy">Dairy</option>
            <option value="Poultry">Poultry</option>
          </select>
        </div>
        <div>
          <label>Product:</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Minimum Price:</label>
          <input
            type="text"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Agreement Type:</label>
          <select name="agreementType" value={formData.agreementType} onChange={handleChange}>
            <option value="Pre-harvest">Pre-harvest</option>
            <option value="Post-harvest">Post-harvest</option>
          </select>
        </div>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  )
}

export default CreatePosts

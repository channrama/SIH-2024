import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Layout from '../Components/Layout';
import './csspages/Farmer.css';
import BASE_URL from '../service/BaseAddress';

const Farmer = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [formData, setFormData] = useState({
    productType: '',
    product: '',
    minPrice: '',
    agreementType: 'Pre-harvest',
  });
  const [appliedFarmers, setAppliedFarmers] = useState(new Set());

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('/allfarmers', config);
        setFarmers(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchFarmers();
  }, []);

  const openModal = (farmer) => {
    setSelectedFarmer(farmer);
    setFormData({ ...formData, productType: farmer.productCategory });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFarmer(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(
        `/farmers/${selectedFarmer._id}/agreements/request`,
        formData,
        config
      );
      alert(response.data); // Handle the response as needed
      setAppliedFarmers((prev) => new Set(prev).add(selectedFarmer._id)); 
      closeModal();
    } catch (error) {
      console.error('Failed to send agreement request:', error);
      // Handle the error as needed
    }
  };

  return (
    <>
      <Layout>
        <div className="farmerList">
          <button id="filter">Filter</button>
          {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : farmers.length === 0 ? (
          <p>No farmers found.</p>
        ) : (
            <table className="farmerTable">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Farmer Name</th>
                  <th>Address</th>
                  <th>Product Type</th>
                  <th>Products</th>
                  <th>Land</th>
                  <th>Request for Agreement</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((farmer) => (
                  <tr key={farmer._id}>
                    <td>
                      <img
                        src={`${BASE_URL}/images/${farmer.photo || 'default-photo.jpg'}`}
                        alt={farmer.username}
                        className="farmerPhoto"
                      />
                    </td>
                    <td>{farmer.username}</td>
                    <td>{farmer.address}</td>
                    <td>{farmer.productCategory}</td>
                    <td>{farmer.products.join(', ')}</td>
                    <td>{farmer.land} acres</td>
                    <td>
                    <button
                        onClick={() => openModal(farmer)}
                        disabled={appliedFarmers.has(farmer._id)}
                      >
                        {appliedFarmers.has(farmer._id) ? 'Requested' : 'Request'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Request Agreement"
          className="requestModal"
          overlayClassName="requestModalOverlay"
        >
          <h2>Request Agreement with {selectedFarmer?.username}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Product Type:</label>
              <input
                type="text"
                name="productType"
                value={formData.productType}
                readOnly
              />
            </div>
            <div>
              <label>Product:</label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Minimum Price:</label>
              <input
                type="text"
                name="minPrice"
                value={formData.minPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
            <label>Agreement Type:</label>
          <select name="agreementType" value={formData.agreementType} onChange={handleChange}>
            <option value="Pre-harvest">Pre-harvest</option>
            <option value="Post-harvest">Post-harvest</option>
          </select>
            </div>
            <button type="submit" >Submit Request</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </Modal>
      </Layout>
    </>
  );
};

export default Farmer;

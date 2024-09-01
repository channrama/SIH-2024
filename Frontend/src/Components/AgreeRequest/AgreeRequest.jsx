import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AgreeRequest.css'

const AgreeRequest = ({userId,role}) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/agreerequest', config);
      setRequests(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (request) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const agreementDetails = {
        farmerId: request.farmerId,
        buyerId: request.buyerId,
        productType: request.productType,
        product: request.product,
        minPrice: request.minPrice,
        agreementType: request.agreementType,
      };

      await axios.post('/agreements/accept', agreementDetails, config);

      // Optionally, update the state to remove the accepted request from the list
      setRequests(requests.filter(req => req !== request));
      
      alert('Agreement accepted successfully!');
    } catch (error) {
      alert('Failed to accept the agreement: ' + (error.message || 'An error occurred'));
    }
  };
  const handleDelete = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const users = (role === 'farmer')?"farmers":"buyers";
      await axios.delete(`/${users}/${userId}/agreerequest/${requestId}`, config);
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };
  
  const handleAcceptAndDelete = async (request) => {
    try {
      await handleAccept(request);
      await handleDelete(request._id);
      setRequests(requests.filter(req => req._id !== request._id));
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };

  const handleRejectAndDelete = async (request) => {
    try {
      await handleDelete(request._id);
      setRequests(requests.filter(req => req._id !== request._id));
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  
  return (
    <div className="agreeRequest">
    <h2>Agreement Requests</h2>
    {requests.length === 0 ? (
      <p>No agreement requests are found.</p>
    ) : (
      <table className="requestTable">
        <thead>
          <tr>
            <th>{role==='farmer'? "Contractor Name" : "Farmer Name"}</th>
            <th>Product Type</th>
            <th>Product</th>
            <th>Min Price</th>
            <th>Date Agreed</th>
            <th>Agreement Type</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{role==='farmer'?request.buyerName:request.farmerName}</td>
              <td>{request.productType}</td>
              <td>{request.product}</td>
              <td>&#8377; {request.minPrice}</td>
              <td>{new Date(request.dateAgreed).toLocaleDateString()}</td>
              <td>{request.agreementType}</td>
              <td>
              <button onClick={() => handleAcceptAndDelete(request)}>Accept</button>
              </td>
              <td>
              <button id="reject" onClick={() => handleRejectAndDelete(request)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
}

export default AgreeRequest

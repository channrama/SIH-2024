import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Components/Layout';
import './csspages/Buyer.css';
import BASE_URL from '../service/BaseAddress';

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedPosts, setAppliedPosts] = useState(new Set());

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('/allbuyers', config);
        setBuyers(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, []);

  const handleApply = async (buyer, post) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { productCategory, product, minPrice, agreementType } = post;

      await axios.post(
        `/buyers/${buyer._id}/posts/apply`,
        { productType: productCategory, product, minPrice, agreementType },
        config
      );

      setAppliedPosts((prev) => new Set(prev).add(post._id));
      alert('Application sent successfully');
    } catch (error) {
      console.error('Error sending application:', error);
      alert('Failed to send application');
    }
  };

  return (
    <Layout>
      <div className="buyerList">
        <button id="filter">Filter</button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : buyers.length === 0 ? (
          <p>No Contractors found.</p>
        ) : (
          <table className="buyerTable">
            <thead>
              <tr>
              <th>Photo</th>
                <th>Contractor Name</th>
                <th>Address</th>
                <th>Product Type</th>
                <th>Products</th>
                <th>Minimum Price</th>
                <th>Posted Date</th>
                <th>Apply for Agreement</th>
              </tr>
            </thead>
            <tbody>
              {buyers.flatMap((buyer) =>
                buyer.posts.map((post) => (
                  <tr key={post._id}>
                    <td>
                    <img
                        src={`${BASE_URL}/images/${buyer.photo || 'default-photo.jpg'}`}
                        alt={buyer.username}
                        className="buyerPhoto"
                      />
                    </td>
                    <td>{buyer.username}</td>
                    <td>{buyer.address}</td>
                    <td>{post.productCategory}</td>
                    <td>{post.product}</td>
                    <td>{post.minPrice}</td>
                    <td>{new Date(post.datePosted).toLocaleDateString()}</td>
                    <td>
                     <button
                        onClick={() => handleApply(buyer, post)}
                        disabled={appliedPosts.has(post._id)}
                      >
                        {appliedPosts.has(post._id) ? 'Applied' : 'Apply'}
                      </button>
                      </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Buyers;

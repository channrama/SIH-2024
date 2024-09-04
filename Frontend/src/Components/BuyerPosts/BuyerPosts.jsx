import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BuyerPosts.css'

const BuyerPosts = ({ buyerId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`/buyer/${buyerId}/posts`, config);
        setPosts(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [buyerId]);

  const handleRemove = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const response = await axios.delete(`/buyers/${buyerId}/posts/${postId}`, config);
      alert("Post deleted sucessfully")
  
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error removing post:', error.response ? error.response.data : error.message);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="buyerPosts">
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="postsTable">
          <thead>
            <tr>
              <th>Product Category</th>
              <th>Product</th>
              <th>Minimum Price</th>
              <th>Date Posted</th>
              <th>Agreement Type</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.productCategory}</td>
                <td>{post.product}</td>
                <td>&#8377; {post.minPrice}</td>
                <td>{new Date(post.datePosted).toLocaleDateString()}</td>
                <td>{post.agreementType}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemove(post._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default BuyerPosts

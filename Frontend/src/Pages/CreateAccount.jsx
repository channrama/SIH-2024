import React, { useState } from 'react';
import './csspages/CreateAccount.css';
import Layout from '../Components/Layout';
import axios from 'axios';

const CreateAccount = () => {
  const BASE_URL ="http://localhost:4000";
  const [role, setRole] = useState('farmer'); // Default to buyer
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    aadhar: '',
    password: '',
    address: '',
    land: '',
    productCategory: '',
    products: '',
      bankName: '',
      accnum: '',
      isfccode: '',
      branch: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    console.log(formData);
Object.keys(formData).forEach((key) => {
   if (key === 'photo') {
    // Handle file uploads correctly
    formDataObj.append(key, formData[key]);
  } else if(key==='products'){
    formData.products.split(',').map(product => product.trim()).forEach(product => {
      formDataObj.append('products[]', product);
    });
  }else{
    // Append other fields normally
    formDataObj.append(key, formData[key]);
  }
});

formDataObj.append('role', role);

    try {
      const endpoint = role === 'buyer' ? '/register/buyer' : '/register/farmer';
      const res = await axios.post(endpoint, formDataObj);
      console.log('Registration Response:', res.data);

    // Ensure the token is received correctly
    if (res.data.token) {
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      window.location.href = "/";
    } else {
      console.error('Token not found in response:', res.data);
    }
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
  }
};
  
  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form-container" method="post" encType="multipart/form-data">
        <h1 className="form-title">Create Account</h1>

        <label htmlFor="role" className="form-label">Select Your Role:</label>
        <select
          name="role"
          id="role"
          value={formData.role}
          className="form-input"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>

        <label htmlFor="username" className="form-label">Enter your Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
          placeholder="Username"
          required
        />

        <label htmlFor="email" className="form-label">Enter your Email / Phone number:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="Email @gmail.com / XXXXXXXXXX"
          required
        />

        <label htmlFor="password" className="form-label">Enter your Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          placeholder="Password"
          required
        />

        <label htmlFor="photo" className="form-label">Upload Your Photo (image only):</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept=".jpeg, .jpg, .png"
          onChange={handleFileChange}
          className="form-input"
        />

        <label htmlFor="aadhar" className="form-label">Enter your Aadhar Number:</label>
        <input
          type="text"
          name="aadhar"
          id="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          className="form-input"
          placeholder="Aadhar Number XXXX-XXXX-XXXX"
          required
        />

        <label htmlFor="address" className="form-label">Enter your Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          className="form-input"
          placeholder="Address"
          required
        />

        <label htmlFor="photo" className="form-label">{role==='farmer'?"Upload your Agriculture certificate : ": "Upload your contract licence certificate : "}</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept=".pdf"
          // onChange={handleFileChange}
          className="form-input"
        />

        {/* Conditional fields for farmers */}
        {role === 'farmer' && (
          <>
            <label htmlFor="land" className="form-label">Land(in acres):</label>
            <input
              type="text"
              name="land"
              id="land"
              value={formData.land}
              onChange={handleChange}
              className="form-input"
              placeholder="Land"
              required
            />

            <label htmlFor="productCategory" className="form-label">Product Category:</label>
            <select
              name="productCategory"
              id="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a Category</option>
              <option value="Crops">Crops</option>
              <option value="Dairy">Dairy</option>
              <option value="Poultry">Poultry</option>
            </select>

            <label htmlFor="products" className="form-label">Products:</label>
            <input
              type="text"
              name="products"
              id="products"
              value={formData.products}
              onChange={handleChange}
              className="form-input"
              placeholder="Products"
              required
            />
            <label className="form-label">Enter Your Bank details:</label>
            <label htmlFor="bankName" className="form-label">Bank Name:</label>
            <input
              type="text"
              name="bankName"
              id="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="form-input"
              placeholder="Bank Name"
              required
            />

            <label htmlFor="accnum" className="form-label">Account Number:</label>
            <input
              type="text"
              name="accnum"
              id="accnum"
              value={formData.accnum}
              onChange={handleChange}
              className="form-input"
              placeholder="Account Number"
              required
            />

            <label htmlFor="isfccode" className="form-label">IFSC Code:</label>
            <input
              type="text"
              name="isfccode"
              id="isfccode"
              value={formData.isfccode}
              onChange={handleChange}
              className="form-input"
              placeholder="IFSC Code"
              required
            />

            <label htmlFor="branch" className="form-label">Branch:</label>
            <input
              type="text"
              name="branch"
              id="branch"
              value={formData.branch}
              onChange={handleChange}
              className="form-input"
              placeholder="Branch"
              required
            />
          </>
        )}

        <button type="submit" className="form-button">Register</button>
      </form>
    </Layout>
  );
};

export default CreateAccount;

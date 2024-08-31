import React, { useState } from 'react';
// import Layout from "../Components/Layout";
import './CreateAccount.css';

import Layout from '../Components/Layout';
const CreateAccount = () => {
  
  const [formData, setFormData] = useState({
    role: 'farmer',
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
     photo: null // New field for the photo
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('/register', formData);
  //     alert(response.data);
  //   } catch (error) {
  //     alert('Error registering');
  //   }
  // };

  return (
    <Layout>
  
  <form /*onSubmit={handleSubmit}*/ className="form-container">
      <h1 className="form-title">Create Account</h1>
      
      <label htmlFor="role" className="form-label">Select Your Role:</label>
      <select
        name="role"
        id="role"
        value={formData.role}
        onChange={handleChange}
        className="form-input"
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

      <label htmlFor="email" className="form-label">Enter your Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        className="form-input"
        placeholder="Email @gmail.com"
        required
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
      <label htmlFor="photo" className="form-label">Upload Your Photo (PDF format only):</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept=".pdf"
          onChange={handleChange}
          className="form-input"
        />
        

      {/* Conditional fields for farmers */}
      {formData.role === 'farmer' && (
        <>
          <label htmlFor="land" className="form-label">Land:</label>
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
          <input
            type="text"
            name="productCategory"
            id="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="form-input"
            placeholder="Product Category"
            required
          />

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
<label htmlFor="role" className="form-label">Enter Your Bank details:</label>
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
            {/* File upload field */}
        <label htmlFor="photo" className="form-label">Upload Your Photo (PDF format only):</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept=".pdf"
          onChange={handleChange}
          className="form-input"
        />
        </>
      )}

      <button type="submit" className="form-button">Register</button>
  </form>
  </Layout>
);
  

};

export default CreateAccount;

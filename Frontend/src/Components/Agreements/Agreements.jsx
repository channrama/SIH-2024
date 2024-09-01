import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Agreements.css';
import BondTemplate from '../BondCreation/BondTemplate';

const Agreements = ({ userId, role }) => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/agreements', config);
      setAgreements(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAgreements();
  }, []);

  const handleDownloadBond = (agreement) => {
    // Use the BondTemplate component to generate and download the bond
    // const bondData = {
    //   farmer: agreement.farmerName, // Adjust type as needed
    //   buyer: agreement.buyerName, // Adjust type as needed
    //   propertyType: agreement.productType,
    //   minPrice: agreement.minPrice,
    //   date: new Date(agreement.dateAgreed).toLocaleDateString(),
    //   address: userId.addresss,
    // };
    console.log(bondData);
    BondTemplate(farmer=agreement.farmerName, buyer=agreement.buyerName, propertyType=agreement.productType, minPrice=agreement.minPrice, date=new Date(agreement.dateAgreed).toLocaleDateString(), address=userId.address); // Call the BondTemplate function with the bond data
     window.location.href = "/bondgenerate";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="agreements">
    <h2>Agreements</h2>
    {agreements.length === 0 ? (
      <p>No agreements are found.</p>
    ) : (
      <table className="agreementsTable">
        <thead>
          <tr>
            <th>{role==='farmer'? "Contractor Name" : "Farmer Name"}</th>
            <th>Product Type</th>
            <th>Product</th>
            <th>Min Price</th>
            <th>Date Agreed</th>
            <th>Agreement Type</th>
            <th>Insurance</th>
            <th>Download Bond</th>
            <th>Payment Details</th>
          </tr>
        </thead>
        <tbody>
          {agreements.map((agreement, index) => (
            <tr key={index}>
              <td>{role==='farmer'?agreement.buyerName:agreement.farmerName}</td>
              <td>{agreement.productType}</td>
              <td>{agreement.product}</td>
              <td>&#8377; {agreement.minPrice}</td>
              <td>{new Date(agreement.dateAgreed).toLocaleDateString()}</td>
              <td>{agreement.agreementType}</td>
              <td>Done by farmer</td>
              <td>
                  <button type="button" onClick={() => handleDownloadBond(agreement)}>
                    Download
                  </button>
                </td>
              <td>
                <button id="payment" type="button">progress</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default Agreements;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FarmerProfile.css'
import Agreements from '../Agreements/Agreements';
import AgreeRequest from '../AgreeRequest/AgreeRequest';
import DisplayNotification from '../DisplayNotification/DisplayNotification';
import BASE_URL from '../../service/BaseAddress';

const FarmerProfile = () => {
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/farmers/me', config);
      setFarmer(response.data);
    };

    fetchData();
  }, []);

  if (!farmer) {
    return <div>Loading...</div>;
  }
  const farmerId = farmer._id;
  return (
    <div className='farmer-profile-main-class'>
    <div className="farmer-profile">
      <img src={`${BASE_URL}/images/${farmer.photo || 'default-photo.jpg'}`} alt="Farmer" className="farmer-photo" />
      <p className='username'>Hi {farmer.username} !</p>
      <div className='farmer-details-inner'>
      <p>
        <span>Role :</span> <span>Farmer</span>
      </p>
      <p>
        <span>Email / Phone :</span> <span>{farmer.email}</span>
      </p>
      <p>
      <span>Aadhar :</span> <span>XXXX-XXXX-XXXX-{farmer.aadhar.slice(-4)}</span>

      </p>
      <p>
        <span>Address :</span> <span>{farmer.address}</span>
      </p>
      <p>
        <span>Land :</span> <span>{farmer.land} acres</span>
      </p>
      <p>
        <span>Product Category :</span> <span>{farmer.productCategory}</span>
      </p>
      <p>
        <span>Products :</span> <span>{farmer.products.join(', ')}</span>
      </p>
      <p>
        <span>Registered On :</span> <span>{new Date(farmer.date).toLocaleDateString()}</span>
      </p>
      </div>
      <p id='Bank-details-heading'>Bank Details</p>
      <div className="bank-details">
        <p>
          <span>Bank Name :</span> <span>{farmer.bankDetails.bankName}</span>
        </p>
        <p>
          <span>Account Number :</span> <span>{farmer.bankDetails.accnum}</span>
        </p>
        <p>
          <span>IFSC Code :</span> <span>{farmer.bankDetails.isfccode}</span>
        </p>
        <p>
          <span>Branch :</span> <span>{farmer.bankDetails.branch}</span>
        </p>
      </div>
    </div>
      <div className='other-farmer-details'>
      <AgreeRequest userId={farmer._id} role='farmer'/>
      <Agreements userId={farmer._id} role='farmer'/>
      <DisplayNotification userId={farmer._id}role='farmer'/>
      </div>
    </div>
  );
}

export default FarmerProfile

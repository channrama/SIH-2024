import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerProfile.css'
import Agreements from '../Agreements/Agreements';
import AgreeRequest from '../AgreeRequest/AgreeRequest';
import DisplayNotification from '../DisplayNotification/DisplayNotification';
import BuyerPosts from '../BuyerPosts/BuyerPosts';
import CreatePosts from '../CreatePosts/CreatePosts';
import BASE_URL from '../../service/BaseAddress';

const BuyerProfile = () => {
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/buyers/me', config);
      setBuyer(response.data);
    };

    fetchData();
  }, []);

  if (!buyer) {
    return <div>Loading...</div>;
  }
  const buyerId = buyer._id;
  return (
    <div className='buyer-profile-main-class'>
    <div className="buyer-profile">
      <img src={`${BASE_URL}/images/${buyer.photo || 'default-photo.jpg'}`} alt="Buyer" className="buyer-photo" />
      <p className='username'>Hi {buyer.username} !</p>
      <div className='buyer-details-inner'>
      <p>
        <span>Role :</span> <span>Contractor</span>
      </p>
      <p>
        <span>Email / Phone :</span> <span>{buyer.email}</span>
      </p>
      <p>
      <span>Aadhar :</span> <span>XXXX-XXXX-XXXX-{buyer.aadhar.slice(-4)}</span>

      </p>
      <p>
        <span>Address :</span> <span>{buyer.address}</span>
      </p>
      <p>
        <span>Registered On :</span> <span>{new Date(buyer.date).toLocaleDateString()}</span>
      </p>
      </div>
      <p id='buyer-create-post-heading'>Create Post</p>
      <div className="buyer-create-post">
        <CreatePosts/>
      </div>
    </div>
      <div className='other-buyer-details'>
      <AgreeRequest userId={buyer._id} role='buyer'/>
      <Agreements userId={buyer._id} role='buyer'/>
      <BuyerPosts buyerId={buyer._id}/>
      <DisplayNotification userId={buyer._id}role='buyer'/>
      </div>
    </div>
  )
}

export default BuyerProfile

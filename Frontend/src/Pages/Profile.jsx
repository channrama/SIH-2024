import React from 'react'
import FarmerProfile from '../Components/FarmerProfile/FarmerProfile';
import BuyerProfile from '../Components/BuyerProfile/BuyerProfile';
import './csspages/Profile.css'
import Layout from '../Components/Layout'

const Profile = () => {
  const role = localStorage.getItem('role');
  // const person =(role === 'farmer')?'farmers':'buyers';
  
  return (
    <div>
      <Layout>
      {(role === 'farmer')? <FarmerProfile/> :  <BuyerProfile/> }
      </Layout>
    </div>
  )
}

export default Profile

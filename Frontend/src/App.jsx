import React from "react"
import {Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Components/Layout";
import About from "./Pages/About";
import Buyers from "./Pages/Buyers"
import CreateAccount from "./Pages/CreateAccount"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import NAFED from "./Pages/NAFED"
import Farmer from "./Pages/Farmer"
import Realtimeprice from "./Pages/Realtimeprice"
import Profile from "./Pages/Profile";
import BondTemplate from "./Components/BondCreation/BondTemplate";
import BondGenerate from "./Components/BondCreation/BondGenerate";
function App() {
 

  return (
    <>
   <Routes>
    {/* <Route path='/' element={<Layout/>}/> */}
    <Route path='/' element={<HomePage/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contractors' element={<Buyers/>}/>
    <Route path='/create-account' element={<CreateAccount/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/nafed' element={<NAFED/>}/>
    <Route path='/farmers' element={<Farmer/>}/>
    <Route path='/realtimeprice' element={<Realtimeprice/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/bondgenerate' element={<BondTemplate/>}/>
   </Routes>
    </>
  )
}

export default App

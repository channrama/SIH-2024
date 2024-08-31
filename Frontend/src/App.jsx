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
import Sample from "./Pages/sampleblock";

function App() {
 

  return (
    <>
   <Routes>
    <Route path='/' element={<Layout/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/buyers' element={<Buyers/>}/>
    <Route path='/createaccount' element={<CreateAccount/>}/>
    <Route path='/loin' element={<Login/>}/>
    <Route path='/nafed' element={<NAFED/>}/>
    <Route path='/farmer' element={<Farmer/>}/>
    <Route path='/realtimeprice' element={<Realtimeprice/>}/>
    <Route path='/sample' element={<Sample/>}/>

   </Routes>
    </>
  )
}

export default App

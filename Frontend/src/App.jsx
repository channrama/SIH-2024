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
import Signup from "./Pages/Signup";
import Realtimeprice from "./Pages/Realtimeprice"
function App() {
 

  return (
    <>
   <Routes>
    <Route path='/' element={<Layout/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/buyers' element={<Buyers/>}/>
    <Route path='/create-account' element={<CreateAccount/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/nafed' element={<NAFED/>}/>
    <Route path='/farmer' element={<Farmer/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Realtimeprice' element={<Realtimeprice/>}/>
   </Routes>
    </>
  )
}

export default App

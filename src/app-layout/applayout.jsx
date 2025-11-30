import { Outlet } from 'react-router-dom'
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/home'

const Applayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Applayout

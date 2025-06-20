import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Service from "./Service"
import Home from "./Home"
import About from "./About"
import Product from "./Product"
import ProductDetails from './ProductDetails'
import GetService from './GetService'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product' element={<Product />}/>
      <Route path='/product/details/:name' element={<ProductDetails />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/service' element={<Service />}>
        <Route path='/service/getService' element={<GetService />}/>
      </Route>
    </Routes>
  )
}

export default MainRoutes
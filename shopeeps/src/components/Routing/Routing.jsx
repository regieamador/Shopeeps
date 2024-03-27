import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './../Home/Home';
import Products from './../Products/Products';
import SingleProductPage from './../SingleProduct/SingleProductPage';
import CartPage from './../Cart/CartPage';
import MyOrder from './../Orders/MyOrder';
import LogIn from './../LogIn/LogIn';
import SignupPage from './../LogIn/SignupPage';
import LogOut from '../LogIn/LogOut';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../NotFound/NotFound';

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/product/:id' element={<SingleProductPage />}/>
        <Route path='/login' element={<LogIn />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='*' element={<NotFound />}/>
        
        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/myorders' element={<MyOrder />}/>
          <Route path='/logout' element={<LogOut />}/>
        </Route>
    </Routes>
  )
}

export default Routing

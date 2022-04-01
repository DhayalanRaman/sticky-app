import React from 'react';
import { useSelector } from 'react-redux';

import { Routes,Route } from 'react-router-dom';


import { Index } from '../Index.jsx';
import {Login} from './auth/Login'
import {Register} from './auth/Register'
import { Dashbaord } from './dashbaord/dashbaord';
import { Create } from './dashbaord/create';
import { Edit } from './dashbaord/Edit'

export const Body = () => {
  const auth = useSelector(state => state.auth)
  const {isLoggedIn} = auth

  return <div className='text-white p-4'>
      
      <Routes>
      
        <Route path='/' element={isLoggedIn ? <Dashbaord /> : <Index /> }/>
        <Route path='/login' element={isLoggedIn ? <Dashbaord /> :<Login />}/>
        <Route path='/register' element={isLoggedIn ? <Dashbaord /> :<Register />  }/>
        <Route path='/dashbaord' element={isLoggedIn? <Dashbaord /> : <Login /> }/>
        <Route path='/Create' element={isLoggedIn? <Create /> : <Login /> }/> 
        <Route path='/edit/:id' element={isLoggedIn? <Edit /> : <Login /> }/> 
      
      

      </Routes>
  </div>;
};

import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Signup from './components/signup'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Header from './components/header'

import './App.css'

function App() {
  return (  
    <Routes>
      <Route path='/' element={<Header />}>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup /> }/> 
      </Route>
    </Routes>
  )
}

export default App

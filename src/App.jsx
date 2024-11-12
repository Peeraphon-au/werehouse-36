import { useEffect, useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './App.css'
import Home from './pages/manager/Home/Home'
import Login from './pages/Login/Login';
import Managepersonnel from './pages/manager/ManagePersonnel/ManagePersonnel';

function App() {
  const [token, setToken] = useState('admin');
  const [role, setRole] = useState('');
  if (token === '') {
    return (<Login setToken={setToken} setRole={setRole} />)
  } else if (token === 'admin') {
    return (
      <div className='app-container'>
        <Home />
        <Managepersonnel />
      </div>
    )
  }
   else {
    return (
      <div className='app-container'>
        <h1>พนักงาน</h1>
      </div>
    )
   }
}

export default App

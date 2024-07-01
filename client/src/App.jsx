import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';
import Detail from './Views/Details/Detail';
import Create from './Views/Create/Create';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios";
import { getActivities, getCountries } from './Redux/Actions/actions';
import DeleteActivity from './Views/Delete/DeleteActivity';
axios.defaults.baseURL = "http://localhost:3001";

function App() {
 
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  },[dispatch]);



return (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/delete" element={<DeleteActivity />} />
      </Routes>
    </BrowserRouter>
  </div>
);
}

export default App;
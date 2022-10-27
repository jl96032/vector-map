import logo from './logo.svg';
import {Map} from './components/map.js';
import './App.css';
import Navbar from './components/navbar';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate} from 'react-router-dom'

function App() {
  

  return (
    <div className="result">
      
      
      <div className="result">
        <Router>
        {/* <ul>
          <li>
            <Link to="/showCollisionBoxes">ShowCollisionBoxes</Link>
          </li>
        </ul> */}
          <Routes>
              <Route path="/" element={<Map showCollisionBoxes={false}/>}></Route>
              {/* <Route path="showCollisionBoxes" element={<Map showCollisionBoxes={true}/>}></Route> */}
              <Route path=":z1/:lat1/:lng1" element={<Map showCollisionBoxes={false}/>}></Route>

            

          </Routes>
      </Router>
    </div>
    </div>
    
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { z } = useParams();

  return (
    <div>
      <h3>ID: {z}</h3>
    </div>
  );
}

export default App;


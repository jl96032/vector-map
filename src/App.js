import logo from './logo.svg';
import {Map} from './components/map.js';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/showCollisionBoxes">ShowCollisionBoxes</Link>
        </li>
      </ul>
        <Routes>
          <Route exact path="/showCollisionBoxes" element={<Map showCollisionBoxes={true}/>}/>
          <Route exact path="/*" element={<Map showCollisionBoxes={false}/>}/>
        </Routes>
    </Router>
  );
}

export default App;


import logo from './logo.svg';
import Map from './components/map.js';
import './App.css';

function App() {
  
  fetch("./osm_liberty.json").then(
    function(res){
    return res.json()
  }).catch(
    function(err){
      console.log(err, ' error')
    }
  )
  return (
    <div className="App">
      <Map/>
    </div>
  );
}

export default App;

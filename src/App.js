import React from 'react';

import NavBar from './components/NavBar';
import Background from './Background';
import { BrowserRouter as Router} from 'react-router-dom';


function App(){
  
  return (
    // Must wrap NavBar inside Router component
    <Router> 
      <NavBar/>
      <Background/>
    </Router>
  )
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BitPic from './Pages/BitPic';
//import PictureBox from './PictureBox/PictureBox';
//import DropZone from './DropZone/DropZone';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/BitPic' component={BitPic}/>
      </Switch>
    </Router>
  );
}

export default App;

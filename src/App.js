import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home/Home';
import BitPic from './Pages/BitPic/BitPic';
import Music from './Pages/Music/Music';
import Peaks from './Pages/Peaks/Peaks';
import './App.css';

function App() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <Router>
        <div className="nav">
          <div className="nav-bg">
            <Link className="logo" to="/">the gort</Link>
            <Link className="nav-item" to="/">home</Link>
            <Link className="nav-item" to="/BitPic">bitpic</Link>
            <Link className="nav-item" to="/Music">music</Link>
            <Link className="nav-item" to="/Peaks">peaks</Link>
          </div>
        </div>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/BitPic' component={BitPic}/>
          <Route path='/Music' component={Music}/>
          <Route path='/Peaks' component={Peaks}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

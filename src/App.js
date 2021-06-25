import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BitPic from './Pages/BitPic/BitPic';
import NaviBar from './Components/NaviBar/NaviBar';

function App() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <NaviBar/>
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/BitPic' component={BitPic}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

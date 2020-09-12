import React from 'react';
import './App.css';

import PictureBox from './PictureBox/PictureBox';
//import DropZone from './DropZone/DropZone';

function App() {
  return (
    <div className="App">
      <p className="title">drop a picture in vvv</p>
      <div className="content">
        <PictureBox />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import PictureBox from '../../Components/PictureBox/PictureBox';
import './BitPic.css';

const BitPic = () => {
	return (
		<div className="App">
      <p className="title">drop a picture in vvv</p>
      <div className="content">
        <PictureBox/>
      </div>
    </div>
	)
}

export default BitPic;

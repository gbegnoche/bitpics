import React from 'react';
import './NaviBar.css';

const NaviBar = () => {
	return (
		<div className="nav">
			<div className="nav-bg">
				<a className="logo" href="/">the gort</a>
				<a className="nav-item" href="/">home</a>
				<a className="nav-item" href="/BitPic">bitpic</a>
				<a className="nav-item" href="/Peaks">peaks</a>
			</div>
		</div>
	);
}

export default NaviBar;

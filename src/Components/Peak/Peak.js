import React from 'react';
import fire from '../../Pictures/fire.gif';
import './Peak.css';

const Peak = ({peak, complete}) => {
	let checkmark;

	if (complete) {
		checkmark = <img className="checkmark" src={fire} alt="complete!" />
	}

	return (
		<div className="peak-container">
			{checkmark}
			<span>{peak}</span>
		</div>
	);
}

export default Peak;

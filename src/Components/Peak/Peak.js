import React from 'react';
import fire from '../../fire.gif';
import './Peak.css';

const Peak = ({peak, complete}) => {
	let checkmark;

	if (complete) {
		checkmark = <img class="checkmark" src={fire} alt="complete!" />
	}
	return (
		<div class="peak-container">
			{checkmark}
			<span>{peak}</span>
		</div>
	);
}

export default Peak;

import React, { useState } from 'react';

const Slider = () => {
	const [value, setValue] = useState(1);

	const change = (e) => {
		setValue(e.target.value);
	}

	return (
		<div>
			<input
				type="range"
				min="1"
				max="20"
				step="1"
				value={value}
				onChange={change}
			/>
		</div>
	);
}

export default Slider;

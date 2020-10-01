import React from 'react';

const Slider = ({value, onChange, id}) => {
	const handleChange = (e) => {
		const value = e.target.value;
		onChange(value, id);
	}

	return (
		<input
			style={{width: "100%"}}
			type="range"
			min="2"
			max="40"
			step="1"
			value={value}
			onChange={handleChange}
		/>
	);
}

export default Slider;

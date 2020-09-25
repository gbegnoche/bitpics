import React from 'react';

const Slider = ({value, onChange, id}) => {
	const handleChange = (e) => {
		const value = e.target.value;
		onChange(value, id);
	}

	return (
		<div className="slider">
			<input
				type="range"
				min="1"
				max="40"
				step="1"
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default Slider;

import React from 'react';

const ColorPicker = ({value, onChange, id}) => {
	const handleChange = (e) => {
		e.preventDefault();
		const value = e.target.value;
		onChange(value, id);
	}

	return (
		<div>
			<input id={id} type="color" value={value} onChange={handleChange} />
		</div>
	)
}

export default ColorPicker;

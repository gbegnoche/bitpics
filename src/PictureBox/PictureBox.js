import React, { useState, useRef } from 'react';
import './PictureBox.css';
import axios from 'axios';

import Slider from '../Slider/Slider';

const PictureBox = () => {
	const [currentPic, setCurrentPic] = useState('');
	const picRef = useRef();

	const dragOver = (e) => {
		e.preventDefault();
	}

	const dragEnter = (e) => {
		e.preventDefault();
	}

	const dragLeave = (e) => {
		e.preventDefault();
	}

	const drop = (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length === 1) {
			handleFile(files[0]);
		} else {
			alert('one file at a time please')
		}
	}

	const handleFile = (file) => {
		const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
		if (supportedTypes.indexOf(file.type) !== -1) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				updateImage(e.target.result);
			}
		}
	}

	const updateImage = (base64) => {
		if (base64.substring(0, 4) !== 'data') {
			base64 = 'data:image/png;base64,' + base64;
		}
		setCurrentPic(base64);
		picRef.current.style.backgroundImage = `url(${base64})`;
	}

	const invokeLambda = async (e, url) => {
		await axios.post(
			url,
			currentPic
		).then((result) => {
			updateImage(result.data);
		}).catch((error) => {
			console.log(error);
		});
	}

	return (
		<div>
			<div className="container"
				onDragOver={dragOver}
				onDragEnter={dragEnter}
				onDragLeave={dragLeave}
				onDrop={drop}
			>
				<div className="pic-container" ref={picRef}></div>
			</div>
			<div>
				<button onClick={
					(e) => invokeLambda(e, 'https://1kuxdq4rzi.execute-api.us-east-2.amazonaws.com/prod/convert-image-1bit')
				}>1-bit</button>
				<button onClick={
					(e) => invokeLambda(e, 'https://1kuxdq4rzi.execute-api.us-east-2.amazonaws.com/prod/convert_image_pixelate')
				}>pixelate</button>
				<Slider />
			</div>
		</div>
	)
}

export default PictureBox;

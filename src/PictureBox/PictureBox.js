import React, { useState, useRef } from 'react';
import './PictureBox.css';
import axios from 'axios';

import Slider from '../Slider/Slider';
import ColorPicker from '../ColorPicker/ColorPicker';

const PictureBox = () => {
	const [originalPic, setOriginalPic] = useState('');
	const [currentPic, setCurrentPic] = useState('');
	const [pixelateSize, setPixelateSize] = useState(2);
	const [colors, setColors] = useState(['#FFFFFF', '#000000']);

	const picRef = useRef();
	const modalRef = useRef();

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
			const file = files[0];
			const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
			if (supportedTypes.indexOf(file.type) !== -1) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					updateImage(e.target.result, true);
				}
			} else {
				alert('file type not supported. supported types are jpeg, jpg, and png');
			}
		} else {
			alert('one file at a time please')
		}
	}

	const updateImage = (base64, newImageFlag = false) => {
		if (base64.substring(0, 4) !== 'data') {
			base64 = 'data:image/png;base64,' + base64;
		}
		if (newImageFlag) {
			setOriginalPic(base64);
		}
		setCurrentPic(base64);
		picRef.current.style.backgroundImage = `url(${base64})`;
	}

	const invokeLambda = async (e, url) => {
		openModal();
		await axios.post(
			url,
			{
				image: currentPic,
				pixelSize: pixelateSize,
				color1: colors[0],
				color2: colors[1],
			}
		).then((result) => {
			updateImage(result.data);
			closeModal();
		}).catch((error) => {
			console.log(error);
			closeModal();
		});
	}

	const handleSliderChange = (value, id) => {
		setPixelateSize(value);
	}

	const handleColorPickerChange = (value, id) => {
		colors[id] = value;
		setColors([...colors]);
	}

	const handleRevert = () => {
		updateImage(originalPic);
	}

	const openModal = () => {
		modalRef.current.style.display = "block";
	}
	
	const closeModal = () => {
		modalRef.current.style.display = "none";
	}

	return (
		<div>
			<div
				className="container"
				onDragOver={dragOver}
				onDragEnter={dragEnter}
				onDragLeave={dragLeave}
				onDrop={drop}
			>
				<div className="pic-container" ref={picRef}></div>
			</div>
			<div className="input-container">
				<div className="button-container">
					<button
						className="button"
						onClick={
							(e) => invokeLambda(e, 'https://1kuxdq4rzi.execute-api.us-east-2.amazonaws.com/prod/convert-image-1bit')
						}
					>
						1-bit
					</button>
					<div style={{flexDirection: "row", justifyContent: "space-between"}}>
						<ColorPicker id={0} value={colors[0]} onChange={handleColorPickerChange} />
						<ColorPicker id={1} value={colors[1]} onChange={handleColorPickerChange} />
					</div>
					<div style={{width: "100%"}}>
						<label className="color-label">color1</label>
						<label className="color-label">color2</label>
					</div>
				</div>
				<div className="button-container">
					<button
						className="button"
						onClick={
							(e) => invokeLambda(e, 'https://1kuxdq4rzi.execute-api.us-east-2.amazonaws.com/prod/convert_image_pixelate')
						}
					>
						pixelate
					</button>
					<div style={{display: "flex"}}>
						<Slider id="pixel-size-slider" onChange={handleSliderChange} value={pixelateSize} />
						<div className="pixel-number">{pixelateSize}</div>
					</div>
					<label className="color-label">pixel size</label>
				</div>
				<div className="button-container">
					<button
						className="button"
						onClick={
							(e) => invokeLambda(e, 'https://1kuxdq4rzi.execute-api.us-east-2.amazonaws.com/prod/convert_image_blowout')
						}
					>
							saturate
						</button>
				</div>
				<div className="button-container">
					<button className="button" onClick={handleRevert}>revert</button>
				</div>
			</div>
			<div className="modal" ref={modalRef}>
				<div className="overlay">
					<span className="modal-span">loading</span>
				</div>
				<img
					className="modal-image"
					src="https://media1.tenor.com/images/58484d9ab6e028fa2a68dd9018565cd3/tenor.gif?itemid=10128491"
					alt="loading"
				/>
			</div>
		</div>
	)
}

export default PictureBox;

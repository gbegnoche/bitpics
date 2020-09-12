import React, { useState, useRef, useEffect } from 'react';
import './PictureBox.css';

const PictureBox = () => {
	const [currentPic, setCurrentPic] = useState(new File([], 'none'));
	const picRef = useRef();

	useEffect(() => {
		updatePic(currentPic);
	});

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
		setCurrentPic(file);
	}

	const updatePic = (file) => {
		console.log(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			picRef.current.style.backgroundImage = `url(${e.target.result})`;
		}
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
				<button>1-bit</button>
				<button>pixelate</button>
			</div>
		</div>
	)
}

export default PictureBox;

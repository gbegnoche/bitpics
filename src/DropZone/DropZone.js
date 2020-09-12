import React, { useState, useEffect, useRef } from 'react';
import './DropZone.css';

const DropZone = () => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [validFiles, setValidFiles] = useState([]);

	const modalImageRef = useRef();
	const modalRef = useRef();

	useEffect(() => {
		let filteredArray = selectedFiles.reduce((file, current) => {
			const x = file.find(item => item.name === current.name);
			if (!x) {
				return file.concat([current]);
			} else {
				return file;
			}
		}, []);
		setValidFiles([...filteredArray]);
	
	}, [selectedFiles]);

	const dragOver = (e) => {
		e.preventDefault();
	}
	
	const dragEnter = (e) => {
		e.preventDefault();
	}
	
	const dragLeave = (e) => {
		e.preventDefault();
	}
	
	const fileDrop = (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length) {
			handleFiles(files);
		}
	}
	
	const validateFile = (file) => {
		const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
		if (validTypes.indexOf(file.type) === -1) {
			return false;
		}
		return true;
	}
	
	const handleFiles = (files) => {
		for (let i = 0; i < files.length; i++) {
			if (validateFile(files[i])) {
				setSelectedFiles(prevArray => [...prevArray, files[i]]);
			} else {
				files[i]['invalid'] = true;
				setSelectedFiles(prevArray => [...prevArray, files[i]]);
				setErrorMessage("File type not permitted");
			}
		}
	}

	const fileSize = (size) => {
		if (size === 0) {
			return '0 Bytes';
		}
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	const fileType = (fileName) => {
		return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
	}

	const removeFile = (name) => {
		const validFileIndex = validFiles.findIndex(e => e.name === name);
		validFiles.splice(validFileIndex, 1);
		setValidFiles([...validFiles]);

		const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
		selectedFiles.splice(selectedFileIndex, 1);
		setSelectedFiles([...selectedFiles]);
	}

	const openImageModal = (file) => {
		console.log(file);
		const reader = new FileReader();
		modalRef.current.style.display = "block";
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
		}
	}

	const closeModal = () => {
		modalRef.current.style.display = "none";
		modalImageRef.current.style.backgroundImage = 'none';
	}

	return (
		<div>
			<div className="container">
				<div className="drop-container"
					onDragOver={dragOver}
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDrop={fileDrop}
				>
					<div className="drop-message">
						<div className="upload-icon"></div>
						Drag and drop files here or click to upload!
					</div>
				</div>
				<div className="file-display-container">
				{
					validFiles.map((data, i) => 
						<div className="file-status-bar" key={i}>
							<div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}>
								<div className="file-type-logo"></div>
								<div className="file-type">{fileType(data.name)}</div>
								<span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
								<span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
							</div>
							<div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
						</div>
					)
				}
				</div>
			</div>
			<div className="modal" ref={modalRef}>
				<div className="overlay"></div>
				<span className="close" onClick={(() => closeModal())}>X</span>
				<div className="modal-image" ref={modalImageRef}></div>
			</div>
		</div>
	)
}

export default DropZone;

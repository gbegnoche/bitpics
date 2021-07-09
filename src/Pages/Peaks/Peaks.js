import React, { useState } from 'react';
import Article from '../../Components/Article/Article';
import PeakList from '../../Components/PeakList/PeakList';
import { PEAKS, COMPLETED } from './constants';

const Peaks = () => {
	const getAllPeaks = () => {
		const temp = [];
		for (const value of PEAKS) {
			temp.push({
					name: value,
					complete: (COMPLETED.includes(value) ? true : false),
			})
		};
		return temp;
	}

	const getCompletedPeaks = () => {
		const temp = [];
		for (const value of PEAKS) {
			if (COMPLETED.includes(value)) {
				temp.push({
					name: value,
					complete: true,
				})
			}
		}
		return temp;
	}

	const getIncompletePeaks = () => {
		const temp = [];
		for (const value of PEAKS) {
			if (!COMPLETED.includes(value)) {
				temp.push({
					name: value,
					complete: false,
				})
			}
		}
		return temp;
	}

	// set state and page content
	const [peaks, setPeaks] = useState(getAllPeaks());
	const content = "this page is dedicated to the peaks i've climbed out of the 46 high peaks of the adirondacks."
	+ " can i climb them all? or will i perish in the wilderness?";

	const handleAllClick = (e) => {
		setPeaks(getAllPeaks());
	}
	
	const handleCompletedClick = (e) => {
		setPeaks(getCompletedPeaks());
	}
	
	const handleTodoClick = (e) => {
		setPeaks(getIncompletePeaks());
	}

	return (
		<div className="page-container">
			<Article title="can gort climb 46 mountains?" content={content} />
			<div className="input-container">
				<div className="button-container">
					<button className="button" onClick={handleAllClick}>all</button>
				</div>
				<div className="button-container">
					<button className="button" onClick={handleCompletedClick}>completed</button>
				</div>
				<div className="button-container">
					<button className="button" onClick={handleTodoClick}>to-do</button>
				</div>
			</div>
			<PeakList peaks={peaks}/>
		</div>
	)
}

export default Peaks;

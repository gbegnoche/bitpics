import React from 'react';
import { PEAKS, COMPLETED } from './constants';
import Peak from '../Peak/Peak';
import './PeakList.css';

const PeakList = () => {
	return (
		<div class="peaklist-container">
			<div class="peaklist-bg">
				{PEAKS.map((value, index) => {
					let done;
					if (COMPLETED.includes(value)) {
						done = true;
					}
					return (<Peak peak={value} complete={done} />);
				})}
			</div>
		</div>
	);
}

export default PeakList;

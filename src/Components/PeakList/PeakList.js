import React from 'react';
import Peak from '../Peak/Peak';
import './PeakList.css';

const PeakList = ({peaks}) => {
	return (
		<div className="peaklist-container">
			<div className="peaklist-bg">
				{peaks.map((peak, index) => <Peak key={index} peak={peak.name} complete={peak.complete} />)}
				<a href="https://www.peakbagger.com/climber/climber.aspx?cid=33995" className="peakbagger-link">peakbagger profile</a>
			</div>
		</div>
	);
}

export default PeakList;

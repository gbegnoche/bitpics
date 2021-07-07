import React from 'react';
import Article from '../Components/Article/Article';
import PeakList from '../Components/PeakList/PeakList';

const Peaks = () => {
	const content = "this page is dedicated to the peaks i've climbed out of the 46 high peaks of the adirondacks."
		+ " can i climb them all? or will i perish in the wilderness?";
	return (
		<div class="peaks-container">
			<Article title="can gort climb 46 mountains?" content={content} />
			<PeakList />
		</div>
	)
}

export default Peaks;

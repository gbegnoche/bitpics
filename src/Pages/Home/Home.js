import React from 'react';
import Article from '../../Components/Article/Article';

import './Home.css';

const Home = () => {
	const title = 'welcome to the gort';
	const content = 'i\'ll be posting my projects here as i do them. please enjoy your stay.';

	return (
		<div className="page-container">
			<Article title={title} content={content} />
		</div>
	);
}

export default Home;

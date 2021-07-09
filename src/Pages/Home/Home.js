import React from 'react';
import Article from '../../Components/Article/Article';

import './Home.css';

const Home = () => {
	const title = 'this is the homepage';
	const content = 'this is content on the homepage.';

	return (
		<div className="page-container">
			<Article title={title} content={content} />
		</div>
	);
}

export default Home;

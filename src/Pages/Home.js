import React from 'react';
import Article from '../Components/Article/Article';

const Home = () => {
	const title = 'this is the homepage';
	const content = 'this is content on the homepage.';
	return (
		<Article title={title} content={content}/>
	);
}

export default Home;

import React from 'react';
import './Article.css';

const Article = ({title, content}) => {
	return (
		<div className="article-container">
			<div className="article-bg">
				<h1 className="article-title">{title}</h1>
				<p className="article-content">{content}</p>
			</div>
		</div>
	);
}

export default Article;

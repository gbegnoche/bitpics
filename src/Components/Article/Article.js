import React from 'react';
import './Article.css';

const Article = ({title, content}) => {
	return (
		<div class="article-container">
			<div class="article-bg">
				<h1 class="article-title">{title}</h1>
				<p class="article-content">{content}</p>
			</div>
		</div>
	);
}

export default Article;

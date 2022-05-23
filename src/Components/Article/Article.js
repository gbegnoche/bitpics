import React from 'react';
import './Article.css';

const Article = ({title, content, ps}) => {
	return (
		<div className="article-container">
			<div className="article-bg">
				<h1 className="article-title">{title}</h1>
				<p className="article-content">{content}</p>
				{ps ? <ul className="article-ps">{Array.isArray(ps) ? ps.map((e) => <li>{e}</li>) : <li>{ps}</li>}</ul> : null}
			</div>
		</div>
	);
}

export default Article;

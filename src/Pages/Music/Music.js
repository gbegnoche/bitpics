import React from 'react';
import Article from '../../Components/Article/Article';

const Music = () => {
	const content = 'please steal it.';
	const ps = <a href="https://soundcloud.com/simsynthy">soundcloud profile</a>

	// const playerStyle = {
	// 	fontSize: '10px',
	// 	color: '#cccccc',
	// 	lineBreak: 'anywhere',
	// 	wordBreak: 'normal',
	// 	overflow: 'hidden',
	// 	whiteSpace: 'nowrap',
	// 	textOverflow: 'ellipsis',
	// 	fontFamily: 'Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif',
	// 	fontWeight: '100',
	// };
	// const linkStyle = {
	// 	color: '#cccccc',
	// 	textDecoration: 'none',
	// };

	return (
		<div className="page-container">
			<Article title="this is my music" content={content} ps={ps} />
			<iframe title="playlist" width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1442345122&color=%23b4b4ac&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
		</div>
	);
}

export default Music;

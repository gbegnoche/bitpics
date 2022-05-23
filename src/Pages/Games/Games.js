import React, { useRef, useState } from 'react';
import Article from '../../Components/Article/Article';
import * as games from './Constants';

const Games = () => {
	const [loadedGame, setLoadedGame] = useState(null);

	const modalRef = useRef();
	
	const content = 'made for game jams or just for fun. if they won\'t load, itch.io might be having issues. try downloading them from my profile below instead.';
	const ps = <a href="https://slimdev.itch.io/"><b>itch.io profile</b></a>;

	const openModal = () => {
		modalRef.current.style.display = "block";
	}
	
	const closeModal = () => {
		modalRef.current.style.display = "none";
	}

	const openGame = (game) => {
		openModal();
		setLoadedGame(game);
	}

	const closeGame = () => {
		closeModal();
		setLoadedGame(null);
	}

	return (
		<div className="page-container">
			<Article title="these are my games" content={content} ps={ps} />
			<button className="button" onClick={() => openGame(games.theSpringening)}>The Spring-en-ing</button>
			<button className="button" onClick={() => openGame(games.rejse)}>Rejse</button>
			<button className="button" onClick={() => openGame(games.instabilityDetected)}>instability detected</button>
			<button className="button" onClick={() => openGame(games.notUnderwater)}>!underwater</button>
			<button className="button" onClick={() => openGame(games.seage)}>Seage (unfinished)</button>
			<div className="modal" ref={modalRef} onClick={closeGame}>
				<div className="game-window">{loadedGame}</div>
			</div>
		</div>
	);
}

export default Games;

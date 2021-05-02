import React, { useEffect, useRef, useState } from 'react';
import './dashboard.styles.css';

const Dashboard = ({ scores, setScores }) => {
	const [currentDifficult, setCurrentDifficult] = useState(1);
	const [gameOn, setGameOn] = useState(false);
	const [Queue, setQueue] = useState([]);
	const [score, setScore] = useState(0);
	const [name, setName] = useState('');
	const [buttons, setButtons] = useState([
		{ color: 'red', hover: false },
		{ color: 'green', hover: false },
		{ color: 'black', hover: false },
		{ color: 'yellow', hover: false },
		{ color: 'blue', hover: false },
		{ color: 'grey', hover: false },
	]);

	const triggerGameLoop = async () => {
		Queue.length = 0;
		let secondCOunter = 0;
		var colorInterval = await setInterval(() => {
			secondCOunter++;
			let randomNum = Math.floor(Math.random() * 6);
			Queue.push(randomNum);
			const newButtons = buttons.map((btn, idx) => {
				if (idx === randomNum) btn.hover = true;
				return btn;
			});
			setButtons(newButtons);

			setTimeout(() => {
				const newButtons = buttons.map((btn, idx) => {
					if (idx === randomNum) btn.hover = false;
					return btn;
				});
				setButtons(newButtons);
			}, 1000);
			if (secondCOunter === currentDifficult) {
				console.log('QUEEUE', Queue);

				clearInterval(colorInterval);
			}
		}, 2000);
	};
	const handleClick = (event) => {
		console.log(Queue);
		const currentClickedButton = parseInt(event.target.value);
		const currentButton = Queue.shift();
		console.log(currentButton, currentClickedButton);
		if (currentClickedButton !== currentButton) {
			alert('GAME IS OVER');
		} else if (Queue.length === 0) {
			alert('YOU WON! LETS GET TO THE NEXT LEVEL');
			setCurrentDifficult((lvl) => lvl + 1);
			setScore((score) => score + 10);
			triggerGameLoop();
		}
		console.log('level', currentDifficult);
	};

	const handleNewGame = () => {
		setCurrentDifficult(1);
		setScore(0);
		setGameOn(true);
		triggerGameLoop();
	};

	return (
		<div className='dashboard'>
			<div className='headlines'>
				<h1 className='level'>{`Player Name: ${name}`}</h1>
				<h1 className='level'>{`Currenet Level: ${currentDifficult}`}</h1>
				<h1 className='level'>{`Your Score: ${score}`}</h1>
			</div>
			{gameOn && (
				<div className='container'>
					{buttons.map((btn, idx) => (
						<button
							key={idx}
							value={idx}
							className={`circle_button ${!btn.hover ? btn.color + 'Hover' : btn.color}`}
							onClick={(e) => handleClick(e)}
						/>
					))}
				</div>
			)}
			<div>
				<input value={name} placeholder='please enter your name' onChange={(e) => setName(e.target.value)}></input>
				<button onClick={handleNewGame}>NEW GAME</button>
			</div>
		</div>
	);
};

export default Dashboard;

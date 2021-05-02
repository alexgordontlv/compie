import React from 'react';
import './sidebar.styles.css';
const Sidebar = ({ scores }) => {
	console.log('SCORES', scores);
	return (
		<div className='sidebar'>
			<h2>{new Date().toLocaleString()}</h2>
			<h3>maxScore</h3>
			<h2>
				{scores.map((score, idx) => (
					<p key={idx}>{score}</p>
				))}
			</h2>
		</div>
	);
};

export default Sidebar;

import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
function App() {
	const [scores, setScores] = useState([]);
	useEffect(() => {
		console.log(scores);
	}, [scores]);

	return (
		<div className='App'>
			<Sidebar scores={scores} setScores={setScores} />
			<Dashboard scores={scores} />
		</div>
	);
}

export default App;

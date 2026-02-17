import { useState } from "react";
import "./App.scss";

function App() {
	const [files, setFiles] = useState([]);

	async function fetchFiles() {
		const response = await fetch("http://localhost:3000/getAllFiles");
		const data = await response.json();
		setFiles(data.files);
		console.log(data.files);
	}

	return (
		<div className="App">
			<div className="main-container">
				<h1>Images</h1>
				<button onClick={fetchFiles}>Fetch Files</button>
			</div>
		</div>
	);
}

export default App;

import { useState } from "react";
import "./App.scss";

function App() {
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);

	async function fetchFileNames() {
		const response = await fetch("http://localhost:3000/getAllFiles");
		const data = await response.json();
		setFiles(data.files);
		console.log(data.files);
	}

	async function getImageByName(name) {
		const response = await fetch(
			`http://localhost:3000/getImageByName/${name}`,
		);
		const data = await response.blob();
		console.log("ok");
		setImage(URL.createObjectURL(data));
	}

	return (
		<div className="App">
			<div className="content">
				<div className="container">
					<h1>Images</h1>
					<button onClick={fetchFileNames}>Fetch File Names</button>
					<button onClick={() => getImageByName("image_1.webp")}>
						Get Image
					</button>
				</div>
				<div className="container">
					{files.map((file) => (
						<div key={file} className="file">
							<p>{file}</p>
						</div>
					))}
				</div>
			</div>
			{image && <img src={image} alt="Retrieved image" />}
		</div>
	);
}

export default App;

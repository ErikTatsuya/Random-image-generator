import { useState } from "react";
import "./App.scss";

function App() {
	const [stats, setStats] = useState(null);
	const [images, setImages] = useState([]);
	const [showAllImages, setShowAllImages] = useState(false);
	const imagesPerPage = 6;

	async function fetchFileNames() {
		try {
			const response = await fetch("http://localhost:8000/getAllImages");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log("Full response:", data);
			setStats({
				totalFiles: data.total_files["*"],
				pngCount: data.total_files.png,
				jpgCount: data.total_files.jpg,
				totalSizeBytes: data.total_size.bytes,
				totalSizeMB: data.total_size.MB,
			});
			console.log("Stats set:", data.total_files, data.total_size);
		} catch (error) {
			console.error("Error fetching file names:", error);
			alert("Failed to fetch file names. Check console for details.");
		}
	}

	async function getImageByName(name) {
		try {
			const response = await fetch(
				`http://localhost:8000/images/${name}`,
			);
			if (!response.ok) throw new Error("Failed to fetch image");
			const data = await response.blob();
			return URL.createObjectURL(data);
		} catch (error) {
			console.error("Error fetching image:", error);
			return null;
		}
	}

	async function generateRandomImage() {
		const x = document.getElementById("x").value;
		const y = document.getElementById("y").value;
		const quantity = document.getElementById("quantity").value;
		const extension = document.getElementById("extension").value;

		// Validation
		if (!x || !y || !quantity || !extension) {
			alert("Please fill in all fields");
			return;
		}

		const xNum = Number(x);
		const yNum = Number(y);
		const quantityNum = Number(quantity);

		if (isNaN(xNum) || xNum <= 0) {
			alert("X dimension must be a positive number");
			return;
		}

		if (isNaN(yNum) || yNum <= 0) {
			alert("Y dimension must be a positive number");
			return;
		}

		if (isNaN(quantityNum) || quantityNum <= 0) {
			alert("Quantity must be a positive number");
			return;
		}

		if (extension !== "png" && extension !== "jpg") {
			alert('Extension must be either "png" or "jpg"');
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8000/generateImages/${xNum}/${yNum}/${quantityNum}/${extension}`,
			);
			if (!response.ok) throw new Error("Failed to generate images");
			const data = await response.json();
			console.log(data);
			fetchFileNames(); // Refresh the file list after generating images

			// Fetch all generated images
			const imageUrls = await Promise.all(
				data.image_names.map((name) => getImageByName(name)),
			);
			setImages(imageUrls.filter((url) => url !== null));
		} catch (error) {
			console.error("Error generating images:", error);
			alert("Failed to generate images");
		}
	}

	return (
		<div className="App">
			<div className="content">
				<div className="container">
					<h1 style={{ textAlign: "center" }}>Images</h1>
					<button onClick={fetchFileNames}>Fetch File Stats</button>
					<button onClick={generateRandomImage}>
						Generate Random Image
					</button>
					<input
						type="text"
						name="x"
						id="x"
						placeholder="X dimension"
					/>
					<input
						type="text"
						name="y"
						id="y"
						placeholder="Y dimension"
					/>
					<input
						type="text"
						name="Q"
						id="quantity"
						placeholder="Quantity"
					/>
					<input
						type="text"
						name="E"
						id="extension"
						placeholder="Extension (png or jpg)"
					/>
				</div>
				<div className="container">
					{stats ? (
						<div>
							<h2>Storage Stats</h2>
							<p>
								<strong>Total Images:</strong>{" "}
								{stats.totalFiles}
							</p>
							<p>
								<strong>PNG Files:</strong> {stats.pngCount}
							</p>
							<p>
								<strong>JPG Files:</strong> {stats.jpgCount}
							</p>
							<p>
								<strong>Total Size:</strong>{" "}
								{stats.totalSizeMB.toFixed(2)} MB (
								{stats.totalSizeBytes.toLocaleString()} bytes)
							</p>
						</div>
					) : (
						<p>Click "Fetch File Names" to see statistics.</p>
					)}
				</div>
				{images && images.length > 0 && (
					<div>
						<div className="images-container">
							{(showAllImages
								? images
								: images.slice(0, imagesPerPage)
							).map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`Generated image ${index + 1}`}
								/>
							))}
						</div>
						{images.length > imagesPerPage && (
							<button
								onClick={() => setShowAllImages(!showAllImages)}
								className="toggle-button"
							>
								{showAllImages
									? "Show Less"
									: `Show More (${images.length - imagesPerPage} more)`}
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;

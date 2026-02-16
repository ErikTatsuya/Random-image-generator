import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="main-container">
        <h1>Images</h1>
      </div>
    </div>
  );
}

export default App;

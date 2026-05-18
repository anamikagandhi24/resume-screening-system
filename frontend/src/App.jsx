import { useState } from "react";

function App() {

  const [resume, setResume] = useState("");

  const [prediction, setPrediction] = useState("");

  const predictCategory = async () => {

    const response = await fetch(
      `http://127.0.0.1:8000/predict?resume=${resume}`
    );

    const data = await response.json();

    setPrediction(String(data.predicted_category));
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Resume Screening System</h1>

      <textarea
        rows="10"
        cols="60"
        placeholder="Paste resume text here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <br /><br />

      <button onClick={predictCategory}>
        Predict Category
      </button>

      <h2>Prediction: {prediction || "Waiting..."}</h2>

    </div>
  );
}

export default App;
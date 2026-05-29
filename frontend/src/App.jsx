import { useState } from "react";

function App() {

  const [resume, setResume] = useState("");

  const [prediction, setPrediction] = useState("");

  const [confidence, setConfidence] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    setResume(e.target.result);
  };

  reader.readAsText(file);
};
  const handlePdfUpload = async (event) => {

  const file = event.target.files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append("file", file);

  try {

    setLoading(true);

    const response = await fetch(
      "https://resume-screening-system-f1ij.onrender.com/upload-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setResume(data.extracted_text);

    setPrediction(data.predicted_category);

    setConfidence(data.confidence);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);
  }
};
  const predictCategory = async () => {

  if (!resume.trim()) {
    alert("Please paste resume text.");
    return;
  }

  setLoading(true);

  const response = await fetch(
    `https://resume-screening-system-f1ij.onrender.com/predict?resume=${resume}`
  );

  const data = await response.json();

  setPrediction(String(data.predicted_category));

  setConfidence(data.confidence);

  setLoading(false);
};
  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0f172a",
      color: "white",
      fontFamily: "Arial",
    }}
  >
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "40px",
        borderRadius: "15px",
        width: "700px",
        textAlign: "center",
        boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
      }}
    >
      <h1>Resume Screening System</h1>


      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        style={{ marginBottom: "20px" }}
      />


      <input
        type="file"
        accept=".pdf"
        onChange={handlePdfUpload}
        style={{ marginBottom: "20px" }}
      />

      <textarea
        rows="10"
        cols="60"
        placeholder="Paste resume text here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      />

      <br /><br />

      <button
        onClick={predictCategory}
        style={{
          padding: "12px 25px",
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#3b82f6",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Predicting..." : "Predict Category"}
      </button>

      <h2 style={{ marginTop: "25px" }}>
        Prediction: {prediction || "Waiting..."}
        
        {confidence && (
          <div style={{marginTop: "10px",fontSize: "20px"}}>
            Confidence: {confidence}%
          </div>
        )}
        
      </h2>
    </div>
  </div>
);
}

export default App;
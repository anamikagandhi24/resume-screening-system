from fastapi import FastAPI
from fastapi import UploadFile, File
import pdfplumber
import pickle
import re
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, '..', 'model', 'model.pkl')
tfidf_path = os.path.join(BASE_DIR, '..', 'model', 'tfidf.pkl')
label_encoder_path = os.path.join(BASE_DIR, '..', 'model', 'label_encoder.pkl')

model = pickle.load(open(model_path, 'rb'))
tfidf = pickle.load(open(tfidf_path, 'rb'))
le = pickle.load(open(label_encoder_path, 'rb'))
def clean_resume(text):

    text = text.lower()

    text = re.sub(r'http\S+', ' ', text)

    text = re.sub(r'[^a-zA-Z ]', ' ', text)

    text = re.sub(r'\s+', ' ', text)

    return text

@app.get("/")
def home():
    return {"message": "Resume Screening API is running"}

@app.get("/predict")
def predict(resume: str):

    cleaned_resume = clean_resume(resume)

    vectorized_resume = tfidf.transform([cleaned_resume])

    prediction = model.predict(vectorized_resume)

    probability=model.predict_proba(vectorized_resume)

    category = le.inverse_transform(prediction)

    return {
        "predicted_category": category[0],
        "confidence":round(float(max(probability[0]))*100,2)
    }

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    text = ""

    with pdfplumber.open(file.file) as pdf:

        for page in pdf.pages:
            extracted = page.extract_text()

            if extracted:
                text += extracted

    cleaned_resume = clean_resume(text)

    vectorized_resume = tfidf.transform([cleaned_resume])

    prediction = model.predict(vectorized_resume)

    probability = model.predict_proba(vectorized_resume)

    category = le.inverse_transform(prediction)

    return {
        "predicted_category": category[0],
        "confidence": round(float(max(probability[0])) * 100, 2),
        "extracted_text": text
    }
    
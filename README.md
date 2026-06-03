<img width="1408" height="985" alt="WhatsApp Image 2026-06-03 at 6 39 24 PM" src="https://github.com/user-attachments/assets/1ab5ac0d-ae3f-4a36-b346-75aa1574fe4a" /># AI Resume Screening System

A Machine Learning powered Resume Screening System that automatically classifies resumes into different job categories using NLP and Machine Learning techniques.

## Live Demo

Frontend: https://resume-screening-system-eosin.vercel.app

Backend API: https://resume-screening-system-f1ij.onrender.com/docs

## Features

- Upload resumes in PDF format
- Extract text from resumes automatically
- Predict resume category using Machine Learning
- Real-time classification results
- REST API built with FastAPI
- Interactive frontend built with React
- Fully deployed and accessible online

## Tech Stack

### Frontend
- React.js
- Vite
- CSS

### Backend
- FastAPI
- Python

### Machine Learning
- Scikit-learn
- TF-IDF Vectorization
- NLP Text Preprocessing

### Deployment
- Vercel (Frontend)
- Render (Backend)

## Project Architecture

Resume PDF
↓
PDF Text Extraction
↓
Text Cleaning & Preprocessing
↓
TF-IDF Vectorization
↓
Machine Learning Model
↓
Category Prediction
↓
Frontend Display

## Screenshots

### Home Page

<img width="1408" height="985" alt="WhatsApp Image 2026-06-03 at 6 39 24 PM" src="https://github.com/user-attachments/assets/198ec3a9-7639-4e9b-841f-1f728a015e7e" />

### Prediction Result

<img width="1405" height="988" alt="WhatsApp Image 2026-06-03 at 6 42 16 PM" src="https://github.com/user-attachments/assets/bcdbe72d-9370-4996-a95b-3128ece21319" />

## API Endpoints

### Home Endpoint

```http
GET /

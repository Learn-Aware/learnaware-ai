from fastapi import APIRouter, HTTPException
from schemas.prediction import PredictionInput, PredictionOutput
from joblib import load
import numpy as np
import os

router = APIRouter()

# Load the ML model
model_path = os.path.join("app", "models", "model.pkl")
try:
    model = load(model_path)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


@router.get("/status")
async def model_status():
    if model:
        return {"model_status": "Model loaded successfully"}
    else:
        return {"model_status": "Model not loaded"}


@router.post("/predict", response_model=PredictionOutput)
async def predict(input_data: PredictionInput):
    if not model:
        raise HTTPException(status_code=500, detail="Model is not loaded")

    data = np.array(
        [[input_data.feature1, input_data.feature2, input_data.feature3]])
    prediction = model.predict(data)[0]
    confidence = np.max(model.predict_proba(data))

    return {"prediction": int(prediction), "confidence": float(confidence)}

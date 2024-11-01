from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.followup_services import generate_followup_questions
from text_processing.text_processing import extract_and_parse_json, process_json_output
import json


class QuestionRequest(BaseModel):
    question: str

@app.post("/generate-followup")
async def generate_followup(question_request: QuestionRequest):
    try:
        response = generate_followup_questions(question_request.question)
        try:
            json_data = extract_and_parse_json(response)
        except ValueError as e:
            print(f"Error: {e}")
            json_data = {}
        
        if json_data:
            processed_output = process_json_output(json_data)
            output_response = json.dumps(processed_output, indent=4)
        return output_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

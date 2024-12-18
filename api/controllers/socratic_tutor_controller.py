from fastapi import APIRouter, HTTPException
from schemas.socratic_tutor_schemas import StudentQuestionRequest, TutorResponse
from core.logic.socratic_tutor_logic import generate_socratic_response

router = APIRouter()

# API Endpoint: Handles the request and calls the core logic
@router.post("/api/socratic_tutor", response_model=TutorResponse)
def socratic_tutor_endpoint(request: StudentQuestionRequest):
    try:
        # Call the core logic function
        response_data = generate_socratic_response(request.question)
        return {"followup_questions": response_data}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

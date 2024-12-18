from pydantic import BaseModel
from typing import List, Dict


class StudentQuestionRequest(BaseModel):
    """
    Request model for Socratic Tutor API.
    """
    question: str


class TutorResponse(BaseModel):
    """
    Response model for Socratic Tutor API.
    """
    followup_questions: List[Dict]

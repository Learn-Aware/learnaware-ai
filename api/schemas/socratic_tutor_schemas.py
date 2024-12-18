from pydantic import BaseModel
from typing import List, Dict, Optional


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


class StartSessionRequest(BaseModel):
    student_question: str

class SubmitAnswerRequest(BaseModel):
    session_id: str
    user_answer: str

class QuestionResponse(BaseModel):
    session_id: str
    question: str
    guidance: Optional[str] = None
    correct: Optional[bool] = None

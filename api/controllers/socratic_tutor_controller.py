from core.logic.conversation_flow import main_chat_flow
from core.logic.conversation_flowv2 import main_chat_flowv2
from fastapi import APIRouter, HTTPException
from schemas.socratic_tutor_schemas import StudentQuestionRequest, TutorAnswerRequest, TutorResponse, StartSessionRequest, SubmitAnswerRequest, QuestionResponse
from core.logic.socratic_tutor_logic import generate_socratic_response, start_tutoring_session, submit_tutor_answer

router = APIRouter()


# In-memory conversation storage
SESSION_FILE = "temp_db/conversation_db_v2.json"
# conversations = {}

# API Endpoint: Handles the request and calls the core logic
@router.post("/api/socratic_tutor", response_model=TutorResponse)
def socratic_tutor_endpoint(request: StudentQuestionRequest):
    try:
        # Call the core logic function
        response_data = generate_socratic_response(request.question)
        return {"followup_questions": response_data}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/start-session", response_model=QuestionResponse)
async def start_session(request: StartSessionRequest):
    """Initiates a Socratic tutoring session."""
    return start_tutoring_session(request.student_question, SESSION_FILE)

@router.post("/submit-answer", response_model=QuestionResponse)
async def submit_answer(request: SubmitAnswerRequest):
    """Processes the student's answer."""
    session_id = request.session_id
    user_answer = request.user_answer

    if session_id not in SESSION_FILE:
        raise HTTPException(status_code=404, detail="Session not found.")
    return submit_tutor_answer(session_id, user_answer, SESSION_FILE)

@router.post("/v1/chat", response_model = QuestionResponse)
async def chat_flow(request: StartSessionRequest):
    return main_chat_flow(request.user_request, SESSION_FILE, request.session_id)


@router.post("/v2/chat", response_model = QuestionResponse)
async def chat_flow(request: StartSessionRequest):
    return main_chat_flowv2(request.user_request, SESSION_FILE, request.session_id)

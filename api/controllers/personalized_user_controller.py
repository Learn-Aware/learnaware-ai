from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict
from data.questions import questions

router = APIRouter()

# In-memory storage for user sessions
user_sessions: Dict[str, Dict] = {}

class Answer(BaseModel):
    user_id: str
    question_id: int
    answer: str

# Start a new session
# @app.post("/start/")
# async def start_session(user_id: str):
#     if user_id in user_sessions:
#         raise HTTPException(status_code=400, detail="Session already exists for this user.")
#     user_sessions[user_id] = {"current_question": 0, "responses": {}}
#     return {"message": "Session started.", "question": questions[0]}

@router.post("/start/")
async def start_session(user_id: str):
    session = user_sessions.get(user_id)
    if session:
        # Return the current state of the existing session
        current_question_index = session["current_question"]
        current_question = None
        if current_question_index < len(questions):
            current_question = questions[current_question_index]
        return {
            "message": "Session already exists for this user.",
            "current_question": current_question,
            "completed_responses": session["responses"],
            "progress": f"{current_question_index}/{len(questions)}"
        }
    # Start a new session if none exists
    user_sessions[user_id] = {"current_question": 0, "responses": {}}
    return {"message": "Session started.", "question": questions[0]}


# Submit an answer and get the next question
@router.post("/answer/")
async def submit_answer(answer: Answer):
    session = user_sessions.get(answer.user_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found.")
    
    # Validate answer
    question = questions[session["current_question"]]
    if question["id"] != answer.question_id:
        raise HTTPException(status_code=400, detail="Invalid question ID.")
    if answer.answer not in question["options"]:
        raise HTTPException(status_code=400, detail=f"Invalid answer '{answer.answer}'.")

    # Save the response
    session["responses"][question["dimension"]] = session["responses"].get(question["dimension"], {"a": 0, "b": 0})
    session["responses"][question["dimension"]][answer.answer] += 1

    # Move to the next question
    session["current_question"] += 1
    if session["current_question"] < len(questions):
        return {"message": "Answer recorded.", "next_question": questions[session["current_question"]]}
    else:
        # All questions answered; calculate learning style
        scores = session["responses"]
        learning_style = {
            "activeReflective": "Active" if scores["activeReflective"]["a"] >= scores["activeReflective"]["b"] else "Reflective",
            "sensingIntuitive": "Sensing" if scores["sensingIntuitive"]["a"] >= scores["sensingIntuitive"]["b"] else "Intuitive",
            "visualVerbal": "Visual" if scores["visualVerbal"]["a"] >= scores["visualVerbal"]["b"] else "Verbal",
            "sequentialGlobal": "Sequential" if scores["sequentialGlobal"]["a"] >= scores["sequentialGlobal"]["b"] else "Global",
        }
        # Remove session after completion
        del user_sessions[answer.user_id]
        return {"message": "All questions answered.", "learning_style": learning_style}

# Get all answers for a user
@router.get("/answers/{user_id}")
async def get_all_answers(user_id: str):
    session = user_sessions.get(user_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found.")
    return {"responses": session["responses"]}

# Get the current state of a user
@router.get("/state/{user_id}")
async def get_user_state(user_id: str):
    session = user_sessions.get(user_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found.")
    current_question_index = session["current_question"]
    current_question = None
    if current_question_index < len(questions):
        current_question = questions[current_question_index]
    return {
        "current_question": current_question,
        "completed_responses": session["responses"],
        "progress": f"{current_question_index}/{len(questions)}"
    }

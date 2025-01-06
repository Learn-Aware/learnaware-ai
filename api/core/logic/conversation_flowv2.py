import json
import os
from typing import Optional
import uuid
import google.generativeai as genai

from core.logic.conversation_flow import save_session_data
from schemas.socratic_tutor_schemas import QuestionResponse
from ..prompt.system_instruction import System_Instruction
# from system_instruction import System_Instruction
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ["GEMINI_API_KEY"]
genai.configure(api_key=api_key)


def main_chat_flowv2(user_request: str, session_file: str, session_id: Optional[str] = None):
    with open(session_file, "r") as f:
        sessions = json.load(f)
    
    if session_id and session_id in sessions:
        session_data = sessions[session_id]
    else:
        session_id = str(uuid.uuid4())
        sessions[session_id] = {"conversation_flow": []}
        session_data = sessions[session_id]

    if "conversation_flow" not in session_data:
        session_data["conversation_flow"] = []

    
    scenario = "laai_tutor"  # The scenario you want to retrieve instructions for
    sys_prompt = System_Instruction.system_instruction(scenario)

    print(sys_prompt)
    model = genai.GenerativeModel("learnlm-1.5-pro-experimental",system_instruction=sys_prompt)
    
    chat = model.start_chat(
        history=session_data["conversation_flow"]
    )
    response = chat.send_message(user_request)

    session_data["conversation_flow"].append({"role": "user", "parts": user_request})
    session_data["conversation_flow"].append({"role": "model", "parts": response.text})

    save_session_data(session_file, sessions)

    # return response.text

    return QuestionResponse(
                    session_id=session_id,
                    question=response.text
                )



    
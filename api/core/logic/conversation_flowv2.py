import json
import os
from typing import Optional
import uuid
import google.generativeai as genai
import PIL.Image
import base64
from fastapi import UploadFile
from core.logic.conversation_flow import save_session_data
from schemas.socratic_tutor_schemas import QuestionResponse
from ..prompt.system_instruction import System_Instruction
# from system_instruction import System_Instruction
from dotenv import load_dotenv
import shutil
from PIL import Image

load_dotenv()
api_key = os.environ["GEMINI_API_KEY"]
genai.configure(api_key=api_key)

# Function to store image and return its path
def store_image(image: UploadFile, session_id: str, image_index: int) -> str:
    # Define the directory where images will be stored
    directory = f"./question_bank/{session_id}"
    
    # Create the session-specific folder if it doesn't exist
    os.makedirs(directory, exist_ok=True)
    
    # Generate the image filename (e.g., session_id_image_1.jpg)
    image_filename = f"{session_id}_image_{image_index}{os.path.splitext(image.filename)[1]}"
    image_path = os.path.join(directory, image_filename)
    
    # Save the image to the disk
    with open(image_path, "wb") as image_file:
        shutil.copyfileobj(image.file, image_file)
    
    return image_path

def main_chat_flowv2(user_request: str, session_file: str,  session_id: Optional[str], image: Optional[UploadFile] ):


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

    # print(sys_prompt)
    model = genai.GenerativeModel("learnlm-1.5-pro-experimental",system_instruction=sys_prompt)

    # If there is an image uploaded, store it and generate the prompt accordingly
    if image:
        # Find how many images are already stored in this session folder
        directory = f"./question_bank/{session_id}"

        os.makedirs(directory, exist_ok=True)

        existing_images = len([f for f in os.listdir(directory) if f.startswith(f"{session_id}_image_")])

        # Store the image and get the path
        image_path = store_image(image, session_id, existing_images + 1)
        
        # Load the image for further processing (e.g., generate a prompt or analysis)
        image = Image.open(image_path)
        # prompt = "can you help me to solve this"

        response = model.generate_content([user_request, image])
    else:

        directory = f"./question_bank/{session_id}"
        os.makedirs(directory, exist_ok=True)
        existing_images = [f for f in os.listdir(directory) if f.startswith(f"{session_id}_image_")]
        # print(f)

        if existing_images:
            image_filename = f"{directory}/{existing_images[0]}"
            print(image_filename)
            image = PIL.Image.open(image_filename)
            session_data["conversation_flow"].append({"role": "user", "parts": user_request})

            response = model.generate_content([str(session_data["conversation_flow"]), image])
        else:

            chat = model.start_chat(
                history=session_data["conversation_flow"]
            )
            response = chat.send_message(user_request)
            session_data["conversation_flow"].append({"role": "user", "parts": user_request})

    # image_path = "/Users/vihidun/MyFolder/UOM/Final Year Project/learnaware-ai/api/question_bank/wp_3term_part1_22.png"
    # image = PIL.Image.open(image_path)
    # prompt = "can you help me to solve this"


    # chat = model.start_chat(
        # history=session_data["conversation_flow"]
    # )
    # response = chat.send_message(user_request)
    # response = model.generate_content([prompt, image])

    # session_data["conversation_flow"].append({"role": "user", "parts": user_request})
    session_data["conversation_flow"].append({"role": "model", "parts": response.text})

    save_session_data(session_file, sessions)

    # return response.text

    return QuestionResponse(
                    session_id=session_id,
                    question=response.text,
                    correct= True,
                )



    
from models.text_generator import generate_text
from prompts.socratic_prompt import generate_socratic_prompt

def generate_followup_questions(student_question):
    # Generate the prompt
    messages = generate_socratic_prompt(student_question)
    
    # Call text generation
    socratic_response = generate_text(messages)
    
    return {"followup_questions": socratic_response}

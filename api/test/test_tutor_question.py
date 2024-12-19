import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api.core.services.tutor_question_generator import TutorQuestionGenerator

if __name__ == "__main__":
    # Initialize the TutorQuestionGenerator
    tutor = TutorQuestionGenerator(model_name="phi3-medium")

    # Example input question
    input_question = "How does photosynthesis work in plants?"

    print("\nOriginal Question:")
    print(input_question)

    # Generate the tutor-like question
    try:
        tutor_question = tutor.ask_question(input_question)
        print("\nTutor-Like Question:")
        print(tutor_question)
    except Exception as e:
        print(f"Error: {e}")

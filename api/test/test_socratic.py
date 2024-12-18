import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from core.utils.followup_question import FollowUpQuestionGenerator

if __name__ == "__main__":
    # Initialize generator for different models
    model_names = ["gemini"]

    student_question = "How do I solve the equation 2x + 3 = 7?"

    for model_name in model_names:
        print(f"\n--- Using model: {model_name} ---")
        generator = FollowUpQuestionGenerator(model_name=model_name)
        try:
            result = generator.generate(student_question)
            print("Generated Follow-up Questions:")
            print(result)
        except ValueError as e:
            print(f"Error: {e}")

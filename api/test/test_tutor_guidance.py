import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api.core.services.tutor_guidance_generator import TutorGuidanceGenerator

if __name__ == "__main__":
    # Initialize the TutorGuidanceGenerator
    tutor_guidance = TutorGuidanceGenerator(model_name="learnlm")

    # Example inputs
    correct_answer = "The capital of France is Paris."
    student_answer = "London"

    print("\nCorrect Answer:")
    print(correct_answer)

    print("\nStudent's Incorrect Answer:")
    print(student_answer)

    # Generate step-by-step guidance
    try:
        guidance = tutor_guidance.generate_guidance(correct_answer, student_answer)
        print("\nTutor's Guidance:")
        print(guidance)
    except Exception as e:
        print(f"Error: {e}")

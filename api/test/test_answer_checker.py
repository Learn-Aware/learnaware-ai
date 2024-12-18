import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from core.utils.answer_checker import AnswerChecker

if __name__ == "__main__":
    # Initialize the AnswerChecker
    checker = AnswerChecker(model_name="mistral-7b")

    # Example inputs
    question = "What is 2 + 2?"
    expected_answer = "4"
    user_answers = ["4", "5"]

    for user_answer in user_answers:
        print(f"\nChecking user's answer: '{user_answer}'")
        try:
            result = checker.check_answer(question, expected_answer, user_answer)
            print("Result:", result)
        except ValueError as e:
            print("Error:", e)

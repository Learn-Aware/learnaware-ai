from core.utils.followup_question import FollowUpQuestionGenerator
from core.utils.tutor_question_generator import TutorQuestionGenerator
from core.utils.tutor_guidance_generator import TutorGuidanceGenerator

def generate_socratic_response(student_question: str) -> list[dict]:
    """
    Generate Socratic Tutor follow-up questions and expected answers.

    :param student_question: The student's initial question.
    :return: A list of dictionaries with follow-up questions and expected answers.
    """
    # Step 1: Generate follow-up questions and answers
    followup_qa = FollowUpQuestionGenerator().generate(student_question)
    if isinstance(followup_qa, str):
        raise ValueError("Error in generating follow-up questions")

    questions_and_answers = followup_qa.get("questions_and_answers", [])
    if not questions_and_answers:
        raise ValueError("No follow-up questions generated")

    # Step 2: Initialize helpers
    tutor_generator = TutorQuestionGenerator()
    guidance_generator = TutorGuidanceGenerator()

    # Step 3: Construct tutor-style questions
    tutor_data = []
    for item in questions_and_answers:
        question = item.get("question")
        expected_answer = item.get("answer")

        if not question or not expected_answer:
            continue

        # Generate a tutor-like question
        tutor_question = tutor_generator.ask_question(question)
        tutor_data.append({"question": tutor_question, "expected_answer": expected_answer})

    return tutor_data

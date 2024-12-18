import uuid
from core.utils.followup_question import FollowUpQuestionGenerator
from core.utils.tutor_question_generator import TutorQuestionGenerator
from core.utils.tutor_guidance_generator import TutorGuidanceGenerator
from core.utils.answer_checker import AnswerChecker
from schemas.socratic_tutor_schemas import QuestionResponse

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

def start_tutoring_session(student_question: str, conversations: dict):
    """Generate follow-up questions and start a new session."""
    followup_qa = FollowUpQuestionGenerator().generate(student_question)
    if not followup_qa or "questions_and_answers" not in followup_qa:
        raise ValueError("Error generating follow-up questions.")

    session_id = str(uuid.uuid4())
    questions_and_answers = followup_qa["questions_and_answers"]

    conversations[session_id] = {
        "questions_and_answers": questions_and_answers,
        "current_question_index": 0,
        "attempts": 0
    }

    first_question = questions_and_answers[0]["question"]
    return QuestionResponse(session_id=session_id, question=first_question)

def submit_tutor_answer(session_id: str, user_answer: str, conversations: dict):
    """Evaluate the student's answer and provide feedback."""
    session = conversations[session_id]
    current_index = session["current_question_index"]
    questions_and_answers = session["questions_and_answers"]

    current_question = questions_and_answers[current_index]["question"]
    expected_answer = questions_and_answers[current_index]["answer"]

    result = AnswerChecker().check_answer(current_question, expected_answer, user_answer)
    is_correct = result.get("result") == "correct"

    if is_correct:
        session["current_question_index"] += 1
        session["attempts"] = 0
        if session["current_question_index"] < len(questions_and_answers):
            next_question = questions_and_answers[session["current_question_index"]]["question"]
            return QuestionResponse(session_id=session_id, question=next_question, correct=True)
        else:
            del conversations[session_id]
            return QuestionResponse(session_id=session_id, question="Session complete!", correct=True)
    else:
        session["attempts"] += 1
        if session["attempts"] < 3:
            guidance = TutorGuidanceGenerator().generate_guidance(expected_answer, user_answer)
            return QuestionResponse(session_id=session_id, question=current_question, guidance=guidance, correct=False)
        else:
            del conversations[session_id]
            return QuestionResponse(session_id=session_id, question=f"The correct answer was: {expected_answer}. Session ended.", correct=False)
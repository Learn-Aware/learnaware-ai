def generate_socratic_prompt(student_question):
    prompt = {
        "role": "system",
        "content": f"""You are a Socratic tutor. This is the student question: '{student_question}'.
                 Please generate **an appropriate number of follow-up questions**, each with an expected answer, to guide the student to the correct answer.
                 Only generate the number of questions and answers that are necessary, up to a maximum of 10.
                 If fewer questions are sufficient, stop at the appropriate point.

                 Output the follow-up questions and their expected answers in **valid JSON format** like this:

                 {{
                     "questions_and_answers": [
                         {{"question": "What is the first step in solving the equation?",
                           "answer": "Isolate the variable by subtracting 3 from both sides."}},
                         {{"question": "Can you identify the terms?",
                           "answer": "The terms are 2x and 3 on the left side of the equation."}},
                         ...
                     ]
                 }}

                 Ensure the output is **valid JSON**, not truncated, and contains an appropriate number of questions and their corresponding expected answers, based on the complexity of the student's question."""
    }
    return [prompt]

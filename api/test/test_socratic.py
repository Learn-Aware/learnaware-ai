from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the model and tokenizer
model = AutoModelForCausalLM.from_pretrained(
    "microsoft/Phi-3.5-mini-instruct",
    device_map="cuda",
    torch_dtype="auto",
    trust_remote_code=True,
)
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3.5-mini-instruct")


def generate_response(prompt, max_length=512):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_length=max_length, do_sample=True, temperature=0.7)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)


def generate_followup_question(student_question):
    prompt = (
        "The student asked the following question: \"{}\". "
        "Generate a logical follow-up question to guide them towards the correct answer."
    ).format(student_question)
    return generate_response(prompt)


def check_answer_correctness(followup_question, student_answer):
    prompt = (
        "The student was asked the question: \"{}\" and responded with: \"{}\". "
        "Determine whether the answer is correct. Respond with \"Correct\" or \"Incorrect\" and a brief explanation."
    ).format(followup_question, student_answer)
    response = generate_response(prompt)
    return response.startswith("Correct"), response


def socratic_guidance(followup_question, student_answer):
    prompt = (
        "The student was asked the question: \"{}\" and answered incorrectly: \"{}\". "
        "Provide a helpful hint or guidance to nudge the student towards the correct answer without revealing it outright."
    ).format(followup_question, student_answer)
    return generate_response(prompt)


def socratic_tutor(student_question):
    print("Student Question:", student_question)
    followup_question = generate_followup_question(student_question)

    attempt = 0
    while attempt < 3:
        print("Follow-up Question:", followup_question)
        student_answer = input("Your Answer: ")

        correct, feedback = check_answer_correctness(followup_question, student_answer)
        print("Feedback:", feedback)

        if correct:
            print("Correct answer! Moving to the next question.")
            break
        else:
            attempt += 1
            if attempt < 3:
                print("Let me help you.")
                hint = socratic_guidance(followup_question, student_answer)
                print("Hint:", hint)
            else:
                print("You've used all attempts. Here's the correct answer:")
                correct_answer_prompt = (
                    "The student was asked the question: \"{}\". "
                    "Provide the correct answer explicitly."
                ).format(followup_question)
                correct_answer = generate_response(correct_answer_prompt)
                print("Correct Answer:", correct_answer)

# Example usage
if __name__ == "__main__":
    student_question = input("What is your question? ")
    socratic_tutor(student_question)

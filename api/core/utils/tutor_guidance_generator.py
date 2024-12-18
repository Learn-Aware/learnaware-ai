from core.prompt.tutor_guidance_generator import TutorGuidanceGeneratorPrompt
from core.utils.api_utils import APIUtils

class TutorGuidanceGenerator:
    """
    Class to generate questions in a tutor-like tone.
    """

    def __init__(self, model_name: str = "phi3-mini"):
        """
        Initialize the TutorQuestionGenerator with a specific model.
        :param model_name: The name of the model to use for generating questions.
        """
        self.api_utils = APIUtils(model_name=model_name)

    def generate_guidance(self, correct_answer: str, student_answer: str) -> str:
        """
        Generate a question in a concise, tutor-like tone.

        """
        prompt = TutorGuidanceGeneratorPrompt.construct(correct_answer, student_answer)
        response = self.api_utils.generate_response(prompt)
        return response.strip()
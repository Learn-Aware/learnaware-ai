# from openai import OpenAI
import openai
from typing import Dict
from models.model_registry import ModelRegistry
import json

class APIUtils:
    """
    Utility class for interacting with different LLM APIs.
    """

    def __init__(self, model_name: str):
        """
        Initialize APIUtils for a specific model.
        """
        self.model_config = ModelRegistry.get_model_config(model_name)
        openai.api_key = self.model_config["api_key"]
        openai.api_base = self.model_config["base_url"]

    def generate_response(self, prompt: str) -> str:
        """
        Call the LLM API to get a response for the given prompt.
        """
        response = openai.ChatCompletion.create(
            model=self.model_config["name"],
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    @staticmethod
    def parse_json_response(response: str) -> Dict:
        """
        Extract and parse the JSON from the response.
        """
        try:
            start_index = response.find('{')
            end_index = response.rfind('}') + 1
            json_text = response[start_index:end_index]
            return json.loads(json_text)
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse JSON: {e}")

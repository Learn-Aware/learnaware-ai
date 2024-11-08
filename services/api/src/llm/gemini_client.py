import google.generativeai as genai
from typing import List, Dict
import os

class GeminiClient:
    def __init__(self, api_key: str = None):
        if api_key is None:
            api_key = os.getenv('GOOGLE_API_KEY')
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash-001')
        
    def chat_completion(self, messages: List[Dict[str, str]]) -> str:
        """Generate chat completion using Gemini"""
        try:
            # Convert messages to Gemini format
            chat = self.model.start_chat(history=[])
            
            for message in messages:
                if message["role"] == "user":
                    response = chat.send_message(message["content"])
                elif message["role"] == "system":
                    # Handle system messages as context
                    response = chat.send_message(
                        f"Context: {message['content']}\nPlease acknowledge this context."
                    )
            
            return response.text
            
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")

    def generate(self, prompt: str) -> str:
        """Generate text completion using Gemini"""
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")

    def create_system_prompt(self, role: str = "tutor") -> str:
        """Create a system prompt based on the role"""
        if role == "tutor":
            return """You are an intelligent and patient AI tutor. Your responses should be:
                     1. Clear and educational
                     2. Tailored to the student's level
                     3. Include examples when helpful
                     4. Encourage critical thinking
                     5. Break down complex topics into simpler parts"""
        return "" 
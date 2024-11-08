from typing import List, Dict
import openai
from .meta_retriever import MetaRetriever

class MetaGenerator:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.retriever = MetaRetriever()

    def generate_response(self, query: str, user_context: Dict) -> str:
        """Generate response using meta-learning and retrieved context"""
        # Retrieve relevant documents
        retrieved_docs = self.retriever.retrieve(query)
        
        # Build context from retrieved documents and user context
        context = self._build_context(retrieved_docs, user_context)
        
        # Generate response using OpenAI
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": query}
            ]
        )
        
        return response.choices[0].message.content

    def _build_context(self, retrieved_docs: List[Dict], user_context: Dict) -> str:
        """Build context from retrieved documents and user information"""
        context = "You are an AI tutor with access to the following relevant information:\n\n"
        
        # Add retrieved documents
        for i, doc in enumerate(retrieved_docs, 1):
            context += f"Document {i}:\n{doc['content']}\n\n"
        
        # Add user context
        context += f"User Knowledge State: {user_context.get('knowledge_state', {})}\n"
        context += f"Learning Style: {user_context.get('learning_style', {})}\n"
        
        # Add meta-learning guidance
        context += "\nUse this information to provide a personalized response that:"
        context += "\n- Matches the user's current knowledge level"
        context += "\n- Aligns with their learning style"
        context += "\n- References relevant examples from the retrieved documents"
        
        return context 
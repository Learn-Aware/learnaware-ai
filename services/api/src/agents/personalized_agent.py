import os
from pathlib import Path
import json
from datetime import datetime
from ..llm.gemini_client import GeminiClient
from ..models.learning_profile import LearningProfile
from ..utils.config import load_config

class PersonalizedAIAgent:
    def __init__(self):
        config = load_config()
        self.profiles_dir = config['profiles_dir']
        self.llm = GeminiClient()  # Initialize Gemini client
        self.learning_profiles = {}
        self.conversation_context = {}
        self._ensure_profile_directory()
    
    def _ensure_profile_directory(self):
        """Ensure the profiles directory exists"""
        if not os.path.exists(self.profiles_dir):
            os.makedirs(self.profiles_dir, exist_ok=True)
    
    def initialize_user(self, user_id: str) -> None:
        """Initialize a new user profile"""
        if user_id not in self.learning_profiles:
            self.learning_profiles[user_id] = LearningProfile(user_id)
            
    def generate_response(self, user_id: str, user_input: str) -> str:
        """Generate personalized response using Gemini"""
        profile = self.learning_profiles.get(user_id)
        
        # Build context
        context = self._build_context(profile)
        
        # Generate response using Gemini
        messages = [
            {"role": "system", "content": context},
            {"role": "user", "content": user_input}
        ]
        
        response = self.llm.chat_completion(messages)
        
        # Update knowledge state and log interaction
        self._update_knowledge_state(profile, user_input, response)
        
        return response
    
    def _build_context(self, profile) -> str:
        """Build context string from user profile"""
        context = "You are an intelligent AI tutor. "
        context += f"User Knowledge State: {json.dumps(profile.knowledge_state)}\n"
        context += f"Learning Style: {json.dumps(profile.learning_style)}\n"
        context += "Recent Interactions:\n"
        
        recent_interactions = profile.interaction_history[-5:] if profile.interaction_history else []
        for interaction in recent_interactions:
            context += f"User: {interaction['user_input']}\n"
            context += f"Agent: {interaction['agent_response']}\n"
        
        return context
    
    def _update_knowledge_state(self, profile, user_input: str, response: str):
        """Update knowledge state based on interaction"""
        # Analyze topic using Gemini
        topic_prompt = f"Identify the main topic of this interaction in a single word or short phrase:\nQ: {user_input}\nA: {response}"
        topic = self.llm.generate(topic_prompt).strip().lower()
        
        # Update knowledge state
        current_level = profile.knowledge_state.get(topic, 0.0)
        new_level = min(1.0, current_level + 0.1)
        profile.update_knowledge_state(topic, new_level)
        
        # Log interaction
        profile.add_interaction({
            "user_input": user_input,
            "agent_response": response,
            "topic": topic,
            "knowledge_level": new_level
        })
    
    def save_profile(self, user_id: str):
        """Save user profile to file"""
        profile = self.learning_profiles.get(user_id)
        if not profile:
            return
            
        filepath = os.path.join(self.profiles_dir, f"{user_id}.json")
        
        with open(filepath, 'w') as f:
            json.dump({
                'user_id': profile.user_id,
                'knowledge_state': profile.knowledge_state,
                'learning_style': profile.learning_style,
                'interaction_history': profile.interaction_history,
                'preferences': profile.preferences
            }, f, indent=2)
    
    def load_profile(self, user_id: str) -> bool:
        """Load user profile from file"""
        filepath = os.path.join(self.profiles_dir, f"{user_id}.json")
        
        try:
            if not os.path.exists(filepath):
                return False
                
            with open(filepath, 'r') as f:
                data = json.load(f)
                profile = LearningProfile(user_id)
                profile.knowledge_state = data['knowledge_state']
                profile.learning_style = data['learning_style']
                profile.interaction_history = data['interaction_history']
                profile.preferences = data['preferences']
                self.learning_profiles[user_id] = profile
                return True
        except:
            return False
    
    def auto_save_profiles(self):
        """Save all active profiles"""
        for user_id in self.learning_profiles:
            try:
                self.save_profile(user_id)
            except Exception as e:
                print(f"Failed to auto-save profile for {user_id}: {str(e)}")
    
    def assess_knowledge(self, user_id: str, topic: str) -> float:
        """Assess user's current knowledge level on a topic"""
        profile = self.learning_profiles.get(user_id)
        return profile.knowledge_state.get(topic, 0.0)
    
    def adapt_difficulty(self, user_id: str, topic: str) -> float:
        """Adapt content difficulty based on user's performance"""
        profile = self.learning_profiles.get(user_id)
        current_level = profile.knowledge_state.get(topic, 0.5)
        return current_level
    
    def __del__(self):
        """Destructor to ensure profiles are saved when the agent is destroyed"""
        try:
            self.auto_save_profiles()
        except:
            pass
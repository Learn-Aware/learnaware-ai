from typing import Dict
from datetime import datetime

class LearningProfile:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.knowledge_state = {}
        self.learning_style = {}
        self.interaction_history = []
        self.preferences = {}
        
    def update_knowledge_state(self, topic: str, proficiency: float):
        self.knowledge_state[topic] = proficiency
        
    def add_interaction(self, interaction: Dict):
        interaction['timestamp'] = datetime.now().isoformat()
        self.interaction_history.append(interaction)
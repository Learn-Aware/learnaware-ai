import json
from pathlib import Path

def initialize_knowledge_base():
    """Initialize the knowledge base with sample educational content"""
    knowledge_base = {
        "0": {
            "content": "Python functions are blocks of reusable code that perform specific tasks...",
            "metadata": {
                "topic": "python_functions",
                "difficulty": "beginner"
            }
        },
        "1": {
            "content": "Object-oriented programming (OOP) is a programming paradigm...",
            "metadata": {
                "topic": "oop",
                "difficulty": "intermediate"
            }
        }
        # Add more documents as needed
    }
    
    # Save to file
    kb_path = Path(__file__).parent.parent / 'rag' / 'data' / 'knowledge_base.json'
    kb_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(kb_path, 'w') as f:
        json.dump(knowledge_base, f, indent=2)

if __name__ == "__main__":
    initialize_knowledge_base() 
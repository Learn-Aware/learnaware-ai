import os
from dotenv import load_dotenv
from pathlib import Path

def load_config():
    """Load configuration from environment variables"""
    load_dotenv()
    
    current_dir = Path(__file__).parent.parent.parent
    
    config = {
        'profiles_dir': os.path.join(current_dir, 'data', 'profiles'),
        'google_api_key': os.getenv('GOOGLE_API_KEY')
    }
    
    if not config['google_api_key']:
        raise ValueError("GOOGLE_API_KEY must be set in .env file")
    
    # Ensure profiles directory exists
    os.makedirs(config['profiles_dir'], exist_ok=True)
    
    return config 
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import uvicorn
from datetime import datetime

from src.agents.personalized_agent import PersonalizedAIAgent

app = FastAPI(
    title="AI Tutor API",
    description="AI Tutor API using Gemini for personalized learning",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Agent
ai_agent = PersonalizedAIAgent()

# Pydantic models
class UserCreate(BaseModel):
    user_id: str

class ChatMessage(BaseModel):
    user_id: str
    message: str

class PreferenceUpdate(BaseModel):
    key: str
    value: str

class UserProfile(BaseModel):
    user_id: str
    knowledge_state: Dict[str, float]
    learning_style: Dict
    preferences: Dict
    interaction_history: List[Dict]

async def save_profile_after_request(user_id: str):
    """Helper function to save profile after each request"""
    try:
        if user_id in ai_agent.learning_profiles:
            ai_agent.save_profile(user_id)
    except Exception as e:
        print(f"Error saving profile for {user_id}: {str(e)}")

@app.post("/users/login", tags=["Users"])
async def login_user(user_data: UserCreate):
    """Login or create a new user"""
    try:
        if not ai_agent.load_profile(user_data.user_id):
            ai_agent.initialize_user(user_data.user_id)
            await save_profile_after_request(user_data.user_id)
            return {"message": f"Created new profile for user: {user_data.user_id}"}
        return {"message": f"Welcome back, {user_data.user_id}!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/chat", tags=["Chat"])
async def chat(message: ChatMessage):
    """Send a message to the AI Tutor"""
    try:
        if message.user_id not in ai_agent.learning_profiles:
            raise HTTPException(status_code=404, detail="User not found. Please login first.")
        
        response = ai_agent.generate_response(message.user_id, message.message)
        
        # Save profile after chat interaction
        await save_profile_after_request(message.user_id)
        
        return {
            "response": response,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users/{user_id}/profile", tags=["Users"], response_model=UserProfile)
async def get_user_profile(user_id: str):
    """Get user profile information"""
    try:
        profile = ai_agent.learning_profiles.get(user_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User not found")
        
        return UserProfile(
            user_id=profile.user_id,
            knowledge_state=profile.knowledge_state,
            learning_style=profile.learning_style,
            preferences=profile.preferences,
            interaction_history=profile.interaction_history
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/users/{user_id}/preferences", tags=["Users"])
async def update_preference(user_id: str, preference: PreferenceUpdate):
    """Update user learning preferences"""
    try:
        profile = ai_agent.learning_profiles.get(user_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User not found")
        
        profile.preferences[preference.key] = preference.value
        
        # Save profile after preference update
        await save_profile_after_request(user_id)
        
        return {"message": f"Updated preference {preference.key} for user {user_id}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users/{user_id}/knowledge", tags=["Learning"])
async def get_knowledge_state(user_id: str):
    """Get user's knowledge state"""
    try:
        profile = ai_agent.learning_profiles.get(user_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"knowledge_state": profile.knowledge_state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users/{user_id}/history", tags=["Learning"])
async def get_interaction_history(user_id: str, limit: int = 5):
    """Get user's recent interaction history"""
    try:
        profile = ai_agent.learning_profiles.get(user_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"history": profile.interaction_history[-limit:]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add middleware to save profiles after each request
@app.middleware("http")
async def save_profiles_middleware(request, call_next):
    response = await call_next(request)
    
    # Extract user_id from various possible locations
    user_id = None
    
    # From path parameters
    path_params = request.path_params
    if 'user_id' in path_params:
        user_id = path_params['user_id']
    
    # From JSON body for POST requests
    if not user_id and request.method == "POST":
        try:
            body = await request.json()
            user_id = body.get('user_id')
        except:
            pass
    
    # Save profile if we have a user_id
    if user_id:
        await save_profile_after_request(user_id)
    
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 
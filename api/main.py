import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.socratic_tutor_controller import router as socratic_tutor_router
from controllers.personalized_user_controller import router as personalized_user_router


app = FastAPI(
    title="Socratic Tutor API",
    description="An API for the Socratic Tutor that generates follow-up questions and guides students.",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    socratic_tutor_router,
    prefix="/socratic_tutor",
    tags=["Socratic Tutor"]  
)

app.include_router(
    personalized_user_router,
    prefix="/personalized_user",
    tags=["Personalized Behavior"]  
)


@app.get("/")
def root():
    return {"message": "Welcome to the Socratic Tutor API!"}

# Run the app with Uvicorn and reload
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
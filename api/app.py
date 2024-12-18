from fastapi import FastAPI
from controllers.socratic_tutor_controller import router as socratic_tutor_router

app = FastAPI(
    title="Socratic Tutor API",
    description="An API for the Socratic Tutor that generates follow-up questions and guides students.",
    version="1.0.0",
)

# Include the Socratic Tutor router
app.include_router(socratic_tutor_router)

@app.get("/")
def root():
    return {"message": "Welcome to the Socratic Tutor API!"}

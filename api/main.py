from fastapi import FastAPI
from controllers.socratic_tutor_controller import router as socratic_tutor_router
import uvicorn

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

# Run the app with Uvicorn and reload
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
from fastapi import FastAPI
from routers import predictions, insights

app = FastAPI()

app.include_router(predictions.router)
app.include_router(insights.router)


@app.get("/")
async def root():
    return {"message": "Welcome to the LearnAware AI Service"}

from fastapi import APIRouter

router = APIRouter()


@router.get("/learning-insights")
async def learning_insights():
    insights = {
        "model_accuracy": "95%",
        "important_features": ["feature1", "feature3"]
    }
    return insights

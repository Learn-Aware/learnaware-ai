uvicorn main:app --reload
docker build -t learnaware_ai_service .
docker run -d -p 8000:8000 learnaware_ai_service

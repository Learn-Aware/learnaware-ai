#!/bin/bash

# Initialize knowledge base
python src/scripts/init_knowledge_base.py

case "$1" in
    "api")
        echo "Starting FastAPI server..."
        uvicorn src.api.main:app --host 0.0.0.0 --port 4000
        ;;
    "web")
        echo "Starting Streamlit app..."
        streamlit run app.py --server.port 8501 --server.address 0.0.0.0
        ;;
    "cli")
        echo "Starting CLI interface..."
        python ai_agent.py
        ;;
    *)
        echo "Usage: $0 {api|web|cli}"
        exit 1
        ;;
esac 
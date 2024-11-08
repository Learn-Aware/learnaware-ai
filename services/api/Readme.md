python src/scripts/init_knowledge_base.py
streamlit run app.py OR python ai_agent.py
uvicorn src.api.main:app --reload

(AI Tutor) > login user123
Created new profile for user: user123

(AI Tutor) > ask What is Python programming?
AI Response:
[AI will explain Python programming...]

(AI Tutor) > topics
Knowledge State:
python_programming: 0.10

(AI Tutor) > set_preference learning_style visual
Set preference learning_style = visual

(AI Tutor) > preferences
Learning Preferences:
learning_style: visual

(AI Tutor) > quit
Profile saved
Goodbye!

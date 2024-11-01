from services.followup_service import generate_followup_questions

def test_generate_followup_questions():
    question = "How to solve 2x + 3 = 7?"
    response = generate_followup_questions(question)
    
    assert "followup_questions" in response
    assert isinstance(response["followup_questions"], str)

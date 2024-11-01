import json

def extract_and_parse_json(response_text):
    """
    Extract and parse the JSON from the response text.
    
    Args:
        response_text (str): The raw text that contains the JSON.

    Returns:
        dict: Parsed JSON as a Python dictionary.
    """
    # Find the JSON part in the response
    start_index = response_text.find('{')
    end_index = response_text.rfind('}') + 1

    if start_index == -1 or end_index == -1:
        raise ValueError("JSON object not found in the response.")

    json_text = response_text[start_index:end_index]

    # Try to parse the JSON
    try:
        json_object = json.loads(json_text)
        return json_object
    except json.JSONDecodeError as e:
        raise ValueError(f"Error parsing JSON: {e}")

def process_json_output(json_data):
    """
    Process the parsed JSON. This can involve filtering, transforming,
    or enriching the data.

    Args:
        json_data (dict): Parsed JSON dictionary.
    
    Returns:
        dict: Processed JSON data.
    """
    questions_and_answers = json_data.get("questions_and_answers", [])
    
    # Example: Create a new list of questions only
    questions_only = [qa["question"] for qa in questions_and_answers]

    # Example: Create a structured output with only certain fields
    processed_output = {
        "total_questions": len(questions_and_answers),
        "questions": questions_only,
        "original_data": json_data  # Keep the original data for reference
    }
    
    return processed_output
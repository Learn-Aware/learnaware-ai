class socratic_tool:
    socratic_tutor_description = "Act as a socratic totor"

    socratic_tutor_properties = \
    {
        # arg 1: section of memory to edit
        "student_question": {
            "type": "string",
            "description": "Student question which is need to be act as a socratic tutor",            
        }
    }

    tool_metadata = [
        {
            "type": "function",
            "function": {
                "name": "socratic_tutor",
                "description": socratic_tutor_description,
                "parameters": {
                    "type": "object",
                    "properties": socratic_tutor_properties,
                    "required": ["student_question"],
                },
            }
        },
    ]
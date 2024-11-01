import torch
from transformers import pipeline
from config import get_model_and_tokenizer

model, tokenizer = get_model_and_tokenizer()

generation_args = {
    "max_new_tokens": 512,
    "return_full_text": False,
    "do_sample": False,
}

# Text generation pipeline
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
)

def generate_text(messages):
    output = pipe(messages, **generation_args)
    return output[0]['generated_text']

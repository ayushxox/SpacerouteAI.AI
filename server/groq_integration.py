import os
from groq import Groq
import sys
import json

def get_hint(user_input, start_location, end_location):
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

    if not user_input.strip():
        # User input is empty, provide an initial hint
        prompt = f"Give a direction hint from {start_location} to {end_location}. Only provide the next road or turn."
    else:
        # Provide a hint based on the user's current input
        prompt = f"Check User directions so far: {user_input}, and only give the next road direction."

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama3-8b-8192",
        max_tokens=25,
        temperature=0.7
    )

    return chat_completion.choices[0].message.content.strip()

def calculate_score(user_route, actual_route):
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Evaluate the user's route against the actual route and provide a score out of 100 as a single number only, without any additional text. User's route: {user_route}\nActual route: {actual_route}\nScore:"
            }
        ],
        model="llama3-8b-8192",
        max_tokens=10
    )

    return chat_completion.choices[0].message.content.strip()

if __name__ == "__main__":
    input_data = json.load(sys.stdin)

    command = input_data.get("command")

    if command == "get_hint":
        user_input = input_data.get("user_route")
        start_location = input_data.get("start_location")
        end_location = input_data.get("end_location")
        print(get_hint(user_input, start_location, end_location))
    elif command == "calculate_score":
        user_route = input_data.get("user_route")
        actual_route = input_data.get("actual_route")
        print(calculate_score(user_route, actual_route))
    else:
        print(f"Error: Unknown command '{command}'")
        sys.exit(1)

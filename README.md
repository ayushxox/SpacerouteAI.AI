# Spaceroute.AI- Improving Spatial Awareness of humans using Generative AI 

A brief description of what this project does and who it's for


Overview
Spaceroute.AI is an interactive web-based application designed to help users improve their spatial memory and directional skills within the city of Delhi. By simulating real-world navigation scenarios, users can learn and memorize the city's routes, landmarks, and key locations through engaging gameplay.

## Use Case

- The primary use case of this project is to enhance the spatial memory of individuals who either live in or frequently visit Delhi. Spaceroute.AI provides a fun and educational platform for users to familiarize themselves with Delhi's geography, making it particularly useful for:

- New residents or visitors to Delhi who want to get acquainted with the city.

- Individuals preparing for roles that require detailed knowledge of Delhi's routes, such as cab drivers, delivery personnel, or tour guides.

- Anyone interested in improving their cognitive mapping and navigation skills.

## Features

- Randomized Route Generation: Each session provides a unique start and end location within Delhi to challenge the user's memory and navigation skills.

- Interactive Directions Input: Users can input directions to navigate from the start location to the end location.

- Hint System: An AI-powered hint system is available to assist users when they are unsure of the next step in their route.

- Scoring System: The game evaluates the user’s performance based on the accuracy and efficiency of their provided directions, offering a score out of 100.

Spaceroute.AI utilizes a combination of modern web technologies and AI services to deliver an engaging user experience:

## Frontend
HTML/CSS: For structuring and styling the user interface.
JavaScript: Handles user interactions, dynamic content updates, and communication with the backend.

## Backend
Node.js & Express: Powers the server-side logic, including route generation, hint processing, and score calculation.

## AI Integration
Groq API (LLAMA 3 8B Model): For providing hints and scoring based on user input, replacing traditional heuristic methods with AI-driven evaluations.

## Database
PostgreSQL: For storing user data, key-value routes.

## Prerequisites
Node.js and npm are installed on your machine.
Groq API Key: Access to the Groq API for the LLAMA 3 8B model.

## Usage
Login/Register: Users must create an account or log in to access the game.

Start a Game: After logging in, users can start a new game session, where they will be provided with random start and end locations within Delhi.

Input Directions: Users input their directions to navigate from the start to the end location.
Request Hints: If needed, users can request hints powered by the LLAMA 3 8B model.

Submit and Score: Users submit their final route to receive a score based on accuracy and efficiency.

## Future Improvements

Progress Visualization: Implement a status bar showing the percentage of Delhi's routes covered by the user.
Multiplayer Mode: Allow users to compete against each other in real-time.

Expanded Geography: Extend the game to cover other cities beyond Delhi.


# Smart Recipe Finder - API Documentation v1.0

This document outlines the API Endpoints provided by the Backend for the Frontend application.
All data sent and received is formatted as JSON.

Base URL: http://your-domain.com/api (or http://localhost:8000/api during development)

1. Authentication

Laravel Sanctum is used for authentication. The Token must be sent in the Header for protected requests:
Authorization: Bearer <your_token_here>

Register (New User)

Endpoint: /register

Method: POST

Body:

{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}


Response (201 Created):

{
  "message": "User registered successfully",
  "token": "1|laravel_sanctum_token_string...",
  "user": { "id": 1, "name": "Ahmed Ali", "email": "ahmed@example.com" }
}


Login

Endpoint: /login

Method: POST

Body:

{
  "email": "ahmed@example.com",
  "password": "password123"
}


Response (200 OK):

{
  "token": "2|new_token_string...",
  "user": { "id": 1, "name": "Ahmed Ali" }
}


2. Recipes

Get All Recipes (Home Page)

Endpoint: /recipes

Method: GET

Response (200 OK):

{
  "data": [
    {
      "id": 1,
      "title": "Roasted Tomato Soup",
      "image_url": "http://...",
      "time_estimate": "30 min",
      "difficulty_level": "Easy",
      "calories": 280
    }
    // ... more recipes
  ]
}


Search by Ingredients (Core Feature)

Endpoint: /recipes/search

Method: POST (Using POST to easily send an array of tags)

Body:

{
  "tags": ["Tomato", "Garlic", "Cream"]
}


Response (200 OK):

{
  "data": [
    {
      "id": 1,
      "title": "Roasted Tomato Soup",
      "matches": 3, // (Optional) Number of matching ingredients
      "missing_ingredients": 1 // (Optional) Number of missing ingredients
      // ... other recipe summary details
    }
  ]
}


Get Recipe Details

Endpoint: /recipes/{id}

Method: GET

Response (200 OK):

{
  "id": 1,
  "title": "Roasted Tomato Soup",
  "ingredients": [
    { "name": "Tomato", "quantity": "5 pcs" },
    { "name": "Garlic", "quantity": "2 cloves" }
  ],
  "steps": [
    { "step_order": 1, "instruction_text": "Roast the tomatoes." },
    { "step_order": 2, "instruction_text": "Blend with garlic." }
  ]
}


3. User Profile (Protected - Requires Token)

1. Favorites

Add to Favorites:

POST /favorites

Body: { "recipe_id": 1 }

Remove from Favorites:

DELETE /favorites/{recipe_id}

Get User Favorites:

GET /favorites

2. Virtual Pantry

Get Pantry Items:

GET /pantry

Add Item:

POST /pantry

Body: { "item_name": "Rice" } (You can also send ingredient_id if available)

Delete Item:

DELETE /pantry/{id}

3. Shopping List

Get List:

GET /shopping-list

Add Item:

POST /shopping-list

Body: { "item_name": "Milk", "source_recipe_id": 2 } (source_recipe_id is optional)

Toggle Check (Mark as Bought):

PATCH /shopping-list/{id}

Body: { "is_checked": true }

Delete Item:

DELETE /shopping-list/{id}

4. Error Handling

In case of an error, please return a consistent structure:

401 Unauthorized: (When the token has expired or is invalid)

422 Validation Error: (When input data is invalid)

{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}

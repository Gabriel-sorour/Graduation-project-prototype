# Smart Recipe Finder - API Documentation (v1.1)

This document describes all API endpoints used by the Smart Recipe Finder frontend.  
All requests and responses use JSON format.

---

## Base URL

```
http://127.0.0.1:8000/api
```

> Note: Since authentication is not implemented yet, for all protected endpoints (Favorites, Pantry, Chat), please hardcode logic to use `user_id = 1` temporarily.

---

# 1. Authentication

Authentication for protected routes uses Bearer Token:

```
Authorization: Bearer <your_token_here>
```

---

## Register (Create New User)

**Endpoint:** `POST http://127.0.0.1:8000/api/auth/register`

### Request Body
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Response (201 Created)
```json
{
  "message": "User registered successfully",
  "token": "1|laravel_sanctum_token_string...",
  "user": {
    "id": 1,
    "name": "Ahmed Ali",
    "email": "ahmed@example.com"
  }
}
```

---

## Login

**Endpoint:** `POST http://127.0.0.1:8000/api/auth/login`

### Request Body
```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

### Response (200 OK)
```json
{
  "token": "2|new_token_string...",
  "user": {
    "id": 1,
    "name": "Ahmed Ali"
  }
}
```

---

# 2. Recipes & Discovery

## Get All Recipes (Home Page)

**Endpoint:** `GET http://127.0.0.1:8000/api/recipes`

### Response (200 OK)
```json
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
  ]
}
```

---

## Get All Ingredients (For Autocomplete)

**Endpoint:** `GET http://127.0.0.1:8000/api/ingredients`

### Response (200 OK)
```json
{
  "data": ["Tomato", "Egg", "Milk", "Cheese", "Chicken", "Rice"]
}
```

---

## Search by Ingredients (Multi-select)

**Endpoint:** `POST http://127.0.0.1:8000/api/recipes/search`

### Request Body
```json
{
  "ingredients": ["Tomato", "Egg"] 
}
```

### Response (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "title": "Tomato Omelette",
      "matches": 2,
      "missing_ingredients": 0
    }
  ]
}
```

---

## Get Recipe Details

**Endpoint:** `GET http://127.0.0.1:8000/api/recipes/{id}`

### Response (200 OK)
```json
{
  "id": 1,
  "title": "Roasted Tomato Soup",
  "image": "http://...",
  "time": "30 min",
  "calories": "200 kcal",
  "difficulty": "Easy",
  "ingredients": [
    "Tomato", "Garlic", "Cream"
  ],
  "steps": [
    "Roast the tomatoes.",
    "Blend with garlic."
  ]
}
```

---

# 3. AI Chatbot (Sage Bot)

## Send Message

**Endpoint:** `POST http://127.0.0.1:8000/api/chat`

### Request Body
```json
{
  "message": "What can I cook with Egg and Cheese?"
}
```

### Response (200 OK)
```json
{
  "reply": "You can make a delicious Cheese Omelette! Here is the recipe..."
}
```

---

# 4. User Profile (Protected Endpoints)

## Virtual Pantry

### Get Pantry Items
**Endpoint:** `GET http://127.0.0.1:8000/api/user/pantry`

### Add Item
**Endpoint:** `POST http://127.0.0.1:8000/api/user/pantry`
```json
{ "item_name": "Rice" }
```

### Delete Item
**Endpoint:** `DELETE http://127.0.0.1:8000/api/user/pantry/{id}`

---

## Favorites

### Add to Favorites
**Endpoint:** `POST http://127.0.0.1:8000/api/user/favorites`
```json
{ "recipe_id": 1 }
```

### Remove Favorite
**Endpoint:** `DELETE http://127.0.0.1:8000/api/user/favorites/{recipe_id}`

### Get All Favorites
**Endpoint:** `GET http://127.0.0.1:8000/api/user/favorites`

---

## Shopping List

### Get List
**Endpoint:** `GET http://127.0.0.1:8000/api/user/shopping-list`

### Add Item
**Endpoint:** `POST http://127.0.0.1:8000/api/user/shopping-list`
```json
{ "item_name": "Milk" }
```

### Toggle Check (Mark as Bought)
**Endpoint:** `PATCH http://127.0.0.1:8000/api/user/shopping-list/{id}`
```json
{ "is_checked": true }
```

---

# 5. Error Handling

## 401: Unauthorized
Used when token is missing or invalid.

## 422: Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
```

---

# Version

**API v1.1**

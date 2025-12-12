# Smart Recipe Finder - API Documentation (v1.0)

This document describes all API endpoints used by the Smart Recipe Finder frontend.  
All requests and responses use **JSON** format.

---

## 🔗 Base URL
```
http://your-domain.com/api
```
During development:
```
http://localhost:8000/api
```

---

# 1. 🔐 Authentication (Laravel Sanctum)

Authentication for protected routes uses **Bearer Token**:

```
Authorization: Bearer <your_token_here>
```

---

## 📝 Register (Create New User)

**Endpoint:** `/register`  
**Method:** `POST`

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

## 🔑 Login

**Endpoint:** `/login`  
**Method:** `POST`

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

# 2. 🍽 Recipes

## 📌 Get All Recipes (Home Page)

**Endpoint:** `/recipes`  
**Method:** `GET`

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

## 🔍 Search by Ingredients

**Endpoint:** `/recipes/search`  
**Method:** `POST`

### Request Body
```json
{
  "tags": ["Tomato", "Garlic", "Cream"]
}
```

### Response (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "title": "Roasted Tomato Soup",
      "matches": 3,
      "missing_ingredients": 1
    }
  ]
}
```

---

## 📄 Get Recipe Details

**Endpoint:** `/recipes/{id}`  
**Method:** `GET`

### Response (200 OK)
```json
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
```

---

# 3. 👤 User Profile (Protected Endpoints)

---

## ⭐ Favorites

### ➕ Add to Favorites  
**POST** `/favorites`

**Body:**
```json
{ "recipe_id": 1 }
```

### ❌ Remove Favorite  
**DELETE** `/favorites/{recipe_id}`

### 📥 Get All Favorites  
**GET** `/favorites`

---

## 🧺 Virtual Pantry

### 📥 Get Pantry Items  
**GET** `/pantry`

### ➕ Add Item  
**POST** `/pantry`  
**Body:**
```json
{ "item_name": "Rice" }
```

### ❌ Delete Item  
**DELETE** `/pantry/{id}`

---

## 🛒 Shopping List

### 📥 Get List  
**GET** `/shopping-list`

### ➕ Add Item  
**POST** `/shopping-list`  
**Body:**
```json
{
  "item_name": "Milk",
  "source_recipe_id": 2
}
```

### ☑️ Toggle Check (Mark as Bought)  
**PATCH** `/shopping-list/{id}`  
**Body:**
```json
{ "is_checked": true }
```

### ❌ Delete Item  
**DELETE** `/shopping-list/{id}`

---

# 4. ⚠️ Error Handling

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

# 📌 Version  
**API v1.0**

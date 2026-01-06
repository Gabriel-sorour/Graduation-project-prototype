# Chatbot `ask` Endpoint – Final Specifications

> This document defines the **final, complete specifications** for the Chatbot logic and API response. It is designed to cover all frontend scenarios (search, recipes, preparation steps, pantry, and shopping list) and to minimize back-and-forth questions.

---

## 1. Endpoint Overview

* **Route:** `POST /api/chat/ask`
* **Middleware:** `auth:sanctum` *(required for user context awareness)*
* **Request Body:**

```json
{ "message": "User query..." }
```

---

## 2. Bot Persona & General Knowledge

* **Name:** Chef Sage
* **Personality:** Polite, agreeable, and helpful
* **Site Awareness:**

  * Can answer: *"Who are you?"*
  * Can explain the website’s purpose (smart recipe finder based on pantry items)
* **Small Talk:** Handles greetings and basic conversation naturally (Hi, Hello, Thanks, etc.)

---

## 3. Required Data Access (Read‑Only Context)

The chatbot must have **read‑only** access to the following data sources in order to respond accurately.

### A. Recipes Database (Deep Access)

* **Search & Filters**

  * Map natural language to database queries
  * Example: *"Chicken under 30 mins"* → `ingredient = 'chicken' AND time <= 30`

* **Instructions / Steps** *(Required)*

  * Access the `instructions` or `steps` field
  * Used to answer: *"How do I make [Recipe Name]?"*
  * Steps may be summarized or listed textually

* **Pantry Matching**

  * Suggest recipes based on the user’s current pantry items using existing logic

---

### B. Shopping List Awareness

* The bot must distinguish between item states:

  * **Bought:** `is_bought = true`
  * **Pending:** `is_bought = false`

* Example query:

  * *"What do I have left to buy?"* → return **only pending items**

---

### C. Pantry Inventory

* The bot knows exactly which items exist in the user’s pantry table
* Used for availability checks and recipe suggestions

---

## 4. Constraints (Write Restrictions)

* The chatbot is **strictly read‑only**
* It must **never** create, update, or delete data

### Write Attempt Scenario

* **User Input:** *"Add milk to my list"* / *"Delete eggs"*
* **Required Behavior:**

  * Politely refuse
  * Explain that direct modification is not allowed

**Example response:**

> *"I’m sorry, I don’t have permission to edit your list directly, but you can manage it from the Shopping page."*

---

## 5. Response Structure (Strict JSON Schema)

This schema is **mandatory** for frontend rendering (polymorphic UI payload).

```json
{
  "status": "success",
  "data": {
    "reply_text": "Here is the answer to your question...",

    "intent_type": "recipe_suggestion",
    
    // intent_type values:
    // "text_only" → steps, general chat, pantry/shopping answers, refusals
    // "recipe_suggestion" → ONLY when returning recipe cards

    "payload": [
      {
        "id": 105,
        "title": "Creamy Pasta",
        "slug": "creamy-pasta-105",
        "image": "https://domain.com/images/pasta.jpg",
        "description": "Easy dinner...",
        "ready_in_minutes": 20,
        "difficulty": "Easy",
        "missing_ingredients_count": 0,
        "missing_ingredients": []
      }
      // If intent_type == "text_only", payload must be []
    ]
  }
}
```

---

## 6. Key Use Case Examples

### Case 1: Recipe Steps (Text Response)

* **Input:**

  > How do I make the Grilled Chicken?

* **Output:**

  * `intent_type`: `text_only`
  * `reply_text`: Steps fetched from the database

---

### Case 2: Shopping Status

* **Input:**

  > What did I buy?

* **Output:**

  * `intent_type`: `text_only`
  * `reply_text`: *"You have marked Rice and Oil as bought."*

---

### Case 3: Recipe Suggestion (Card Response)

* **Input:**

  > Suggest a quick dinner.

* **Output:**

  * `intent_type`: `recipe_suggestion`
  * `payload`: Array of recipe card objects

---

### Case 4: Write Refusal

* **Input:**

  > Update my pantry.

* **Output:**

  * `intent_type`: `text_only`
  * `reply_text`: Polite refusal explaining read‑only limitation

---

## Summary

* One endpoint: `POST /api/chat/ask`
* Read‑only, context‑aware chatbot
* Strict response schema
* Clear separation between **text responses** and **recipe card UI triggers**

This specification should be treated as the **final reference** for backend and frontend implementation.

# Smart Recipe Finder - Entity Relationship Diagram (ERD)

This document outlines the database schema required to support the features of the Smart Recipe Finder application, including User Management, Recipe Indexing, Pantry tracking, and Shopping Lists.

# Visual Diagram

erDiagram
    %% User Management
    USER {
        int id PK
        string name
        string email
        string password_hash
        timestamp created_at
    }

    %% Recipe Management
    RECIPE {
        int id PK
        string title
        string image_url
        string time_estimate
        string difficulty_level
        int calories
        timestamp created_at
    }

    %% Instructions for Recipes
    RECIPE_STEP {
        int id PK
        int recipe_id FK
        int step_order
        text instruction_text
    }

    %% Ingredients (Normalized for Search)
    INGREDIENT {
        int id PK
        string name "Unique name for search tagging"
    }

    %% Join Table: Recipe <-> Ingredient
    RECIPE_INGREDIENT {
        int recipe_id FK
        int ingredient_id FK
        string quantity "e.g., '2 cups', '1 tbsp'"
    }

    %% User Interactions
    FAVORITE {
        int user_id FK
        int recipe_id FK
        timestamp saved_at
    }

    %% User Inventory
    PANTRY_ITEM {
        int id PK
        int user_id FK
        string item_name "Can be free text or linked to Ingredient"
        date added_date
    }

    %% Shopping List
    SHOPPING_ITEM {
        int id PK
        int user_id FK
        string item_name
        boolean is_checked
        int source_recipe_id FK "Optional: Link back to recipe"
    }

    %% Relationships
    USER ||--o{ FAVORITE : "saves"
    USER ||--o{ PANTRY_ITEM : "stocks"
    USER ||--o{ SHOPPING_ITEM : "lists"
    
    RECIPE ||--o{ FAVORITE : "is_saved_by"
    RECIPE ||--|{ RECIPE_STEP : "has"
    RECIPE ||--|{ RECIPE_INGREDIENT : "requires"
    
    INGREDIENT ||--o{ RECIPE_INGREDIENT : "used_in"
    
    %% Optional Logic: Linking Pantry items to formal Ingredients allows for smarter matching
    INGREDIENT ||--o{ PANTRY_ITEM : "identifies"


# Schema Logic Explanation

1. User & Authentication

USER: Stores the core account information. The MOCK_USER in your code (Sarah Doe) would be a row here.

2. Recipe Data (Static Content)

RECIPE: Holds the metadata (Time, Difficulty, Calories, Image).

RECIPE_STEP: Stores the cooking instructions. We separate this into a 1-to-Many relationship so steps can be ordered and displayed individually.

INGREDIENT & RECIPE_INGREDIENT:

This is the most critical part for your "Search by Ingredient" feature.

By storing INGREDIENT as a separate table (e.g., ID: 1, Name: "Tomato"), we can efficiently query "Find all recipes joined to Ingredient #1".

RECIPE_INGREDIENT connects the two.

3. User Data (Dynamic Content)

FAVORITE: A Many-to-Many join table between USER and RECIPE. This replaces the simple array favorites: [2] in your mock data.

PANTRY_ITEM: Represents the user's virtual pantry. It links to USER.

Note: Ideally, item_name should link to the INGREDIENT table to enable the "What can I cook with my pantry?" feature automatically.

SHOPPING_ITEM: Represents the shopping list. It has an is_checked boolean state.
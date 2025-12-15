## Sprint 1: Core Architecture & Recipe Display (Completed)

**Goal:** Establish the project foundation and allow users to view recipes.

- **Frontend**
  - Initialize Project
  - Global Layout
  - Home Page
  - Recipe Detail Page

- **Backend**
  - Recipe Schema
  - GET /recipes
  - GET /recipes/:id

---

## Sprint 2: User Tools UI & Search (Completed)

**Goal:** Create the visual workspace and enable ingredient-based search (UI Focus).

- **Frontend**
  - Explore Page (UI)
  - Dashboard Layout  
    - Pantry UI  
    - Shopping List UI  
    - Favorites UI
  - Chatbot Widget (UI + Basic API)

- **Backend**
  - Ingredients API
  - Search Logic
  - Chat API Endpoint

---

## Sprint 3: Interactive Dashboard (Functional Logic)

**Goal:** Make the Dashboard fully functional (Shopping List, Pantry & Favorites) using a **Dummy User (ID=1)**.

### Frontend
- **Shopping List Integration:** - Connect API to Add/Remove items
  - Implement Toggle Status (Check/Uncheck items)
- **Favorites Logic:** Implement "Heart" toggle functionality on Recipe Cards to save/remove favorites
- **Pantry Logic:** Finalize the Add/Remove ingredients connection with the backend
- **UI Feedback:** Implement Toast Notifications (e.g., "Added to Shopping List")

### Backend
- **Shopping List Endpoints:** - `GET /shopping-list`
  - `POST /shopping-list`
  - `DELETE /shopping-list/:id`
  - `PATCH /shopping-list/:id` (For toggling is_checked status)
- **Favorites Endpoints:** Create `POST` & `DELETE` `/favorites` (Using hardcoded User ID)
- **Pantry Endpoints:** Finalize `GET`, `POST`, `DELETE` `/pantry` logic

---

## Sprint 4: Authentication & Security

**Goal:** Secure the application, replace Dummy User with real users, and manage sessions.

### Frontend
- **Auth Pages:** Build Login Page and Register Page forms
- **Auth Context:** Implement Global State to store Token & User Info
- **Protected Routes:** Redirect unauthenticated users from Dashboard
- **Refactor:** Switch API calls from "Dummy User" to use the dynamic Auth Token

### Backend
- **Auth Endpoints:** Create `/auth/register` and `/auth/login`
- **Middleware:** Implement Sanctum/JWT Middleware to protect Dashboard endpoints
- **User Association:** Update Controllers to use `Auth::id()` instead of hardcoded ID

---

## Sprint 5: Enhancements & Polish

**Goal:** Add advanced discovery features and static information.

### Frontend
- **Advanced Filtering:** Add Filter UI on Explore page (Categories, Time, Difficulty)
- **Trending Section:** Implement horizontal scroll on Home Page
- **Footer:** Add static pages (About Us, Contact)

### Backend
- **Query Params:** Update GET /recipes to support filters (e.g., `?category=dinner`)
- **Trending Logic:** Create GET /recipes/trending endpoint

---

## + Admin Dashboard

---

## Future Roadmap (Post-MVP)

- **Smart Chat:** Chatbot message contains a renderable Recipe Card
- **Dietary Filters:** Toggles for Vegan, Gluten-Free, Keto
- **Pantry Auto-Match:** Highlight recipes where user has 100% ingredients
- **Community Reviews:** Rate and comment on recipes
- **Meal Planner:** Drag-and-drop calendar view
- **Counters:** Display numbers of ingredients in Pantry/Recipe details

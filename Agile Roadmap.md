# 🧠 Smart Recipe Finder – Project Roadmap

This document outlines the development roadmap of the Smart Recipe Finder application, organized into clear sprints with defined goals and deliverables.

---

## Sprint 1: Core Architecture & Recipe Display (Completed) ✅

**Goal:** Establish the project foundation and allow users to view recipes.

### Frontend
- Initialize Project
- Global Layout
- Home Page
- Recipe Detail Page

### Backend
- Recipe Schema
- `GET /recipes`
- `GET /recipes/:id`

---

## Sprint 2: User Tools UI & Search (Completed) ✅

**Goal:** Create the visual workspace and enable ingredient-based search (UI Focus).

### Frontend
- Explore Page (UI)
- Dashboard Layout  
  - Pantry UI  
  - Shopping List UI  
  - Favorites UI
- Chatbot Widget (UI)

### Backend
- Ingredients API
- Search Logic
- Chat API Endpoint

---

## Sprint 3: Interactive Dashboard (Completed) ✅

**Goal:** Make the Dashboard fully functional using a Dummy User.

### Frontend
- Shopping List Integration (Add / Remove / Toggle)
- Favorites Logic
- Pantry Logic
- Toast Notifications

### Backend
- Shopping List Endpoints
- Favorites Endpoints
- Pantry Endpoints

---

## Sprint 4: Authentication & Security (Completed) ✅

**Goal:** Secure the application, replace Dummy User with real users, and manage sessions.

### Frontend
- Login / Register Pages
- Auth Context
- Protected Routes
- Token Integration

### Backend
- Auth Endpoints (Register / Login)
- Sanctum Middleware
- User Association (`Auth::id()`)

---

## Sprint 5: The Smart Chef (Logic & Integration) 🚀  
**Current Focus**

**Goal:** Transform the app into a smart assistant connecting Pantry, Shopping, and Recipes.

### Frontend
- Explore Page: Smart Filter UI  
  - Conditional Flow: Food / Drink → Meal Type / Temperature  
  - Sidebar / Modal UI
- Cook With What I Have  
  - Display recipes matched with Pantry  
  - Green / Orange availability indicators
- Recipe Detail Integration  
  - Show **Available ✅** or **Add to Shopping ➕**
- Smart Shopping Cycle  
  - "Finish Shopping" Modal  
  - Migrate checked items to Pantry
- Surprise Me  
  - Redirect to a random available recipe

### Backend
- Database Upgrade  
  - `category` (enum)  
  - `meal_type`  
  - `temperature`
- Unified Search  
  - Refactor Search Controller  
  - Support query + advanced filters
- Matching Engine  
  - `POST /recipes/match-pantry`
- Shopping Migration  
  - `POST /api/shopping/migrate`

---

## Sprint 6: Content Engine (Admin & Data Structure) 🛠️

**Goal:** Build the Admin Dashboard and prepare the database for bilingual content.

### Frontend (Admin)
- Admin Layout
- Recipe CRUD (Add / Edit / Delete)
- Dual Input Fields  
  - English & Arabic titles / descriptions

### Backend
- Admin Authentication & Role Middleware
- Localization Preparation  
  - `title_en`, `title_ar`, `description_en`, `description_ar`
- Admin-only CRUD Endpoints

---

## Sprint 7: The AI Chef (Chatbot) 🤖

**Goal:** Implement the intelligent Chatbot using the logic from Sprint 5 and data from Sprint 6.

### Frontend
- Enhanced Chat Experience
- Render Recipe Cards inside Chat
- Context Awareness  
  - Send Pantry / Diet data with messages

### Backend
- RAG Pipeline  
  - Connect to LLM (OpenAI / Cohere)
- Context Injection  
  - User Pantry  
  - Available Recipes

---

## Sprint 8: Localization (User Interface) 🌍

**Goal:** Enable Arabic language support for end users.

### Frontend
- Language Switcher (EN / AR)
- RTL Support (CSS / Tailwind)
- Translation JSON files for static text

### Backend
- API Localization  
  - Return `title_ar` or `title_en` based on request headers

---

## To Be Reviewed Later (Old Sprint 5) 📦

**Goal:** Polish and minor enhancements (Lower Priority).

- Trending Section (Horizontal Scroll)
- Static Pages  
  - About Us  
  - Contact  
  - Footer
- Community Reviews  
  - Recipe Ratings  
  - Comments

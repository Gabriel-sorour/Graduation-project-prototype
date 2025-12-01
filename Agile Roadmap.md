# Sprint 1: Core Architecture & Recipe Display

    Goal: Establish the project foundation and allow users to view recipes.

    Frontend:

        Initialize React project & CSS folder structure.

        Create Global Layout (Header/Navbar).

        Build Home Page (Hero section + Basic Recipe Grid).

        Build Recipe Detail Page (Ingredients, steps, image).

    Backend:

        Define JSON data structure for Recipe.

        Create GET /recipes (List all recipes).

        Create GET /recipes/:id (Get single recipe details).

# Sprint 2: User Tools (Dashboard & Chat)

    Goal: Create the personal workspace for the user (Pantry, Lists, Bot).

    Frontend:

        Build Dashboard UI with tabs (Pantry, Shopping List, Favorites).

        Implement "Add/Remove" logic for Pantry items (local state for now).

        Build Chatbot UI (Message bubble, input field, auto-scroll).

    Backend:

        Define JSON data structure for User.

        Create GET /user/pantry & POST /user/pantry (Manage items).

        Create POST /chat (Endpoint to receive message and return bot response).

# Sprint 3: Authentication (Login & Register)

    Goal: Secure the application and manage user sessions.

    Frontend:

        Build Login Page and Register Page forms.

        Create Authentication Context (to save the logged-in user state globally).

        Implement Protected Routes (redirect users from Dashboard if not logged in).

    Backend:

        Create POST /auth/register (Create new user).

        Create POST /auth/login (Verify credentials & return token).

        Implement Middleware to protect Dashboard endpoints.

# Sprint 4: Enhancements & Polish

    Goal: Add advanced discovery features and static information.

    Frontend:

        Add Filter UI on Explore page (Categories, Time, Difficulty).

        Add Trending Section on Home Page (Horizontal scroll).

        Add Footer (About Us, Contact).

    Backend:

        Update GET /recipes to accept query parameters (e.g., ?category=dinner&time=30).

        Create GET /recipes/trending (Logic to return top 5 recipes).

# + Admin dashboard

# Future Roadmap (Post-MVP)
Dietary Filters: Add toggles for Vegan, Gluten-Free, and Keto.

Pantry Auto-Match: Automatically highlight recipes where the user has 100% of the ingredients in their Virtual Pantry.

Community Reviews: Allow users to rate recipes and leave comments.

Meal Planner: A calendar view to drag-and-drop recipes for the week.
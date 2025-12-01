# Smart Recipe Finder 🍳

A minimalist, ingredient-first recipe application designed to help users cook with what they already have at home.

# ✨ Key Features

Smart Ingredient Search: Type ingredients (e.g., "Tomato", "Egg") to filter recipes instantly.

User Dashboard: Manage your Virtual Pantry, Shopping List, and Favorites.

AI Chef Bot: A conversational assistant for recipe suggestions and cooking tips.

Minimalist UI: Distraction-free design using a calming Sage Green palette.

# 🛠️ Tech Stack

Frontend: React (Vite), Tailwind CSS, Lucide React.

Backend: Laravel (API), MySQL.

Authentication: Laravel Sanctum.

# 🚀 Getting Started

Prerequisites

Node.js & npm

PHP & Composer

MySQL

1. Backend Setup (Laravel)

cd backend

composer install

cp .env.example .env

* Configure your database settings in .env
php artisan key:generate
php artisan migrate
php artisan serve


2. Frontend Setup (React)

cd frontend

npm install

* Ensure the API URL in your config matches the Laravel server
npm run dev


📄 License

This project is open-source and available under the MIT License.
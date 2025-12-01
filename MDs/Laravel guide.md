Laravel Backend Implementation Guide

Based on the provided ERD, here is how you would structure your Laravel application.

1. Database Migrations

Run these commands to generate migration files:

php artisan make:model Recipe -m
php artisan make:model Ingredient -m
php artisan make:model RecipeStep -m
php artisan make:model PantryItem -m
php artisan make:model ShoppingItem -m
# For pivot tables
php artisan make:migration create_recipe_ingredient_table
php artisan make:migration create_favorites_table


Schema Definitions

Users (Default Laravel Migration)

No changes needed usually, just ensure name, email, password exist.

Recipes Table

Schema::create('recipes', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('image_url')->nullable();
    $table->string('time_estimate')->nullable(); // e.g. "30 min"
    $table->string('difficulty_level')->default('Easy'); // Easy, Medium, Hard
    $table->integer('calories')->nullable();
    $table->timestamps();
});


Ingredients Table

Schema::create('ingredients', function (Blueprint $table) {
    $table->id();
    $table->string('name')->unique(); // Unique for searching
    $table->timestamps();
});


Recipe Steps Table

Schema::create('recipe_steps', function (Blueprint $table) {
    $table->id();
    $table->foreignId('recipe_id')->constrained()->onDelete('cascade');
    $table->integer('step_order');
    $table->text('instruction_text');
    $table->timestamps();
});


Recipe Ingredient (Pivot Table)

Schema::create('recipe_ingredient', function (Blueprint $table) {
    $table->id();
    $table->foreignId('recipe_id')->constrained()->onDelete('cascade');
    $table->foreignId('ingredient_id')->constrained()->onDelete('cascade');
    $table->string('quantity'); // e.g. "200g", "1 cup"
    $table->timestamps();
});


Favorites (Pivot Table)

Schema::create('favorites', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('recipe_id')->constrained()->onDelete('cascade');
    $table->timestamp('saved_at')->useCurrent();
});


Pantry Items Table

Schema::create('pantry_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('item_name'); 
    // Optional: link to ingredient_id if you want strict mapping
    $table->foreignId('ingredient_id')->nullable()->constrained()->nullOnDelete();
    $table->date('added_date')->useCurrent();
    $table->timestamps();
});


Shopping Items Table

Schema::create('shopping_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('item_name');
    $table->boolean('is_checked')->default(false);
    // Optional: link back to source recipe
    $table->foreignId('source_recipe_id')->nullable()->constrained('recipes')->nullOnDelete();
    $table->timestamps();
});


2. Eloquent Models & Relationships

User Model (app/Models/User.php)

class User extends Authenticatable
{
    // ...
    
    // Relationship: User has many favorite recipes
    public function favorites()
    {
        return $this->belongsToMany(Recipe::class, 'favorites')
                    ->withPivot('saved_at');
    }

    // Relationship: User has a pantry
    public function pantryItems()
    {
        return $this->hasMany(PantryItem::class);
    }

    // Relationship: User has a shopping list
    public function shoppingItems()
    {
        return $this->hasMany(ShoppingItem::class);
    }
}


Recipe Model (app/Models/Recipe.php)

class Recipe extends Model
{
    protected $fillable = ['title', 'image_url', 'time_estimate', 'difficulty_level', 'calories'];

    // Relationship: Recipe has many ingredients
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredient')
                    ->withPivot('quantity');
    }

    // Relationship: Recipe has many steps
    public function steps()
    {
        return $this->hasMany(RecipeStep::class)->orderBy('step_order');
    }

    // Relationship: Recipe is favorited by users
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }
}


Ingredient Model (app/Models/Ingredient.php)

class Ingredient extends Model
{
    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredient');
    }
}


3. Key Controller Logic (Examples)

Searching by Ingredients (The Core Feature)

This is how you would implement the search logic in a Laravel Controller:

// RecipeController.php

public function search(Request $request)
{
    $tags = $request->input('tags'); // Array of ingredient names e.g. ['Tomato', 'Egg']

    if (empty($tags)) {
        return Recipe::with(['ingredients', 'steps'])->get();
    }

    // Find recipes that contain ALL the requested tags
    $recipes = Recipe::whereHas('ingredients', function ($query) use ($tags) {
        $query->whereIn('name', $tags);
    }, '=', count($tags))->with(['ingredients', 'steps'])->get();

    // OR: Find recipes that contain ANY of the tags (broader search)
    // $recipes = Recipe::whereHas('ingredients', function ($query) use ($tags) {
    //    $query->whereIn('name', $tags);
    // })->with(['ingredients', 'steps'])->get();

    return response()->json($recipes);
}

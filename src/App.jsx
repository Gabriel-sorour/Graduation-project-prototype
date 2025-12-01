import React, { useState, useEffect, useRef } from 'react';
import { Search, ChefHat, Clock, Flame, Heart, ShoppingBag, X, User, ChevronRight, Menu, Home, LogOut, LayoutDashboard, Plus, MessageCircle, Send, Bot } from 'lucide-react';

// --- Mock Data ---
const RECIPES = [
  {
    id: 1,
    title: "Roasted Tomato Basil Soup",
    ingredients: ["Tomato", "Basil", "Garlic", "Cream", "Onion"],
    time: "30 min",
    difficulty: "Easy",
    calories: "280 kcal",
    image: "/api/placeholder/400/300",
    steps: ["Roast tomatoes and garlic.", "Sauté onions.", "Blend everything.", "Simmer with cream."]
  },
  {
    id: 2,
    title: "Avocado & Egg Toast",
    ingredients: ["Egg", "Avocado", "Bread", "Lemon", "Chili Flakes"],
    time: "10 min",
    difficulty: "Easy",
    calories: "320 kcal",
    image: "/api/placeholder/400/300",
    steps: ["Toast the bread.", "Mash avocado with lemon.", "Fry the egg.", "Assemble."]
  },
  {
    id: 3,
    title: "Creamy Mushroom Pasta",
    ingredients: ["Pasta", "Mushroom", "Garlic", "Cream", "Cheese", "Parsley"],
    time: "25 min",
    difficulty: "Medium",
    calories: "540 kcal",
    image: "/api/placeholder/400/300",
    steps: ["Boil pasta.", "Sauté mushrooms and garlic.", "Add cream and cheese.", "Toss pasta in sauce."]
  },
  {
    id: 4,
    title: "Grilled Chicken Salad",
    ingredients: ["Chicken", "Lettuce", "Tomato", "Cucumber", "Olive Oil"],
    time: "20 min",
    difficulty: "Medium",
    calories: "350 kcal",
    image: "/api/placeholder/400/300",
    steps: ["Grill chicken breast.", "Chop vegetables.", "Mix dressing.", "Combine all."]
  },
];

const MOCK_USER = {
  name: "Sarah Doe",
  pantry: ["Salt", "Pepper", "Olive Oil", "Rice"],
  shoppingList: ["Milk", "Eggs"],
  favorites: [2]
};

// --- Components ---

const Navbar = ({ setView, isLoggedIn, setIsLoggedIn, setShowLoginModal, currentView }) => (
  <nav className="w-full py-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onClick={() => setView('home')}
    >
      <div className="bg-emerald-100 p-2 rounded-full">
        <ChefHat className="text-emerald-700 w-6 h-6" />
      </div>
      <span className="font-semibold text-lg tracking-wide text-gray-800">Sage<span className="text-emerald-600">Kitchen</span></span>
    </div>

    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
      <button onClick={() => setView('home')} className={`hover:text-emerald-600 transition ${currentView === 'home' ? 'text-emerald-600' : ''}`}>Home</button>
      <button onClick={() => setView('explore')} className={`hover:text-emerald-600 transition ${currentView === 'explore' ? 'text-emerald-600' : ''}`}>Explore Recipes</button>
      <button onClick={() => setView('chat')} className={`hover:text-emerald-600 transition flex items-center gap-1 ${currentView === 'chat' ? 'text-emerald-600' : ''}`}>
         Chef Bot <Bot size={16} />
      </button>
      <button onClick={() => setView('dashboard')} className={`hover:text-emerald-600 transition ${currentView === 'dashboard' ? 'text-emerald-600' : ''}`}>Dashboard</button>
    </div>

    <div className="flex gap-4">
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <button onClick={() => setView('dashboard')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition">
            <User size={20} />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowLoginModal(true)}
          className="px-5 py-2 text-sm font-medium text-emerald-700 border border-emerald-200 rounded-full hover:bg-emerald-50 transition"
        >
          Sign In
        </button>
      )}
    </div>
  </nav>
);

const Hero = ({ setView }) => {
  const handleRandomizer = () => {
    const randomId = RECIPES[Math.floor(Math.random() * RECIPES.length)].id;
    setView(`recipe-${randomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-slate-50 min-h-[80vh]">
      <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
        Cook with what <br/> you <span className="text-emerald-600 font-medium">have.</span>
      </h1>
      <p className="text-gray-500 max-w-lg mb-10 text-lg font-light">
        Minimalist recipe finder based on your pantry. No clutter, just good food.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={() => setView('explore')}
          className="px-8 py-4 bg-emerald-600 text-white rounded-full font-medium shadow-lg hover:bg-emerald-700 hover:shadow-emerald-200/50 transition transform active:scale-95 flex items-center gap-2"
        >
          Explore Recipes <ChevronRight size={18} />
        </button>
        <button 
          onClick={handleRandomizer}
          className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-medium shadow-sm hover:border-emerald-300 hover:text-emerald-700 transition flex items-center gap-2"
        >
          What should I cook today?
        </button>
      </div>
    </div>
  );
};

const Explore = ({ setView }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(RECIPES);

  // Filter logic
  useEffect(() => {
    if (tags.length === 0) {
      setFilteredRecipes(RECIPES);
      return;
    }
    const results = RECIPES.filter(recipe => 
      tags.every(tag => 
        recipe.ingredients.some(ing => ing.toLowerCase().includes(tag.toLowerCase()))
      )
    );
    setFilteredRecipes(results);
  }, [tags]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTag = (tag) => {
     if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
  }

  // Suggestion mock logic
  const suggestions = ["Tomato", "Egg", "Chicken", "Pasta", "Garlic"].filter(
    s => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s) && inputValue !== ""
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto mb-16">
        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Search by Ingredients</label>
        
        {/* Core Feature: Input with Chips */}
        <div className="relative group">
          <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition min-h-[60px]">
            <Search className="text-gray-300 ml-2" size={20} />
            
            {tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full animate-in fade-in zoom-in duration-200">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-emerald-900"><X size={14} /></button>
              </span>
            ))}
            
            <input 
              type="text" 
              className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 min-w-[120px]"
              placeholder={tags.length === 0 ? "Type ingredients (e.g. Tomato)..." : "Add another..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          {/* Dropdown Suggestions */}
          {suggestions.length > 0 && (
             <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
               {suggestions.map(s => (
                 <div 
                  key={s} 
                  className="px-4 py-3 hover:bg-emerald-50 cursor-pointer text-gray-600 flex items-center justify-between"
                  onClick={() => { addTag(s); setInputValue(""); }}
                 >
                   {s}
                   <Plus size={14} className="text-emerald-400"/>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map(recipe => (
          <div 
            key={recipe.id} 
            onClick={() => setView(`recipe-${recipe.id}`)}
            className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-emerald-100"
          >
            <div className="relative h-48 w-full bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold text-gray-600 flex items-center gap-1">
                <Clock size={12} /> {recipe.time}
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">{recipe.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.ingredients.slice(0, 3).map(i => (
                <span key={i} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{i}</span>
              ))}
              {recipe.ingredients.length > 3 && <span className="text-xs text-gray-400 px-2 py-1">+{recipe.ingredients.length - 3} more</span>}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-50">
               <span className="flex items-center gap-1"><Flame size={14} /> {recipe.calories}</span>
               <span className={`px-2 py-0.5 rounded-full text-xs ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{recipe.difficulty}</span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p>No recipes found with these ingredients. Try removing some tags.</p>
        </div>
      )}
    </div>
  );
};

const ChatAssistant = ({ setView }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Chef Bot 🤖. Tell me what ingredients you have, or ask me for a recipe recommendation!", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    // Check for ingredients matching our recipes
    const foundIngredients = [];
    RECIPES.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        if (lowerText.includes(ing.toLowerCase())) {
          foundIngredients.push({ ing, recipe });
        }
      });
    });

    if (foundIngredients.length > 0) {
      const match = foundIngredients[0];
      return {
        text: `I see you have ${match.ing}! That would be perfect for "${match.recipe.title}". Would you like to see the recipe?`,
        recipeId: match.recipe.id
      };
    }

    if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return { text: "Hi there! Ready to cook something delicious?" };
    }
    
    if (lowerText.includes('hungry') || lowerText.includes('recommend')) {
      const randomRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
      return { 
        text: `How about making "${randomRecipe.title}"? It takes about ${randomRecipe.time}.`,
        recipeId: randomRecipe.id
      };
    }

    if (lowerText.includes('thank')) {
      return { text: "You're welcome! Happy cooking! 🍳" };
    }

    return { text: "I'm not sure about that, but I can help you find recipes based on ingredients like Chicken, Tomato, or Eggs!" };
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response.text, sender: 'bot', recipeId: response.recipeId }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 bg-emerald-50/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Chef Bot</h3>
            <p className="text-xs text-gray-500">Always here to help</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
                {msg.recipeId && (
                  <button 
                    onClick={() => setView(`recipe-${msg.recipeId}`)}
                    className="mt-3 w-full py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100 transition flex items-center justify-center gap-1"
                  >
                    View Recipe <ChevronRight size={12}/>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex gap-1">
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me for a recipe..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
            />
            <button 
              type="submit" 
              className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <Send size={18} className={input.trim() ? "ml-1" : ""} />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

const RecipeDetail = ({ id, goBack, isLoggedIn, promptLogin }) => {
  const recipe = RECIPES.find(r => r.id === parseInt(id));

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <button onClick={goBack} className="text-sm text-gray-500 hover:text-emerald-600 mb-6 flex items-center gap-1">
        ← Back to search
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image & Meta */}
        <div className="md:w-1/2">
           <div className="rounded-3xl overflow-hidden shadow-md mb-6 bg-gray-100">
             <img src={recipe.image} alt={recipe.title} className="w-full object-cover aspect-square" />
           </div>
           
           <div className="flex gap-4">
             <button 
                onClick={isLoggedIn ? () => alert("Added to Favorites!") : promptLogin}
                className="flex-1 py-3 border-2 border-emerald-100 text-emerald-700 rounded-xl font-medium hover:bg-emerald-50 transition flex items-center justify-center gap-2"
             >
               <Heart size={20} /> Favorite
             </button>
             <button 
                onClick={isLoggedIn ? () => alert("Added to Shopping List!") : promptLogin}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-200/50 transition flex items-center justify-center gap-2"
             >
               <ShoppingBag size={20} /> Shop Items
             </button>
           </div>
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-light text-gray-900 mb-2">{recipe.title}</h1>
          <div className="flex gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1"><Clock size={16}/> {recipe.time}</span>
            <span className="flex items-center gap-1"><Flame size={16}/> {recipe.calories}</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">{recipe.difficulty}</span>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ingredients</h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center hover:border-emerald-500 cursor-pointer">
                    <div className="w-3 h-3 rounded-sm bg-transparent hover:bg-emerald-500"></div>
                  </div>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Instructions</h3>
            <div className="space-y-6 border-l-2 border-emerald-100 ml-3 pl-6">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ isLoggedIn, promptLogin, setView }) => {
  const [activeTab, setActiveTab] = useState('pantry');

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="bg-emerald-50 p-6 rounded-full mb-6">
           <User size={48} className="text-emerald-300" />
        </div>
        <h2 className="text-2xl font-light text-gray-900 mb-2">Member Access Only</h2>
        <p className="text-gray-500 mb-8">Log in to view your pantry and shopping lists.</p>
        <button onClick={promptLogin} className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition">
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center text-emerald-800 font-bold text-2xl">
          SD
        </div>
        <div>
           <h1 className="text-2xl font-medium text-gray-900">Hello, {MOCK_USER.name}</h1>
           <p className="text-gray-500 text-sm">Manage your kitchen efficiently.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="md:w-64 bg-slate-50 border-r border-gray-100 p-6 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('pantry')}
            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition flex items-center gap-3 ${activeTab === 'pantry' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <LayoutDashboard size={18}/> Virtual Pantry
          </button>
          <button 
            onClick={() => setActiveTab('shopping')}
            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition flex items-center gap-3 ${activeTab === 'shopping' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <ShoppingBag size={18}/> Shopping List
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition flex items-center gap-3 ${activeTab === 'favorites' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Heart size={18}/> Favorites
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
           {activeTab === 'pantry' && (
             <div>
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-medium text-gray-800">My Pantry</h2>
                 <button className="text-sm text-emerald-600 font-medium">+ Add Item</button>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {MOCK_USER.pantry.map(item => (
                   <div key={item} className="p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:border-emerald-200 transition bg-gray-50/50">
                     <span className="text-gray-700">{item}</span>
                     <button className="text-gray-300 hover:text-red-400"><X size={16}/></button>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'shopping' && (
             <div>
               <h2 className="text-xl font-medium text-gray-800 mb-6">Shopping List</h2>
               <div className="space-y-3">
                 {MOCK_USER.shoppingList.map(item => (
                   <div key={item} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group">
                     <div className="w-5 h-5 rounded border border-gray-300 group-hover:border-emerald-500 cursor-pointer"></div>
                     <span className="text-gray-700 flex-1">{item}</span>
                     <span className="text-xs text-gray-400">From recipe</span>
                   </div>
                 ))}
               </div>
             </div>
           )}
           
           {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-6">My Favorites</h2>
                <div className="grid grid-cols-1 gap-4">
                  {MOCK_USER.favorites.map(favId => {
                    const recipe = RECIPES.find(r => r.id === favId);
                    if (!recipe) return null;
                    return (
                      <div key={recipe.id} onClick={() => setView && setView(`recipe-${recipe.id}`)} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 transition bg-white cursor-pointer group">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                        </div>
                        <div className="flex-1 py-1">
                          <h3 className="font-medium text-gray-900 mb-1">{recipe.title}</h3>
                          <div className="text-xs text-gray-500 flex gap-3">
                             <span className="flex items-center gap-1"><Clock size={12}/> {recipe.time}</span>
                             <span className="flex items-center gap-1"><Flame size={12}/> {recipe.calories}</span>
                          </div>
                        </div>
                        <button className="text-emerald-500 hover:text-emerald-700 self-center p-2"><Heart size={20} fill="currentColor" /></button>
                      </div>
                    );
                  })}
                  {MOCK_USER.favorites.length === 0 && (
                     <div className="text-center py-10 text-gray-400">
                         <p>No favorites yet.</p>
                     </div>
                  )}
                </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl scale-100 transform transition">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light">Welcome back</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        <p className="text-gray-500 mb-6 text-sm">Sign in to save recipes and manage your pantry.</p>
        
        <div className="space-y-4">
           <input type="email" placeholder="Email address" className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20" />
           <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20" />
           <button 
             onClick={onLogin}
             className="w-full py-4 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200/50 transition"
           >
             Sign In
           </button>
        </div>
        <p className="mt-6 text-center text-xs text-gray-400">This is a prototype. Click Sign In to simulate login.</p>
      </div>
    </div>
  );
}

const App = () => {
  const [view, setView] = useState('home'); // home, explore, recipe-ID, dashboard, chat
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Simple router logic
  const renderView = () => {
    if (view === 'home') return <Hero setView={setView} />;
    if (view === 'explore') return <Explore setView={setView} />;
    if (view === 'dashboard') return <Dashboard isLoggedIn={isLoggedIn} promptLogin={() => setShowLoginModal(true)} setView={setView} />;
    if (view === 'chat') return <ChatAssistant setView={setView} />;
    if (view.startsWith('recipe-')) {
      const id = view.split('-')[1];
      return <RecipeDetail id={id} goBack={() => setView('explore')} isLoggedIn={isLoggedIn} promptLogin={() => setShowLoginModal(true)} />;
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900 pb-20 md:pb-0">
      <Navbar 
        setView={setView} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        setShowLoginModal={setShowLoginModal}
        currentView={view.split('-')[0]} 
      />
      
      <main className="animate-in fade-in duration-300">
        {renderView()}
      </main>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleLogin}
      />

      {/* Floating Chat Button (Mobile/Global) */}
      {view !== 'chat' && (
        <button 
          onClick={() => setView('chat')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-xl hover:bg-emerald-700 transition flex items-center justify-center z-40 md:hidden"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Clock, Users, Flame, Plus, Check } from 'lucide-react';
import { Button } from './ui/neon-button';

interface RecipeDetailProps {
  recipeId: number | null;
  onBack: () => void;
  onNavigate: (screen: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat') => void;
}

const recipeData = {
  1: {
    title: 'Creamy Carbonara',
    image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGRpc2h8ZW58MXx8fHwxNzY0NjU0OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '25 min',
    servings: 4,
    calories: 540,
    description: 'A classic Italian pasta dish with a silky egg-based sauce, crispy pancetta, and pecorino cheese.',
    ingredients: [
      { item: 'Spaghetti', amount: '400g' },
      { item: 'Pancetta', amount: '200g, diced' },
      { item: 'Eggs', amount: '4 large' },
      { item: 'Pecorino Romano', amount: '100g, grated' },
      { item: 'Black pepper', amount: '2 tsp, freshly ground' },
      { item: 'Salt', amount: 'to taste' },
    ],
    steps: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
      'While pasta cooks, fry pancetta in a large pan over medium heat until crispy, about 8 minutes.',
      'In a bowl, whisk together eggs, pecorino cheese, and black pepper.',
      'Reserve 1 cup pasta water, then drain pasta.',
      'Add hot pasta to the pan with pancetta, remove from heat.',
      'Pour egg mixture over pasta and toss quickly, adding pasta water as needed to create a creamy sauce.',
      'Serve immediately with extra pecorino and black pepper.',
    ],
  },
  2: {
    title: 'Street-Style Tacos',
    image: 'https://images.unsplash.com/photo-1707603571504-86c1ea50903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc2NDYxMjIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    time: '20 min',
    servings: 6,
    calories: 380,
    description: 'Authentic Mexican street tacos with seasoned beef, fresh cilantro, and lime.',
    ingredients: [
      { item: 'Flank steak', amount: '500g' },
      { item: 'Corn tortillas', amount: '12 small' },
      { item: 'White onion', amount: '1, finely diced' },
      { item: 'Cilantro', amount: '1 bunch, chopped' },
      { item: 'Lime', amount: '3, cut into wedges' },
      { item: 'Chili powder', amount: '2 tsp' },
      { item: 'Cumin', amount: '1 tsp' },
      { item: 'Salt and pepper', amount: 'to taste' },
    ],
    steps: [
      'Season steak with chili powder, cumin, salt, and pepper.',
      'Heat a grill or skillet over high heat.',
      'Cook steak for 3-4 minutes per side for medium-rare.',
      'Let steak rest for 5 minutes, then slice thinly against the grain.',
      'Warm tortillas on the grill for 30 seconds per side.',
      'Assemble tacos with steak, onion, and cilantro.',
      'Serve with lime wedges.',
    ],
  },
  3: {
    title: 'Honey Glazed Salmon Bowl',
    image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NjQ2NTc4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '30 min',
    servings: 2,
    calories: 450,
    description: 'A nutritious bowl with honey-glazed salmon, quinoa, and fresh vegetables.',
    ingredients: [
      { item: 'Salmon fillets', amount: '2 (150g each)' },
      { item: 'Quinoa', amount: '1 cup, uncooked' },
      { item: 'Honey', amount: '3 tbsp' },
      { item: 'Soy sauce', amount: '2 tbsp' },
      { item: 'Avocado', amount: '1, sliced' },
      { item: 'Edamame', amount: '1 cup' },
      { item: 'Sesame seeds', amount: '1 tbsp' },
      { item: 'Mixed greens', amount: '2 cups' },
    ],
    steps: [
      'Cook quinoa according to package directions.',
      'Mix honey and soy sauce in a small bowl.',
      'Preheat oven to 200°C (400°F).',
      'Place salmon on a baking sheet and brush with honey-soy mixture.',
      'Bake for 12-15 minutes until salmon flakes easily.',
      'Cook edamame in boiling water for 3 minutes.',
      'Assemble bowls with quinoa, salmon, avocado, edamame, and greens.',
      'Sprinkle with sesame seeds and drizzle remaining glaze.',
    ],
  },
};

export function RecipeDetail({ recipeId, onBack, onNavigate }: RecipeDetailProps) {
  const [showSteps, setShowSteps] = useState(false);
  const [addedToGrocery, setAddedToGrocery] = useState(false);
  
  const recipe = recipeId ? recipeData[recipeId as keyof typeof recipeData] : recipeData[1];

  if (!recipe) {
    return null;
  }

  const handleAddToGrocery = () => {
    setAddedToGrocery(true);
    setTimeout(() => {
      onNavigate('grocery');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header Image */}
      <div className="relative h-80">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-900" />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-3 font-poppins-title">{recipe.title}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{recipe.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span className="text-sm">{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span className="text-sm">{recipe.calories} cal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Description */}
        <p className="text-neutral-700 mb-6">{recipe.description}</p>

        {/* Ingredients Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-900 font-poppins-subtitle">Ingredients</h3>
            <Button
              onClick={handleAddToGrocery}
              variant={addedToGrocery ? "default" : "solid"}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                addedToGrocery
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                  : ''
              }`}
            >
              {addedToGrocery ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add to Grocery List</span>
                </>
              )}
            </Button>
          </div>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 px-4 bg-neutral-50 rounded-xl border border-emerald-100 shadow-lg shadow-emerald-100/30"
              >
                <span className="text-neutral-900">{ingredient.item}</span>
                <span className="text-neutral-600">{ingredient.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-neutral-900 font-poppins-subtitle">Instructions</h3>
            <span className="text-emerald-600 text-sm">
              {showSteps ? 'Hide' : 'Show'} Steps
            </span>
          </button>
          
          {showSteps && (
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-neutral-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { ImageWithFallback } from './figma/ImageWithFallback';
import { Navigation } from './Navigation';
import { Clock, Flame } from 'lucide-react';
import { MeshGradientBackground } from './ui/mesh-gradient-background';

interface DashboardProps {
  onRecipeSelect: (recipeId: number) => void;
  onNavigate: (screen: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat') => void;
}

const recipes = [
  {
    id: 1,
    title: 'Creamy Carbonara',
    time: '25 min',
    calories: 540,
    image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGRpc2h8ZW58MXx8fHwxNzY0NjU0OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Italian', 'Quick'],
  },
  {
    id: 2,
    title: 'Street-Style Tacos',
    time: '20 min',
    calories: 380,
    image: 'https://images.unsplash.com/photo-1707603571504-86c1ea50903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc2NDYxMjIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Mexican', 'Quick'],
  },
  {
    id: 3,
    title: 'Honey Glazed Salmon Bowl',
    time: '30 min',
    calories: 450,
    image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NjQ2NTc4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Healthy', 'Protein'],
  },
  {
    id: 4,
    title: 'Authentic Pad Thai',
    time: '35 min',
    calories: 520,
    image: 'https://images.unsplash.com/photo-1718964313403-2db158f67844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWQlMjB0aGFpJTIwbm9vZGxlc3xlbnwxfHx8fDE3NjQ2MDI0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Thai', 'Asian'],
  },
  {
    id: 5,
    title: 'Mediterranean Bowl',
    time: '15 min',
    calories: 320,
    image: 'https://images.unsplash.com/photo-1625944525991-c196b2813492?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHNhbGFkJTIwZnJlc2h8ZW58MXx8fHwxNzY0NTMwNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Mediterranean', 'Healthy'],
  },
  {
    id: 6,
    title: 'Chicken Tikka Masala',
    time: '40 min',
    calories: 580,
    image: 'https://images.unsplash.com/photo-1764304733301-3a9f335f0c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwY3VycnklMjBib3dsfGVufDF8fHx8MTc2NDY1Nzg3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Indian', 'Spicy'],
  },
  {
    id: 7,
    title: 'Margherita Pizza',
    time: '45 min',
    calories: 620,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1hcmdoZXJpdGF8ZW58MXx8fHwxNzY0NTg1ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Italian', 'Classic'],
  },
  {
    id: 8,
    title: 'Veggie Stir Fry',
    time: '18 min',
    calories: 280,
    image: 'https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjQ1NDk0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Asian', 'Vegan'],
  },
];

export function Dashboard({ onRecipeSelect, onNavigate }: DashboardProps) {
  return (
    <MeshGradientBackground
      colors={[ "#FFFFFF","#A1BB73", "#FFFFFF", "#FBCAB5", "#FFFFFF", "#EF4B2D", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      distortion={0.8}
      swirl={0.6}
      speed={0.42}
      offsetX={0.08}
      veilOpacity="bg-white/20"
    >
      <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-1 font-poppins-title">Good Evening</h1>
            <p className="text-emerald-100 font-poppins-subtitle">What will you cook today?</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl">
            👨‍🍳
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-emerald-100/50 border border-emerald-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-emerald-600 mb-1">12</div>
              <div className="text-neutral-600 text-sm">Recipes Saved</div>
            </div>
            <div className="border-x border-neutral-200">
              <div className="text-emerald-600 mb-1">45</div>
              <div className="text-neutral-600 text-sm">Cooked This Month</div>
            </div>
            <div>
              <div className="text-emerald-600 mb-1">8</div>
              <div className="text-neutral-600 text-sm">Ingredients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="px-6 mb-4">
        <h3 className="text-neutral-900 font-poppins-subtitle">Recommended For You</h3>
      </div>

      {/* Recipe Grid */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => onRecipeSelect(recipe.id)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-emerald-100/50 border border-emerald-100 hover:shadow-xl hover:shadow-emerald-200/60 hover:scale-[1.02] transition-all duration-300 text-left"
          >
            <div className="relative h-36">
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span className="text-neutral-700">{recipe.time}</span>
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-neutral-900 mb-2 line-clamp-2 font-poppins-subtitle">{recipe.title}</h4>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-neutral-600">{recipe.calories} cal</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Navigation currentTab="dashboard" onNavigate={onNavigate} />
      </div>
    </MeshGradientBackground>
  );
}

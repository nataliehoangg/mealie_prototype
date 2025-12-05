import { useState } from 'react';
import { Navigation } from './Navigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search as SearchIcon, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/neon-button';
import { MeshGradientBackground } from './ui/mesh-gradient-background';

interface SearchProps {
  onRecipeSelect: (recipeId: number) => void;
  onNavigate: (screen: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat') => void;
}

const trendingSearches = [
  '30-minute meals',
  'High protein',
  'Vegetarian dinner',
  'Meal prep',
  'Keto recipes',
];

const searchResults = [
  {
    id: 1,
    title: 'Creamy Carbonara',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGRpc2h8ZW58MXx8fHwxNzY0NjU0OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Italian', 'Quick'],
  },
  {
    id: 2,
    title: 'Street-Style Tacos',
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1707603571504-86c1ea50903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc2NDYxMjIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Mexican', 'Quick'],
  },
  {
    id: 3,
    title: 'Honey Glazed Salmon Bowl',
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NjQ2NTc4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Healthy', 'Protein'],
  },
];

export function Search({ onRecipeSelect, onNavigate }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setHasSearched(true);
    }
  };

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
        <div className="bg-white px-6 pt-12 pb-6 border-b border-neutral-200">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6 font-poppins-title">Search Recipes</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for recipes, ingredients..."
            className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {!hasSearched ? (
        <>
          {/* Trending Searches */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="text-neutral-900 font-poppins-subtitle">Trending Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search) => (
                <Button
                  key={search}
                  onClick={() => handleSearch(search)}
                  variant="default"
                  className="px-4 py-2 rounded-xl bg-white text-neutral-700"
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>

          {/* Suggested Categories */}
          <div className="px-6 py-6">
            <h3 className="text-neutral-900 mb-4 font-poppins-subtitle">Browse by Category</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Quick & Easy', emoji: '⚡', color: 'from-yellow-400 to-orange-500' },
                { name: 'Healthy', emoji: '🥗', color: 'from-emerald-400 to-green-500' },
                { name: 'Comfort Food', emoji: '🍲', color: 'from-orange-400 to-red-500' },
                { name: 'Desserts', emoji: '🍰', color: 'from-pink-400 to-purple-500' },
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleSearch(category.name)}
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-left text-white hover:scale-105 transition-transform`}
                >
                  <div className="text-4xl mb-2">{category.emoji}</div>
                  <div>{category.name}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="px-6 py-6">
          <div className="mb-4">
            <p className="text-neutral-600">
              {searchResults.length} results for "{searchQuery}"
            </p>
          </div>

          <div className="space-y-4">
            {searchResults.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => onRecipeSelect(recipe.id)}
                className="w-full bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-lg shadow-emerald-100/50 hover:border-emerald-200 hover:shadow-emerald-200/60 transition-all flex text-left"
              >
                <div className="w-28 h-28 flex-shrink-0">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h4 className="text-neutral-900 mb-2 font-poppins-subtitle">{recipe.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    <span className="text-xs text-neutral-600">{recipe.time}</span>
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
        </div>
      )}

      <Navigation currentTab="search" onNavigate={onNavigate} />
      </div>
    </MeshGradientBackground>
  );
}

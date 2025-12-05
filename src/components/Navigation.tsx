import { Home, Search, ShoppingCart, Package, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentTab: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat';
  onNavigate: (tab: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat') => void;
}

export function Navigation({ currentTab, onNavigate }: NavigationProps) {
  const tabs = [
    { id: 'dashboard' as const, icon: Home, label: 'Home' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'inventory' as const, icon: Package, label: 'Inventory' },
    { id: 'grocery' as const, icon: ShoppingCart, label: 'Grocery' },
    { id: 'oat' as const, icon: Sparkles, label: 'Ask OAT' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-3 safe-area-bottom">
      <div className="max-w-2xl mx-auto flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive ? 'bg-emerald-50' : 'hover:bg-neutral-50'
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-emerald-600' : 'text-neutral-500'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-emerald-600' : 'text-neutral-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

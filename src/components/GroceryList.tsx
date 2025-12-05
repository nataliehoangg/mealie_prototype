import { useState } from 'react';
import { Navigation } from './Navigation';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/neon-button';
import { MeshGradientBackground } from './ui/mesh-gradient-background';

interface GroceryListProps {
  onNavigate: (screen: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat') => void;
}

interface GroceryItem {
  id: number;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  fromRecipe?: string;
}

const initialItems: GroceryItem[] = [
  { id: 1, name: 'Spaghetti', quantity: '400g', category: 'Pasta & Grains', checked: false, fromRecipe: 'Creamy Carbonara' },
  { id: 2, name: 'Pancetta', quantity: '200g', category: 'Meat', checked: false, fromRecipe: 'Creamy Carbonara' },
  { id: 3, name: 'Eggs', quantity: '4', category: 'Dairy', checked: false, fromRecipe: 'Creamy Carbonara' },
  { id: 4, name: 'Pecorino Romano', quantity: '100g', category: 'Dairy', checked: false, fromRecipe: 'Creamy Carbonara' },
  { id: 5, name: 'Black pepper', quantity: '2 tsp', category: 'Spices', checked: false, fromRecipe: 'Creamy Carbonara' },
  { id: 6, name: 'Olive oil', quantity: '1 bottle', category: 'Oils', checked: false },
  { id: 7, name: 'Garlic', quantity: '1 bulb', category: 'Produce', checked: false },
  { id: 8, name: 'Fresh basil', quantity: '1 bunch', category: 'Produce', checked: false },
];

export function GroceryList({ onNavigate }: GroceryListProps) {
  const [items, setItems] = useState(initialItems);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: GroceryItem = {
        id: Math.max(...items.map(i => i.id), 0) + 1,
        name: newItemName,
        quantity: '1',
        category: 'Other',
        checked: false,
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setShowAddItem(false);
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-3 font-poppins-title">Grocery List</h1>
        <div className="flex items-center justify-between">
          <p className="text-emerald-100">
            {checkedCount} of {totalCount} items collected
          </p>
          <div className="bg-emerald-500 px-4 py-2 rounded-xl">
            <span className="text-white">{Math.round((checkedCount / totalCount) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Add Item Button */}
      <div className="px-6 -mt-4 mb-6">
        {showAddItem ? (
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-emerald-200">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name"
              className="w-full px-4 py-3 mb-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-emerald-500"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <div className="flex gap-3">
              <Button
                onClick={addItem}
                variant="solid"
                className="flex-1 rounded-xl py-2"
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setShowAddItem(false);
                  setNewItemName('');
                }}
                variant="ghost"
                neon={false}
                className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddItem(true)}
            className="w-full bg-white border-2 border-dashed border-emerald-300 rounded-2xl px-4 py-4 flex items-center justify-center gap-2 text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Custom Item</span>
          </button>
        )}
      </div>

      {/* Grouped Items */}
      <div className="px-6 space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category}>
            <h3 className="text-neutral-700 mb-3 font-poppins-subtitle">{category}</h3>
            <div className="space-y-2">
              {categoryItems.map(item => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-4 border transition-all shadow-lg ${
                    item.checked
                      ? 'border-emerald-200 bg-emerald-50/50 shadow-emerald-200/60'
                      : 'border-emerald-100 shadow-emerald-100/50 hover:border-emerald-200 hover:shadow-emerald-200/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        item.checked
                          ? 'bg-emerald-600 border-emerald-600'
                          : 'border-neutral-300 hover:border-emerald-500'
                      }`}
                    >
                      {item.checked && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <div className={`flex items-center gap-2 mb-1 ${item.checked ? 'line-through text-neutral-500' : 'text-neutral-900'}`}>
                        <span>{item.name}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-neutral-600 text-sm">{item.quantity}</span>
                      </div>
                      {item.fromRecipe && (
                        <p className="text-emerald-600 text-xs">From: {item.fromRecipe}</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-neutral-600 mb-2">Your grocery list is empty</p>
          <p className="text-neutral-500 text-sm">Add items from recipes or create custom items</p>
        </div>
      )}

      <Navigation currentTab="grocery" onNavigate={onNavigate} />
      </div>
    </MeshGradientBackground>
  );
}

import { useState } from 'react';
import { Navigation } from './Navigation';
import { Plus, Search, ScanBarcode, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/neon-button';
import { MeshGradientBackground } from './ui/mesh-gradient-background';

interface InventoryProps {
  onNavigate: (screen: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat') => void;
}

interface InventoryItem {
  id: number;
  name: string;
  quantity: string;
  expiryDate: string;
  daysUntilExpiry: number;
  category: string;
}

const inventoryItems: InventoryItem[] = [
  { id: 1, name: 'Milk', quantity: '1L', expiryDate: 'Dec 5, 2025', daysUntilExpiry: 3, category: 'Dairy' },
  { id: 2, name: 'Eggs', quantity: '12', expiryDate: 'Dec 8, 2025', daysUntilExpiry: 6, category: 'Dairy' },
  { id: 3, name: 'Chicken Breast', quantity: '500g', expiryDate: 'Dec 4, 2025', daysUntilExpiry: 2, category: 'Protein' },
  { id: 4, name: 'Tomatoes', quantity: '6', expiryDate: 'Dec 6, 2025', daysUntilExpiry: 4, category: 'Produce' },
  { id: 5, name: 'Onions', quantity: '3', expiryDate: 'Dec 15, 2025', daysUntilExpiry: 13, category: 'Produce' },
  { id: 6, name: 'Cheddar Cheese', quantity: '200g', expiryDate: 'Dec 12, 2025', daysUntilExpiry: 10, category: 'Dairy' },
  { id: 7, name: 'Bell Peppers', quantity: '4', expiryDate: 'Dec 7, 2025', daysUntilExpiry: 5, category: 'Produce' },
  { id: 8, name: 'Yogurt', quantity: '500g', expiryDate: 'Dec 3, 2025', daysUntilExpiry: 1, category: 'Dairy' },
];

export function Inventory({ onNavigate }: InventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['All', 'Dairy', 'Protein', 'Produce', 'Grains', 'Condiments'];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const expiringItems = inventoryItems.filter(item => item.daysUntilExpiry <= 3);

  const getExpiryColor = (days: number) => {
    if (days <= 1) return 'text-red-600 bg-red-50';
    if (days <= 3) return 'text-orange-600 bg-orange-50';
    return 'text-emerald-600 bg-emerald-50';
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-6 font-poppins-title">Inventory</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredients..."
            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="solid" className="flex-1 rounded-2xl px-4 py-3 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </Button>
          <Button variant="ghost" className="px-4 py-3 rounded-2xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            <ScanBarcode className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Expiring Soon Alert */}
      {expiringItems.length > 0 && (
        <div className="px-6 pt-6">
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-900 mb-1">{expiringItems.length} item{expiringItems.length > 1 ? 's' : ''} expiring soon!</p>
                <p className="text-orange-700 text-sm">
                  {expiringItems.map(item => item.name).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-lg ${
                (category === 'All' && !selectedCategory) || selectedCategory === category
                  ? 'bg-emerald-600 text-white border-emerald-200 shadow-emerald-200/60'
                  : 'bg-white text-neutral-700 border border-emerald-100 shadow-emerald-100/50 hover:border-emerald-200 hover:shadow-emerald-200/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory List */}
      <div className="px-6 space-y-3">
        {filteredItems.map(item => (
          <button
            key={item.id}
            className="w-full bg-white rounded-2xl p-4 border border-emerald-100 shadow-lg shadow-emerald-100/50 hover:border-emerald-200 hover:shadow-emerald-200/60 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-neutral-900">{item.name}</h4>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 text-sm">{item.quantity}</span>
              <div className={`px-3 py-1 rounded-lg text-xs ${getExpiryColor(item.daysUntilExpiry)}`}>
                {item.daysUntilExpiry === 0 ? 'Expires today' :
                 item.daysUntilExpiry === 1 ? 'Expires tomorrow' :
                 `${item.daysUntilExpiry} days left`}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-neutral-600">No items found</p>
        </div>
      )}

      <Navigation currentTab="inventory" onNavigate={onNavigate} />
      </div>
    </MeshGradientBackground>
  );
}

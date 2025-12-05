import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/neon-button';
import { MeshGradientBackground } from './ui/mesh-gradient-background';

interface PreferenceSurveyProps {
  onComplete: () => void;
}

export function PreferenceSurvey({ onComplete }: PreferenceSurveyProps) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    cuisines: [] as string[],
    dietary: [] as string[],
    healthGoals: [] as string[],
    cookingTime: '',
    groceryStore: '',
  });
  const [showOtherStoreInput, setShowOtherStoreInput] = useState(false);
  const [customStoreName, setCustomStoreName] = useState('');
  const [customStores, setCustomStores] = useState<string[]>([]);

  const cuisineOptions = ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian', 'Thai', 'French'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Halal', 'Kosher', 'I have no dietary restrictions'];
  const healthGoalOptions = ['Weight Loss', 'Muscle Gain', 'Heart Health', 'Energy Boost', 'General Wellness'];
  const timeOptions = ['Under 15 min', '15-30 min', '30-45 min', '45+ min', 'No preference'];
  const baseStoreOptions = ['Whole Foods', 'Trader Joe\'s', 'Walmart', 'Target', 'Local Markets', 'Other'];

  const toggleArrayPreference = (category: 'cuisines' | 'dietary' | 'healthGoals', value: string) => {
    setPreferences(prev => {
      const current = prev[category];
      
      // Special handling for "I have no dietary restrictions"
      if (category === 'dietary' && value === 'I have no dietary restrictions') {
        if (current.includes(value)) {
          // If already selected, deselect it
          return { ...prev, [category]: [] };
        } else {
          // If selecting "no restrictions", clear all others and select only this
          return { ...prev, [category]: [value] };
        }
      }
      
      // If selecting any other dietary restriction while "no restrictions" is selected, clear "no restrictions"
      if (category === 'dietary' && current.includes('I have no dietary restrictions') && value !== 'I have no dietary restrictions') {
        const filtered = current.filter(v => v !== 'I have no dietary restrictions');
        if (filtered.includes(value)) {
          return { ...prev, [category]: filtered.filter(v => v !== value) };
        } else {
          return { ...prev, [category]: [...filtered, value] };
        }
      }
      
      // Normal toggle behavior
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const steps = [
    {
      title: 'Favorite Cuisines',
      subtitle: 'Select all that you enjoy',
      options: cuisineOptions,
      category: 'cuisines' as const,
      isMulti: true,
    },
    {
      title: 'Dietary Restrictions',
      subtitle: 'Select any that apply',
      options: dietaryOptions,
      category: 'dietary' as const,
      isMulti: true,
    },
    {
      title: 'Health Goals',
      subtitle: 'What are you working towards?',
      options: healthGoalOptions,
      category: 'healthGoals' as const,
      isMulti: true,
    },
    {
      title: 'Cooking Time',
      subtitle: 'How much time do you usually have?',
      options: timeOptions,
      category: 'cookingTime' as const,
      isMulti: false,
    },
    {
      title: 'Grocery Store',
      subtitle: 'Where do you usually shop?',
      options: baseStoreOptions,
      category: 'groceryStore' as const,
      isMulti: false,
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  const canProceed = () => {
    if (currentStep.isMulti) {
      const category = currentStep.category as 'cuisines' | 'dietary' | 'healthGoals';
      const selected = preferences[category];
      // For dietary restrictions, allow proceeding if "I have no dietary restrictions" is selected
      if (category === 'dietary' && selected.includes('I have no dietary restrictions')) {
        return true;
      }
      return selected.length > 0;
    } else {
      return preferences[currentStep.category as 'cookingTime' | 'groceryStore'] !== '';
    }
  };

  // Get store options including custom stores
  const getStoreOptions = () => {
    return [...baseStoreOptions.filter(opt => opt !== 'Other'), ...customStores, 'Other'];
  };

  const handleStoreSelection = (option: string) => {
    if (option === 'Other') {
      setShowOtherStoreInput(true);
      setPreferences(prev => ({ ...prev, groceryStore: '' }));
    } else {
      setShowOtherStoreInput(false);
      setPreferences(prev => ({ ...prev, groceryStore: option }));
    }
  };

  const handleAddCustomStore = () => {
    if (customStoreName.trim() && !customStores.includes(customStoreName.trim())) {
      const newStore = customStoreName.trim();
      setCustomStores([...customStores, newStore]);
      setPreferences(prev => ({ ...prev, groceryStore: newStore }));
      setCustomStoreName('');
      setShowOtherStoreInput(false);
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
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full flex-1 transition-all ${
                  index <= step ? 'bg-emerald-500' : 'bg-neutral-200'
                }`}
                style={{
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.2)'
                }}
              />
            ))}
          </div>
          <p className="text-neutral-600 text-sm">Step {step + 1} of {steps.length}</p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-emerald-900 mb-2 font-poppins-title">{currentStep.title}</h2>
          <p className="text-neutral-600 font-poppins-subtitle">{currentStep.subtitle}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {(currentStep.category === 'groceryStore' ? getStoreOptions() : currentStep.options).map((option) => {
            const isSelected = currentStep.isMulti
              ? preferences[currentStep.category as 'cuisines' | 'dietary' | 'healthGoals'].includes(option)
              : preferences[currentStep.category as 'cookingTime' | 'groceryStore'] === option;

            return (
              <button
                key={option}
                onClick={() => {
                  if (currentStep.isMulti) {
                    toggleArrayPreference(currentStep.category as 'cuisines' | 'dietary' | 'healthGoals', option);
                  } else if (currentStep.category === 'groceryStore') {
                    handleStoreSelection(option);
                  } else {
                    setPreferences(prev => ({
                      ...prev,
                      [currentStep.category]: option,
                    }));
                  }
                }}
                className={`px-6 py-4 rounded-2xl border transition-all shadow-lg ${
                  isSelected
                    ? 'bg-emerald-500 border-emerald-200 text-white shadow-emerald-200/60'
                    : 'bg-white border-emerald-100 text-neutral-700 shadow-emerald-100/50 hover:border-emerald-200 hover:shadow-emerald-200/60'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Custom Store Input (only shown on Grocery Store step when Other is clicked) */}
        {currentStep.category === 'groceryStore' && showOtherStoreInput && (
          <div className="mb-8 p-4 bg-white rounded-2xl border-2 border-emerald-300">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Enter your grocery store name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customStoreName}
                onChange={(e) => setCustomStoreName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customStoreName.trim()) {
                    handleAddCustomStore();
                  }
                }}
                placeholder="e.g., Safeway, Kroger..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-emerald-500 focus:outline-none"
                autoFocus
              />
              <Button
                onClick={handleAddCustomStore}
                disabled={!customStoreName.trim()}
                variant="solid"
                className="px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          {step > 0 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="ghost"
              neon={false}
              className="px-8 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-700 hover:border-emerald-300"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            variant="solid"
            className="flex-1 rounded-2xl px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLastStep ? 'Finish' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        </div>
      </div>
    </MeshGradientBackground>
  );
}

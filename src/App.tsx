import { useState } from 'react';
import { SignIn } from './components/SignIn';
import { Dashboard } from './components/Dashboard';
import { RecipeDetail } from './components/RecipeDetail';
import { Inventory } from './components/Inventory';
import { GroceryList } from './components/GroceryList';
import { Search } from './components/Search';
import { AskOAT } from './components/AskOAT';
import { PreferenceSurvey } from './components/PreferenceSurvey';
import { AccountDetails } from './components/AccountDetails';

type Screen = 
  | 'signin'
  | 'account'
  | 'preferences'
  | 'dashboard'
  | 'recipe'
  | 'inventory'
  | 'grocery'
  | 'search'
  | 'oat';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('signin');
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setCurrentScreen('account');
  };

  const handleAccountComplete = () => {
    setCurrentScreen('preferences');
  };

  const handlePreferencesComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleRecipeSelect = (recipeId: number) => {
    setSelectedRecipe(recipeId);
    setCurrentScreen('recipe');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'signin':
        return <SignIn onSignIn={handleSignIn} />;
      case 'account':
        return <AccountDetails onComplete={handleAccountComplete} />;
      case 'preferences':
        return <PreferenceSurvey onComplete={handlePreferencesComplete} />;
      case 'dashboard':
        return <Dashboard onRecipeSelect={handleRecipeSelect} onNavigate={handleNavigate} />;
      case 'recipe':
        return <RecipeDetail recipeId={selectedRecipe} onNavigate={handleNavigate} onBack={() => setCurrentScreen('dashboard')} />;
      case 'inventory':
        return <Inventory onNavigate={handleNavigate} />;
      case 'grocery':
        return <GroceryList onNavigate={handleNavigate} />;
      case 'search':
        return <Search onRecipeSelect={handleRecipeSelect} onNavigate={handleNavigate} />;
      case 'oat':
        return <AskOAT onRecipeSelect={handleRecipeSelect} onNavigate={handleNavigate} />;
      default:
        return <SignIn onSignIn={handleSignIn} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {renderScreen()}
    </div>
  );
}

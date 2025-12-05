import { useState } from 'react';
import { Navigation } from './Navigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Send, Sparkles, Clock, ChefHat } from 'lucide-react';
import { Button } from './ui/neon-button';
import { MeshGradientBackground } from './ui/mesh-gradient-background';

interface AskOATProps {
  onRecipeSelect: (recipeId: number) => void;
  onNavigate: (screen: 'dashboard' | 'search' | 'inventory' | 'grocery' | 'oat') => void;
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  suggestions?: Array<{
    id: number;
    title: string;
    time: string;
    image: string;
  }>;
}

const quickPrompts = [
  '🥗 Healthy dinner under 400 calories',
  '⚡ Quick 15-minute lunch',
  '🌱 Vegetarian meals for the week',
  '🍗 High protein recipes',
];

export function AskOAT({ onRecipeSelect, onNavigate }: AskOATProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm OAT, your cooking assistant. 👨‍🍳 I can help you find recipes, suggest meal ideas, and answer cooking questions. What would you like to cook today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (message?: string) => {
    const messageToSend = message || inputValue;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: messageToSend,
    };

    const assistantMessage: Message = {
      id: messages.length + 2,
      type: 'assistant',
      content: "Great question! Based on your preferences and available ingredients, here are some recipes I'd recommend:",
      suggestions: [
        {
          id: 3,
          title: 'Honey Glazed Salmon Bowl',
          time: '30 min',
          image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NjQ2NTc4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 1,
          title: 'Creamy Carbonara',
          time: '25 min',
          image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGRpc2h8ZW58MXx8fHwxNzY0NjU0OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInputValue('');
  };

  return (
    <MeshGradientBackground
      colors={[ "#FFFFFF","#8030C1", "#FFFFFF", "#2D3EC2", "#FFFFFF", "#801EF5", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      distortion={0.8}
      swirl={0.6}
      speed={0.42}
      offsetX={0.08}
      veilOpacity="bg-white/20"
    >
      <div className="min-h-screen pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 px-6 pt-12 pb-6 rounded-b-3xl flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-poppins-title">Ask OAT</h1>
          </div>
        </div>
        <p className="text-purple-100">Your AI cooking companion</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
              {message.type === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <ChefHat className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-neutral-600 text-sm">OAT</span>
                </div>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-neutral-200'
                }`}
              >
                <p className={message.type === 'user' ? 'text-white' : 'text-neutral-800'}>
                  {message.content}
                </p>
              </div>

              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => onRecipeSelect(suggestion.id)}
                      className="w-full bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-lg shadow-purple-100/50 hover:border-purple-200 hover:shadow-purple-200/60 transition-all flex text-left"
                    >
                      <div className="w-20 h-20 flex-shrink-0">
                        <ImageWithFallback
                          src={suggestion.image}
                          alt={suggestion.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center">
                        <h4 className="text-neutral-900 text-sm mb-1 font-poppins-subtitle">{suggestion.title}</h4>
                        <div className="flex items-center gap-1 text-neutral-600">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{suggestion.time}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-6 pb-4 flex-shrink-0">
          <p className="text-neutral-600 text-sm mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <Button
                key={prompt}
                onClick={() => handleSend(prompt)}
                variant="default"
                className="px-4 py-2 rounded-xl bg-white text-neutral-700 text-sm border-purple-100 shadow-purple-100/50 hover:border-purple-200 hover:shadow-purple-200/60"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-6 pb-6 flex-shrink-0">
        <div className="bg-white border-2 border-neutral-200 rounded-2xl flex items-center gap-3 px-4 py-3 focus-within:border-purple-500 transition-colors">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about cooking..."
            className="flex-1 outline-none text-neutral-900 placeholder:text-neutral-400"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            variant="solid"
            className="p-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 border-purple-300 shadow-purple-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Navigation currentTab="oat" onNavigate={onNavigate} />
      </div>
    </MeshGradientBackground>
  );
}

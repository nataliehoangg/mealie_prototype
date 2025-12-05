import { useState } from 'react';
import { Button } from './ui/neon-button';
import { MeshGradientBackground } from './ui/mesh-gradient-background';

interface AccountDetailsProps {
  onComplete: () => void;
}

export function AccountDetails({ onComplete }: AccountDetailsProps) {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatarEmojis = ['👨‍🍳', '👩‍🍳', '🧑‍🍳', '👤', '🌱', '🥑', '🍅', '🥕'];

  const handleContinue = () => {
    if (username.trim()) {
      onComplete();
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
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-emerald-900 mb-2 font-poppins-title">Create Your Profile</h2>
          <p className="text-neutral-600">Let's personalize your Mealie experience</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-emerald-100/50 border border-emerald-100">
          <div className="mb-8">
            <label className="block text-neutral-700 mb-3">Choose Your Avatar</label>
            <div className="grid grid-cols-4 gap-3">
              {avatarEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(index)}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all ${
                    selectedAvatar === index
                      ? 'bg-emerald-500 ring-4 ring-emerald-200 scale-105'
                      : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-neutral-700 mb-3">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-5 py-4 rounded-2xl border-2 border-neutral-200 focus:border-emerald-500 focus:outline-none transition-colors bg-neutral-50"
            />
          </div>

          <Button
            onClick={handleContinue}
            disabled={!username.trim()}
            variant="solid"
            className="w-full rounded-2xl px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
        </div>
      </div>
    </MeshGradientBackground>
  );
}

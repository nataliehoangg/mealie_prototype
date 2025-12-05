import { AnimatedHero } from './ui/animated-hero';
import { Button } from './ui/neon-button';
import { MeshGradientBackground } from './ui/mesh-gradient-background';
import { motion } from 'framer-motion';

interface SignInProps {
  onSignIn: () => void;
}

const phrases = [
  'fits your life.',
  'feels effortless.',
  'saves you time.',
  'keeps things simple.',
  'reduces the stress.',
];

export function SignIn({ onSignIn }: SignInProps) {
  return (
    <MeshGradientBackground
      colors={[ "#FFFFFF","#A1BB73", "#FFFFFF", "#FBCAB5", "#FFFFFF", "#EF4B2D", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      distortion={0.8}
      swirl={0.6}
      speed={0.42}
      offsetX={0.08}
      veilOpacity="bg-white/20"
    >
      <div className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Tomato at bottom - full image */}
      <motion.img
        src="/images/tomato.png"
        alt="tomato"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 object-contain pointer-events-none z-0"
        style={{
          width: '200px',
          height: '200px',
          opacity: 0.7,
          filter: 'blur(1.5px)'
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Clover – Q4 BR3 */}
      {/* <motion.img
        src="/images/clover.png"
        alt="clover"
        className="
          absolute
          bottom-[6vh] right-[18vw]
          sm:bottom-[8vh] sm:right-[20vw]
          md:bottom-[10vh] md:right-[24vw]
          lg:bottom-[12vh] lg:right-[28vw]
          w-[32vw] max-w-[170px]
          object-contain opacity-60 blur-[1.5px] pointer-events-none z-0
        "
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, delay: 0.3, ease: 'easeInOut', repeat: Infinity }}
      /> */}

      
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-12">
          <h1 
            className="font-bold mb-6 font-poppins-title"
            style={{ 
              color: '#A1BB73',
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              textShadow: '0 0 8px rgba(209, 250, 229, 0.2), 0 0 16px rgba(209, 250, 229, 0.15), 0 0 24px rgba(209, 250, 229, 0.1)',
              letterSpacing: '-0.05em'
            }}
          >
            Mealie
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-regular tracking-tight text-center font-poppins-subtitle">
            <div 
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 8px #A1BB73, 0 0 16px #A1BB73, 0 0 24px rgba(209, 250, 229, 0.2)',
                letterSpacing: '-0.05em'
              }}
            >
              Meal prep that
            </div>
            <AnimatedHero 
              phrases={phrases} 
              interval={2000} 
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 8px #A1BB73, 0 0 16px #A1BB73, 0 0 24px rgba(209, 250, 229, 0.2)',
                letterSpacing: '-0.05em'
              }}
            />
          </h2>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onSignIn}
            variant="default"
            className="w-full bg-white border-2 border-neutral-200 rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:border-emerald-500 hover:bg-emerald-50"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-neutral-900">Continue with Google</span>
          </Button>

          <Button
            onClick={onSignIn}
            variant="solid"
            className="w-full bg-black text-white rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:bg-neutral-800 border-black"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span>Continue with Apple</span>
          </Button>
        </div>

        <p className="text-center text-neutral-500 mt-8 text-sm">
          By continuing, you agree to Mealie's Terms of Service and Privacy Policy
        </p>
      </div>
      </div>
    </MeshGradientBackground>
  );
}

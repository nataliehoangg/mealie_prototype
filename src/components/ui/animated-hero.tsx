import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["amazing", "new", "wonderful", "beautiful", "smart"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AnimatedHeroProps {
  phrases: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedHero({ phrases, interval = 2000, className = "", style }: AnimatedHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  if (!phrases || phrases.length === 0) {
    return null;
  }

  return (
    <div 
      className={`relative block ${className}`}
      style={{ 
        display: 'block',
        minHeight: '1.5em',
        lineHeight: '1.5em',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {phrases.map((phrase, index) => (
        <motion.span
          key={index}
          className="absolute left-0 right-0 font-semibold whitespace-nowrap"
          style={{ 
            top: 0,
            width: '100%',
            textAlign: 'center',
            lineHeight: '1.5em',
            ...style
          }}
          initial={{ opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 20 }}
          animate={
            currentIndex === index
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: currentIndex > index ? -20 : 20 }
          }
          transition={{ 
            duration: 0.4,
            ease: "easeInOut"
          }}
        >
          {phrase}
        </motion.span>
      ))}
    </div>
  );
}

export { Hero };

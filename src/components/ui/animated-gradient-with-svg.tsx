import React, { useMemo, useRef } from "react";
import { cn } from "@/components/ui/utils";
import { useDimensions } from "@/components/hooks/use-debounced-dimensions";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height) * 0.6,
    [dimensions.width, dimensions.height]
  );

  const blurClass =
    blur === "light"
      ? "blur-3xl"
      : blur === "medium"
      ? "blur-[100px]"
      : "blur-[150px]";

  // Use stable random values per color to avoid regeneration on each render
  const circleData = useMemo(() => 
    colors.map((color, index) => {
      const seed = index * 1000; // Stable seed based on index
      const rng = (offset: number) => {
        const x = Math.sin(seed + offset) * 10000;
        return x - Math.floor(x);
      };
      return {
        color,
        top: rng(1) * 50,
        left: rng(2) * 50,
        size: 0.4 + rng(3) * 0.6, // Between 0.4 and 1.0
        tx1: rng(4) - 0.5,
        ty1: rng(5) - 0.5,
        tx2: rng(6) - 0.5,
        ty2: rng(7) - 0.5,
        tx3: rng(8) - 0.5,
        ty3: rng(9) - 0.5,
        tx4: rng(10) - 0.5,
        ty4: rng(11) - 0.5,
      };
    }),
    [colors]
  );

  const blurValue = blur === "light" ? "64px" : blur === "medium" ? "100px" : "150px";

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div className="absolute inset-0">
        {circleData.map((circle, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${circle.top}%`,
                left: `${circle.left}%`,
                "--background-gradient-speed": `${1 / speed}s`,
                "--tx-1": circle.tx1,
                "--ty-1": circle.ty1,
                "--tx-2": circle.tx2,
                "--ty-2": circle.ty2,
                "--tx-3": circle.tx3,
                "--ty-3": circle.ty3,
                "--tx-4": circle.tx4,
                "--ty-4": circle.ty4,
                filter: `blur(${blurValue})`,
                opacity: 0.08,
              } as React.CSSProperties
            }
            width={circleSize * circle.size}
            height={circleSize * circle.size}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={circle.color}
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export { AnimatedGradient };

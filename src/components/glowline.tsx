import React from 'react';

// Type definitions
type Orientation = 'vertical' | 'horizontal';

interface GlowLineProps {
  orientation: Orientation;
  position: string;
  className?: string;
}

interface GlowLayer {
  size: string;
  blur: string;
  opacity: string;
  color: string;
}

// F1 Red color scheme configuration
const F1_RED_SCHEME = {
  core: 'via-f1-red-600',
  glow: ['via-f1-red-500', 'via-f1-red-600', 'via-f1-red-700', 'via-f1-red-400'],
};

const GlowLine: React.FC<GlowLineProps> = ({ orientation, position, className = '' }) => {
  const isVertical = orientation === 'vertical';
  const containerClasses = isVertical ? 'absolute w-px h-full' : 'absolute w-full h-px';
  const positionStyle: React.CSSProperties = isVertical ? { left: position } : { top: position };
  const gradientDirection = isVertical ? 'bg-gradient-to-b' : 'bg-gradient-to-r';

  const glowLayers: GlowLayer[] = [
    {
      size: isVertical ? 'w-1 -ml-0.5' : 'h-1 -mt-0.5',
      blur: 'blur-sm',
      opacity: 'opacity-100',
      color: F1_RED_SCHEME.glow[0],
    },
    {
      size: isVertical ? 'w-2 -ml-1' : 'h-2 -mt-1',
      blur: 'blur-md',
      opacity: 'opacity-80',
      color: F1_RED_SCHEME.glow[1],
    },
    {
      size: isVertical ? 'w-4 -ml-2' : 'h-4 -mt-2',
      blur: 'blur-lg',
      opacity: 'opacity-60',
      color: F1_RED_SCHEME.glow[2],
    },
  ];

  return (
    <div className={`${containerClasses} ${className}`} style={positionStyle}>
      <div
        className={`absolute inset-0 ${gradientDirection} from-transparent ${F1_RED_SCHEME.core} to-transparent`}
      />
      <div
        className={`absolute inset-0 ${isVertical ? 'w-0.5 -ml-px' : 'h-0.5 -mt-px'} ${gradientDirection} from-transparent via-white to-transparent opacity-60`}
      />
      {glowLayers.map((layer, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${layer.size} ${gradientDirection} from-transparent ${layer.color} to-transparent ${layer.blur} ${layer.opacity}`}
        />
      ))}
    </div>
  );
};

export default GlowLine;

import React from 'react';
import { motion } from 'motion/react';

type SupportedTag = keyof React.JSX.IntrinsicElements;

const motionComponentCache = new Map<SupportedTag, React.ComponentType<any>>();

function getMotionComponent(tag: SupportedTag) {
  if (!motionComponentCache.has(tag)) {
    motionComponentCache.set(tag, motion.create(tag as any));
  }
  return motionComponentCache.get(tag)!;
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: SupportedTag;
  className?: string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
  style,
}) => {
  const Component = getMotionComponent(as);

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

export default FadeIn;

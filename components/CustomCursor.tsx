'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [isVisible]);

  const text = t('cursorText');

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: position.x - 40,
        y: position.y - 40,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <div className="relative w-[80px] h-[80px]">
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-[5px] h-[5px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
        
        {/* Rotating text */}
        <svg
          className="w-full h-full animate-spin-slow mix-blend-difference"
          viewBox="0 0 100 100"
        >
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
          <text
            fill="white"
            fontSize="9.5"
            fontFamily="var(--font-roboto), sans-serif"
            letterSpacing="2"
            fontWeight="500"
          >
            <textPath href="#circlePath">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
    </motion.div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block isolate ${className}`}>
      {/* Main Gradient Text */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-[#cfc7b0] via-[#d4af37] via-[#fbf5df] via-[#d4af37] to-[#cfc7b0] bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer */}
      <span 
        className="block text-transparent bg-clip-text bg-gradient-to-r from-[#888] to-[#ccc] opacity-50"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {text}
      </span>
      
      {/* Subtle Glow */}
      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#d4af37] via-white to-[#d4af37] bg-[length:200%_auto] bg-clip-text text-transparent blur-md opacity-20"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
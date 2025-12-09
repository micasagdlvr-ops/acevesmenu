/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      
      {/* Deep Red/Brown Blob - Warmth/Food */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] bg-[#3d0000] rounded-full mix-blend-screen filter blur-[80px] opacity-20 will-change-transform"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Gold Blob - Elegance/Cheese/Corn */}
      <motion.div
        className="absolute top-[30%] right-[-20%] w-[80vw] h-[80vw] bg-[#665200] rounded-full mix-blend-screen filter blur-[90px] opacity-15 will-change-transform"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Silver/Gray Blob - Sophistication */}
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[100vw] h-[70vw] bg-[#333333] rounded-full mix-blend-screen filter blur-[100px] opacity-20 will-change-transform"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;
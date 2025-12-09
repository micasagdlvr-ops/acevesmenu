/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { Plus } from 'lucide-react';

interface MenuCardProps {
  artist: MenuItem; // Kept prop name as 'artist' for compatibility but it's a menu item
  onClick: () => void;
}

const ArtistCard: React.FC<MenuCardProps> = ({ artist: item, onClick }) => {
  return (
    <motion.div
      className="group relative h-[350px] md:h-[400px] w-full overflow-hidden bg-[#0a0a0a] cursor-pointer border border-white/5 hover:border-[#d4af37]/30 transition-colors duration-500"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-cover grayscale-[30%] will-change-transform"
          variants={{
            rest: { scale: 1, filter: 'brightness(0.6)' },
            hover: { scale: 1.1, filter: 'brightness(0.8)' }
          }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="absolute top-6 right-6">
           <motion.div
             variants={{
               rest: { opacity: 0, scale: 0.8 },
               hover: { opacity: 1, scale: 1 }
             }}
             className="w-10 h-10 rounded-full bg-[#d4af37] text-black flex items-center justify-center"
           >
             <Plus className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-2 block">{item.category}</span>
          <motion.h3 
            className="font-heading text-2xl md:text-3xl font-medium text-white mb-2"
            variants={{
              rest: { y: 0 },
              hover: { y: -5 }
            }}
            transition={{ duration: 0.4 }}
          >
            {item.title}
          </motion.h3>
          <motion.div
             className="h-px bg-[#d4af37] w-0 group-hover:w-full transition-all duration-500 mb-3"
          />
          <motion.p 
            className="text-sm text-gray-300 line-clamp-2 font-light"
            variants={{
              rest: { opacity: 0.7 },
              hover: { opacity: 1 }
            }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
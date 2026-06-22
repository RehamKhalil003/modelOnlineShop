'use client';
import { motion } from 'framer-motion';

interface MarqueeProps { items: string[]; speed?: number; className?: string; reverse?: boolean; }

export default function Marquee({ items, speed = 30, className = '', reverse = false }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-[10px] tracking-[0.35em] uppercase font-medium mx-4"
            style={{ color: 'rgba(124,58,237,0.55)' }}>
            {item}
            <span className="mx-4" style={{ color: 'rgba(236,72,153,0.45)' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

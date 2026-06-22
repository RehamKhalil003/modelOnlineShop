'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });
  const trailX = useSpring(cursorX, { stiffness: 100, damping: 25 });
  const trailY = useSpring(cursorY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); setVisible(true); };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!(el.closest('a') || el.closest('button') || el.closest('[data-cursor]')));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 1.8 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            width: hovered ? 16 : 9,
            height: hovered ? 16 : 9,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
            boxShadow: hovered ? '0 0 16px rgba(124,58,237,0.6), 0 0 8px rgba(236,72,153,0.4)' : '0 0 8px rgba(124,58,237,0.5)',
            transition: 'width 0.2s, height 0.2s',
          }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          border: '1.5px solid rgba(139,92,246,0.4)',
        }}
        animate={{ scale: hovered ? 1.5 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}

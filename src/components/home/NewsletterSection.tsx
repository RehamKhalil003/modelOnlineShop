'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-28 my-12">
      {/* Deep violet background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(145deg,#0D0118 0%,#1A0533 40%,#2D0F5E 80%,#0D0118 100%)' }} />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute rounded-full"
          style={{ width: 500, height: 500, top: '-20%', left: '-10%',
            background: 'radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 65%)' }} />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute rounded-full"
          style={{ width: 600, height: 600, bottom: '-25%', right: '-10%',
            background: 'radial-gradient(circle,rgba(236,72,153,0.15) 0%,transparent 65%)' }} />

        {/* Top/bottom gradient lines */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right,transparent,rgba(139,92,246,0.4),rgba(236,72,153,0.3),transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right,transparent,rgba(139,92,246,0.3),rgba(236,72,153,0.2),transparent)' }} />
      </div>

      <div className="relative max-w-[600px] mx-auto px-6 text-center">
        <FadeIn>
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right,transparent,rgba(196,181,253,0.5))' }} />
            <Sparkles size={12} style={{ color: '#F472B6' }} />
            <p className="text-[10px] tracking-[0.45em] uppercase font-semibold"
              style={{ color: 'rgba(249,168,212,0.8)' }}>Exclusive Access</p>
            <Sparkles size={12} style={{ color: '#F472B6' }} />
            <div className="h-px w-10" style={{ background: 'linear-gradient(to left,transparent,rgba(196,181,253,0.5))' }} />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight">
            <span style={{
              background: 'linear-gradient(135deg,#F5F3FF 0%,#C4B5FD 40%,#F9A8D4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Join the<br />Inner Circle
            </span>
          </h2>

          <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(196,181,253,0.6)' }}>
            Be the first to discover new collections, private sales, and exclusive MODEL events. The finest fashion, delivered to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
                <Check size={18} className="text-white" />
              </div>
              <p className="tracking-widest text-sm text-white">Welcome to the circle.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 8px 40px rgba(124,58,237,0.25), 0 0 0 1px rgba(139,92,246,0.2)' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 text-sm px-6 py-4 outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#F5F3FF',
                }}
                required
              />
              <button type="submit"
                className="shrink-0 px-6 flex items-center justify-center text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          <p className="text-xs mt-4" style={{ color: 'rgba(139,92,246,0.4)' }}>
            No spam. Unsubscribe at any time.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

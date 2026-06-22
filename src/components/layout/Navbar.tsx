'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

const navLinks = [
  { label: 'Women', href: '/products?category=women' },
  { label: 'Men', href: '/products?category=men' },
  { label: 'Shoes', href: '/products?category=shoes' },
  { label: 'Accessories', href: '/products?category=accessories' },
  { label: 'Sport', href: '/products?category=sportswear' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [atHero, setAtHero] = useState(isHomePage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const toggleCart = useCartStore((s) => s.toggleCart);

  useEffect(() => {
    // On non-home pages, never show transparent dark mode
    if (!isHomePage) { setAtHero(false); setScrolled(true); return; }
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setAtHero(window.scrollY < window.innerHeight * 0.7);
    };
    // Set initial state from current scroll position
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  const isDark = atHero && isHomePage;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background: 'rgba(250,245,255,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(139,92,246,0.1)',
          boxShadow: '0 4px 24px rgba(124,58,237,0.06)',
        } : { background: 'transparent' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-xl tracking-[0.5em] uppercase font-bold"
            style={isDark
              ? { color: '#F5F3FF' }
              : { background: 'linear-gradient(135deg,#7C3AED,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
            }>
            MODEL
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="text-[11px] tracking-widest uppercase font-medium relative group transition-colors"
                style={{ color: isDark ? 'rgba(245,243,255,0.75)' : 'var(--v-600)' }}>
                <span className="group-hover:opacity-100 transition-opacity"
                  style={{ color: isDark ? '#F5F3FF' : 'var(--v-500)' }}>
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: 'linear-gradient(to right,#7C3AED,#EC4899)' }} />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="transition-all hover:scale-110"
              style={{ color: isDark ? 'rgba(245,243,255,0.75)' : 'var(--v-500)' }}>
              <Search size={18} />
            </button>
            <Link href="/auth/login" className="hidden sm:block transition-all hover:scale-110"
              style={{ color: isDark ? 'rgba(245,243,255,0.75)' : 'var(--v-500)' }}>
              <User size={18} />
            </Link>
            <Link href="/wishlist" className="relative transition-all hover:scale-110"
              style={{ color: isDark ? 'rgba(245,243,255,0.75)' : 'var(--v-500)' }}>
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={toggleCart} className="relative transition-all hover:scale-110"
              style={{ color: isDark ? 'rgba(245,243,255,0.75)' : 'var(--v-500)' }}>
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <motion.span key={cartCount} initial={{ scale: 1.6 }} animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden transition-all"
              style={{ color: isDark ? 'rgba(245,243,255,0.75)' : 'var(--v-500)' }}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ borderTop: '1px solid rgba(139,92,246,0.12)', overflow: 'hidden' }}>
              <div className="max-w-[1400px] mx-auto px-6 py-4">
                <input autoFocus placeholder="Search MODEL collections..."
                  className="w-full bg-transparent text-sm tracking-wider outline-none pb-2"
                  style={{ color: 'var(--text-dark)', borderBottom: '2px solid transparent', backgroundImage: 'linear-gradient(var(--bg-page),var(--bg-page)),linear-gradient(135deg,#7C3AED,#EC4899)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box,border-box' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg,#0D0118 0%,#1A0533 50%,#2D0F5E 100%)' }} />
            {/* Orbs */}
            <div className="orb w-96 h-96 -top-20 -right-20" style={{ background: 'rgba(124,58,237,0.25)' }} />
            <div className="orb w-80 h-80 -bottom-10 -left-10" style={{ background: 'rgba(236,72,153,0.2)' }} />

            <div className="relative flex items-center justify-between px-6 h-16">
              <span className="text-xl tracking-[0.5em] uppercase font-bold text-white">MODEL</span>
              <button onClick={() => setMenuOpen(false)} style={{ color: 'rgba(196,181,253,0.8)' }}><X size={24} /></button>
            </div>

            <div className="relative flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}
                    className="text-4xl font-light tracking-wider transition-all"
                    style={{ color: 'rgba(196,181,253,0.7)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F3FF')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(196,181,253,0.7)')}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

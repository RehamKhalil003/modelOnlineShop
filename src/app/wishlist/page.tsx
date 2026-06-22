'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem, toggleCart } = useCartStore();

  const handleMoveToCart = (product: (typeof items)[0]) => {
    addItem(product, product.colors[0], product.sizes[0]);
    removeItem(product.id);
    toggleCart();
  };

  return (
    <div className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#0D0118 0%,#1A0533 50%,#2D0F5E 100%)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
        <div className="absolute -top-10 right-10 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.18) 0%,transparent 65%)' }} />
        <div className="max-w-[1400px] mx-auto px-6 py-14 relative">
          <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-2" style={{ color: 'rgba(249,168,212,0.7)' }}>Saved</p>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <Heart size={28} style={{ color: '#F472B6' }} />
            <span style={{ background: 'linear-gradient(135deg,#F5F3FF,#F9A8D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Wishlist ({items.length})
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {items.length === 0 ? (
          <FadeIn className="text-center py-24">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg,rgba(236,72,153,0.08),rgba(124,58,237,0.06))' }}>
              <Heart size={40} style={{ color: 'rgba(236,72,153,0.3)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Your wishlist is empty</h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(139,92,246,0.55)' }}>Save items you love for later</p>
            <Link href="/products"><Button variant="primary">Explore Collection</Button></Link>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {items.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.06 }}
                className="group relative">
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden mb-3 rounded-2xl"
                    style={{ background: 'linear-gradient(145deg,#F5F3FF,#FCE7F3)', boxShadow: '0 4px 20px rgba(124,58,237,0.07)' }}>
                    <Image src={product.images[0]} alt={product.name} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button onClick={(e) => { e.preventDefault(); removeItem(product.id); }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
                      <X size={13} style={{ color: '#EC4899' }} />
                    </button>
                  </div>
                  <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: 'var(--v-400)' }}>{product.brand}</p>
                  <h3 className="text-sm truncate mt-1 font-medium" style={{ color: 'var(--text-dark)' }}>{product.name}</h3>
                  <p className="text-sm mt-1 font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(product.price)}</p>
                </Link>
                <button onClick={() => handleMoveToCart(product)}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-[10px] tracking-widest uppercase rounded-xl transition-all"
                  style={{ border: '1px solid rgba(139,92,246,0.18)', color: 'var(--v-500)', background: 'transparent' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'linear-gradient(135deg,#7C3AED,#EC4899)';
                    el.style.color = 'white';
                    el.style.border = '1px solid transparent';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'transparent';
                    el.style.color = 'var(--v-500)';
                    el.style.border = '1px solid rgba(139,92,246,0.18)';
                  }}>
                  <ShoppingBag size={11} />
                  Move to Bag
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

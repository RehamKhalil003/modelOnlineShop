'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.colors[0], product.sizes[0]);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => { setHovered(true); setImgIndex(1); }}
      onMouseLeave={() => { setHovered(false); setImgIndex(0); }}
      className="group relative"
    >
      <Link href={`/products/${product.id}`}>
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-2xl aspect-[3/4]"
          style={{
            background: 'linear-gradient(145deg,#F5F3FF,#FCE7F3)',
            boxShadow: hovered
              ? '0 20px 60px rgba(124,58,237,0.18), 0 4px 16px rgba(236,72,153,0.1)'
              : '0 4px 20px rgba(124,58,237,0.07)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[imgIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top,rgba(45,15,94,0.2) 0%,transparent 60%)' }}
          />

          {/* Badges top-left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
                New
              </span>
            )}
            {product.discount && (
              <span className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full font-bold"
                style={{ background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.3)', color: '#BE185D' }}>
                −{product.discount}%
              </span>
            )}
            {product.isBestSeller && (
              <span className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full font-bold"
                style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#6D28D9' }}>
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist button top-right */}
          <motion.button
            onClick={handleWishlist}
            animate={{ opacity: hovered || wishlisted ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            whileTap={{ scale: 0.85 }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: wishlisted
                ? 'linear-gradient(135deg,#EC4899,#7C3AED)'
                : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(124,58,237,0.15)',
            }}
          >
            <Heart size={15}
              style={wishlisted ? { fill: 'white', color: 'white' } : { color: '#7C3AED' }} />
          </motion.button>

          {/* Add to cart — slides up on hover */}
          <motion.div
            animate={{ y: hovered ? 0 : '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-0 left-0 right-0 p-3"
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] uppercase py-3 font-bold text-white rounded-xl transition-all"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)', boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <ShoppingBag size={13} />
              Add to Bag
            </button>
          </motion.div>
        </div>

        {/* Product info */}
        <div className="pt-4 pb-2 px-1">
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-1"
            style={{ color: 'var(--v-400)' }}>{product.brand}</p>
          <h3 className="text-sm font-semibold tracking-wide mb-2 truncate"
            style={{ color: 'var(--text-dark)' }}>{product.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs line-through" style={{ color: 'rgba(139,92,246,0.4)' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating} size={10} />
              <span className="text-[10px]" style={{ color: 'rgba(139,92,246,0.5)' }}>({product.reviews})</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

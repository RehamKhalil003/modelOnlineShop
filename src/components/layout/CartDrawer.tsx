'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, total, count } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[70]"
            style={{ background: 'rgba(13,1,24,0.6)', backdropFilter: 'blur(8px)' }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-[80] flex flex-col"
            style={{
              background: 'rgba(250,245,255,0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(139,92,246,0.12)',
              boxShadow: '-8px 0 60px rgba(124,58,237,0.12)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={16} style={{ color: '#7C3AED' }} />
                <span className="text-sm tracking-[0.2em] uppercase font-semibold" style={{ color: 'var(--text-dark)' }}>
                  Your Bag
                </span>
                {count() > 0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
                    {count()}
                  </span>
                )}
              </div>
              <button onClick={toggleCart} style={{ color: 'rgba(139,92,246,0.5)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-dark)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.5)')}>
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.1),rgba(236,72,153,0.08))' }}>
                    <ShoppingBag size={32} style={{ color: 'rgba(124,58,237,0.3)' }} />
                  </div>
                  <p className="text-sm tracking-wide font-medium" style={{ color: 'var(--v-500)' }}>Your bag is empty</p>
                  <button onClick={toggleCart}>
                    <Link href="/products">
                      <Button variant="outline" size="sm">Continue Shopping</Button>
                    </Link>
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-3 rounded-2xl"
                    style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.08)' }}
                  >
                    <div className="relative w-18 h-22 flex-shrink-0 overflow-hidden rounded-xl"
                      style={{ width: 72, height: 88, background: 'linear-gradient(145deg,#F5F3FF,#FCE7F3)' }}>
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: 'var(--v-400)' }}>{item.product.brand}</p>
                      <p className="text-sm truncate font-medium mt-0.5" style={{ color: 'var(--text-dark)' }}>{item.product.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(139,92,246,0.5)' }}>{item.selectedColor} · {item.selectedSize}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center rounded-full overflow-hidden"
                          style={{ border: '1px solid rgba(139,92,246,0.2)' }}>
                          <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center transition-colors"
                            style={{ color: 'rgba(139,92,246,0.6)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#7C3AED')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.6)')}>
                            <Minus size={10} />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold" style={{ color: 'var(--text-dark)' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center transition-colors"
                            style={{ color: 'rgba(139,92,246,0.6)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#7C3AED')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.6)')}>
                            <Plus size={10} />
                          </button>
                        </div>
                        <p className="text-sm font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                      className="self-start mt-1 transition-colors" style={{ color: 'rgba(139,92,246,0.35)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#EC4899')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.35)')}>
                      <X size={13} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 space-y-4"
                style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
                <div className="flex justify-between">
                  <span className="text-sm tracking-wide" style={{ color: 'var(--text-dark)' }}>Subtotal</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(total())}</span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(139,92,246,0.45)' }}>Shipping & taxes calculated at checkout</p>
                <Link href="/checkout" onClick={toggleCart}>
                  <Button variant="primary" className="w-full">Proceed to Checkout</Button>
                </Link>
                <Link href="/cart" onClick={toggleCart}
                  className="block text-center text-[10px] tracking-widest uppercase transition-colors"
                  style={{ color: 'rgba(124,58,237,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--v-600)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(124,58,237,0.5)')}>
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

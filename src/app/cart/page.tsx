'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCartStore();
  const subtotal = total();
  const shipping = subtotal > 1875 ? 0 : 170;
  const tax = subtotal * 0.08;

  return (
    <div className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#0D0118 0%,#1A0533 50%,#2D0F5E 100%)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-20 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.15) 0%,transparent 65%)' }} />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 py-14 relative">
          <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-2" style={{ color: 'rgba(249,168,212,0.7)' }}>Review</p>
          <h1 className="text-4xl font-bold tracking-tight">
            <span style={{ background: 'linear-gradient(135deg,#F5F3FF,#C4B5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Your Bag ({count()})
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {items.length === 0 ? (
          <FadeIn className="text-center py-24">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.08),rgba(236,72,153,0.06))' }}>
              <ShoppingBag size={40} style={{ color: 'rgba(124,58,237,0.3)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Your bag is empty</h2>
            <Link href="/products"><Button variant="primary">Continue Shopping</Button></Link>
          </FadeIn>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-5">
              {items.map((item) => (
                <motion.div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex gap-5 pb-5 rounded-2xl p-4"
                  style={{ background: 'white', border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 2px 12px rgba(124,58,237,0.04)' }}>
                  <Link href={`/products/${item.product.id}`}
                    className="relative w-24 h-32 shrink-0 rounded-xl overflow-hidden"
                    style={{ background: 'linear-gradient(145deg,#F5F3FF,#FCE7F3)' }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: 'var(--v-400)' }}>{item.product.brand}</p>
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="text-sm mt-1 font-semibold transition-opacity hover:opacity-70" style={{ color: 'var(--text-dark)' }}>{item.product.name}</h3>
                        </Link>
                        <p className="text-xs mt-1" style={{ color: 'rgba(139,92,246,0.5)' }}>{item.selectedColor} · Size {item.selectedSize}</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                        style={{ color: 'rgba(139,92,246,0.35)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#EC4899')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.35)')}>
                        <X size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center rounded-full overflow-hidden"
                        style={{ border: '1px solid rgba(139,92,246,0.18)' }}>
                        <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center" style={{ color: 'rgba(139,92,246,0.55)' }}>
                          <Minus size={10} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center" style={{ color: 'rgba(139,92,246,0.55)' }}>
                          <Plus size={10} />
                        </button>
                      </div>
                      <p className="text-sm font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <FadeIn direction="left" className="lg:sticky lg:top-24 h-fit">
              <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid rgba(139,92,246,0.1)', boxShadow: '0 8px 32px rgba(124,58,237,0.08)' }}>
                <div className="h-[3px] w-10 mb-6 rounded-full" style={{ background: 'linear-gradient(to right,#7C3AED,#EC4899)' }} />
                <h2 className="text-sm tracking-widest uppercase font-semibold mb-6" style={{ color: 'var(--text-dark)' }}>Order Summary</h2>
                <div className="space-y-3 mb-6">
                  {[['Subtotal', formatPrice(subtotal)], ['Shipping', shipping === 0 ? 'Free' : formatPrice(shipping)], ['Tax', formatPrice(tax)]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span style={{ color: 'rgba(139,92,246,0.55)' }}>{k}</span>
                      <span style={{ color: 'var(--text-dark)' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold pt-4 mb-6"
                  style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
                  <span style={{ color: 'var(--text-dark)' }}>Total</span>
                  <span className="text-lg" style={{ color: 'var(--v-600)' }}>{formatPrice(subtotal + shipping + tax)}</span>
                </div>
                <div className="flex mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.15)' }}>
                  <input placeholder="Promo code" className="flex-1 text-xs px-4 py-3 outline-none bg-transparent"
                    style={{ color: 'var(--text-dark)' }} />
                  <button className="text-[10px] tracking-widest uppercase px-4 font-semibold transition-all"
                    style={{ background: 'rgba(139,92,246,0.07)', color: 'var(--v-500)', borderLeft: '1px solid rgba(139,92,246,0.15)' }}>
                    Apply
                  </button>
                </div>
                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full">
                    Checkout <ArrowRight size={13} className="ml-2" />
                  </Button>
                </Link>
                {shipping > 0 && (
                  <p className="text-xs text-center mt-3" style={{ color: 'rgba(139,92,246,0.5)' }}>
                    Add {formatPrice(1875 - subtotal)} more for free shipping
                  </p>
                )}
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}

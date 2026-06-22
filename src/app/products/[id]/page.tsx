'use client';
import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Check, Truck, RefreshCcw, Shield } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import ProductCard from '@/components/products/ProductCard';
import FadeIn from '@/components/animations/FadeIn';

const reviews = [
  { id: '1', user: 'Alexandra M.', rating: 5, comment: 'Absolutely stunning quality. Worth every penny — this piece elevated my entire wardrobe.', date: '2 weeks ago' },
  { id: '2', user: 'Sophie L.', rating: 5, comment: 'Exceptional craftsmanship. The attention to detail is remarkable.', date: '1 month ago' },
  { id: '3', user: 'Isabella R.', rating: 4, comment: 'Beautiful piece, runs slightly small. Sizing up was the right call.', date: '1 month ago' },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [imgIndex, setImgIndex] = useState(0);
  const [color, setColor] = useState(product?.colors[0] || '');
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, toggleCart } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--v-400)' }}>Product not found</div>
  );

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!size) return;
    for (let i = 0; i < qty; i++) addItem(product, color, size);
    setAdded(true);
    setTimeout(() => { setAdded(false); toggleCart(); }, 1200);
  };

  return (
    <div className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image gallery */}
          <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)}
                  className="relative aspect-square overflow-hidden rounded-xl transition-all"
                  style={{
                    border: i === imgIndex ? '2px solid #7C3AED' : '1px solid rgba(139,92,246,0.15)',
                    opacity: i === imgIndex ? 1 : 0.55,
                  }}>
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-3xl"
              style={{ background: 'linear-gradient(145deg,#F5F3FF,#FCE7F3)' }}>
              <AnimatePresence mode="wait">
                <motion.div key={imgIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                  <Image src={product.images[imgIndex]} alt={product.name} fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw" />
                </motion.div>
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setImgIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: 'rgba(250,245,255,0.85)', backdropFilter: 'blur(8px)' }}>
                    <ChevronLeft size={18} style={{ color: '#7C3AED' }} />
                  </button>
                  <button onClick={() => setImgIndex((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: 'rgba(250,245,255,0.85)', backdropFilter: 'blur(8px)' }}>
                    <ChevronRight size={18} style={{ color: '#7C3AED' }} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <FadeIn direction="right" className="lg:py-4">
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-2" style={{ color: 'var(--v-400)' }}>{product.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-dark)' }}>{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={product.rating} />
              <span className="text-sm" style={{ color: 'rgba(139,92,246,0.5)' }}>{product.reviews} reviews</span>
            </div>

            <div className="flex items-baseline gap-3 mb-7">
              <span className="text-2xl font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="line-through text-sm" style={{ color: 'rgba(139,92,246,0.4)' }}>{formatPrice(product.originalPrice)}</span>}
              {product.discount && <span className="text-sm font-semibold" style={{ color: '#EC4899' }}>−{product.discount}%</span>}
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(26,5,51,0.6)' }}>{product.description}</p>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase font-semibold mb-3" style={{ color: 'rgba(139,92,246,0.6)' }}>
                Color: <span style={{ color: 'var(--text-dark)' }}>{color}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)}
                    className="px-3 py-1.5 text-xs rounded-full transition-all"
                    style={color === c
                      ? { background: 'linear-gradient(135deg,#7C3AED,#EC4899)', color: 'white', border: 'none' }
                      : { border: '1px solid rgba(139,92,246,0.2)', color: 'var(--v-600)' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className="text-[10px] tracking-widest uppercase font-semibold mb-3" style={{ color: 'rgba(139,92,246,0.6)' }}>
                Size {!size && <span style={{ color: '#EC4899' }}>— select a size</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className="min-w-[44px] h-11 px-3 text-sm rounded-xl transition-all"
                    style={size === s
                      ? { background: 'linear-gradient(135deg,#7C3AED,#EC4899)', color: 'white', border: 'none', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }
                      : { border: '1px solid rgba(139,92,246,0.15)', color: 'var(--v-600)' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(139,92,246,0.18)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-12 flex items-center justify-center text-lg transition-colors"
                  style={{ color: 'rgba(139,92,246,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7C3AED')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.5)')}>
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  className="w-11 h-12 flex items-center justify-center text-lg transition-colors"
                  style={{ color: 'rgba(139,92,246,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7C3AED')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.5)')}>
                  +
                </button>
              </div>

              <Button variant="primary" size="lg" className="flex-1" onClick={handleAddToCart} disabled={!size}>
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <Check size={15} /> Added!
                    </motion.span>
                  ) : (
                    <motion.span key="add" className="flex items-center gap-2">
                      <ShoppingBag size={15} /> Add to Bag
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              <Button variant="outline" size="lg" className="w-12 px-0 shrink-0" onClick={() => toggle(product)}>
                <Heart size={15} style={wishlisted ? { fill: '#EC4899', color: '#EC4899' } : {}} />
              </Button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4 py-6"
              style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
              {[
                { Icon: Truck, label: 'Free Shipping', sub: 'على الطلبات فوق ١٬٨٧٥ ر.س' },
                { Icon: RefreshCcw, label: 'Free Returns', sub: '30-day policy' },
                { Icon: Shield, label: 'Authenticity', sub: '100% guaranteed' },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={17} style={{ color: '#7C3AED' }} />
                  <p className="text-xs font-medium" style={{ color: 'var(--text-dark)' }}>{label}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(139,92,246,0.5)' }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="pt-6" style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
              <p className="text-[10px] tracking-widest uppercase font-semibold mb-4" style={{ color: 'rgba(139,92,246,0.5)' }}>Specifications</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs" style={{ color: 'rgba(139,92,246,0.5)' }}>{k}</dt>
                    <dd className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-dark)' }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </div>

        {/* Reviews */}
        <div className="mt-20 pt-12" style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>Customer Reviews</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <FadeIn key={r.id} delay={i * 0.1}>
                <div className="p-6 rounded-2xl"
                  style={{ background: 'white', border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 4px 20px rgba(124,58,237,0.05)' }}>
                  <StarRating rating={r.rating} className="mb-3" />
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(26,5,51,0.6)' }}>&ldquo;{r.comment}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-dark)' }}>{r.user}</p>
                    <p className="text-xs" style={{ color: 'rgba(139,92,246,0.4)' }}>{r.date}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 pt-12" style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-dark)' }}>You May Also Like</h2>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

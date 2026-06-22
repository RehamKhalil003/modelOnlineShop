'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Smartphone, Banknote, ChevronRight, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'white',
  border: '1px solid rgba(139,92,246,0.15)',
  color: 'var(--text-dark)',
  padding: '14px 16px',
  fontSize: '14px',
  outline: 'none',
  borderRadius: '12px',
};

const steps = ['Information', 'Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [address, setAddress] = useState({ street: '', city: '', country: 'United States', zip: '' });
  const [payment, setPayment] = useState('card');
  const [done, setDone] = useState(false);
  const [orderId] = useState(() => Math.floor(Math.random() * 90000 + 10000));
  const { items, total, clearCart } = useCartStore();
  const subtotal = total();
  const shipping = subtotal > 1875 ? 0 : 170;

  const handleConfirm = () => { setDone(true); clearCart(); };

  if (done) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-6" style={{ background: 'var(--bg-page)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)', boxShadow: '0 8px 40px rgba(124,58,237,0.3)' }}>
            <Check size={34} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>Order Confirmed!</h1>
          <p className="text-sm mb-2" style={{ color: 'rgba(139,92,246,0.6)' }}>Order #MD-{orderId}</p>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(26,5,51,0.55)' }}>
            Thank you for shopping with MODEL. You&apos;ll receive a confirmation email with tracking details within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm mb-8" style={{ color: 'rgba(139,92,246,0.55)' }}>
            <Package size={15} /><span>Estimated delivery: 3–5 business days</span>
          </div>
          <Link href="/products"><Button variant="primary" size="lg">Continue Shopping</Button></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Progress steps */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all font-semibold"
                  style={i < step
                    ? { background: 'linear-gradient(135deg,#7C3AED,#EC4899)', color: 'white', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }
                    : i === step
                    ? { border: '2px solid #7C3AED', color: '#7C3AED', background: 'rgba(124,58,237,0.06)' }
                    : { border: '1px solid rgba(139,92,246,0.2)', color: 'rgba(139,92,246,0.4)' }}>
                  {i < step ? <Check size={13} /> : i + 1}
                </div>
                <span className="text-[10px] tracking-wider uppercase hidden sm:block font-semibold"
                  style={{ color: i === step ? 'var(--v-600)' : 'rgba(139,92,246,0.4)' }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-12 sm:w-20 h-0.5 mx-2 rounded-full" style={{
                  background: i < step ? 'linear-gradient(to right,#7C3AED,#EC4899)' : 'rgba(139,92,246,0.1)',
                }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-dark)' }}>Customer Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {[['First Name', 'firstName'], ['Last Name', 'lastName']].map(([l, k]) => (
                      <div key={k}>
                        <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>{l}</label>
                        <input style={inputStyle} value={(info as any)[k]} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} />
                      </div>
                    ))}
                  </div>
                  {[['Email Address', 'email', 'email'], ['Phone Number', 'phone', 'tel']].map(([l, k, t]) => (
                    <div key={k} className="mb-4">
                      <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>{l}</label>
                      <input type={t} style={inputStyle} value={(info as any)[k]} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} />
                    </div>
                  ))}
                  <Button variant="primary" size="lg" onClick={() => setStep(1)} className="mt-4">
                    Continue to Shipping <ChevronRight size={13} className="ml-1" />
                  </Button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-dark)' }}>Shipping Address</h2>
                  {[['Street Address', 'street'], ['City', 'city'], ['ZIP Code', 'zip']].map(([l, k]) => (
                    <div key={k} className="mb-4">
                      <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>{l}</label>
                      <input style={inputStyle} value={(address as any)[k]} onChange={(e) => setAddress({ ...address, [k]: e.target.value })} />
                    </div>
                  ))}
                  <div className="mb-4">
                    <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>Country</label>
                    <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className="w-full text-sm px-4 py-3.5 outline-none rounded-xl"
                      style={{ background: 'white', border: '1px solid rgba(139,92,246,0.15)', color: 'var(--text-dark)' }}>
                      {['United States', 'United Kingdom', 'France', 'Germany', 'UAE', 'Saudi Arabia'].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" size="lg" onClick={() => setStep(0)}>Back</Button>
                    <Button variant="primary" size="lg" onClick={() => setStep(2)}>Continue to Payment <ChevronRight size={13} className="ml-1" /></Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-dark)' }}>Payment Method</h2>
                  <div className="space-y-3 mb-8">
                    {[
                      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
                      { id: 'apple', icon: Smartphone, label: 'Apple Pay', sub: 'Touch or Face ID' },
                      { id: 'cod', icon: Banknote, label: 'Cash on Delivery', sub: 'Pay when you receive' },
                    ].map(({ id, icon: Icon, label, sub }) => (
                      <button key={id} onClick={() => setPayment(id)}
                        className="w-full flex items-center gap-4 p-4 text-left transition-all rounded-2xl"
                        style={payment === id
                          ? { border: '2px solid rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.04)' }
                          : { border: '1px solid rgba(139,92,246,0.12)', background: 'white' }}>
                        <Icon size={19} style={{ color: payment === id ? '#7C3AED' : 'rgba(139,92,246,0.5)' }} />
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>{label}</p>
                          <p className="text-xs" style={{ color: 'rgba(139,92,246,0.5)' }}>{sub}</p>
                        </div>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={payment === id
                            ? { background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }
                            : { border: '1px solid rgba(139,92,246,0.2)' }}>
                          {payment === id && <Check size={10} className="text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  {payment === 'card' && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>Card Number</label>
                        <input placeholder="4242 4242 4242 4242" style={inputStyle} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[['Expiry', 'MM / YY'], ['CVV', '•••']].map(([l, p]) => (
                          <div key={l}>
                            <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>{l}</label>
                            <input placeholder={p} style={inputStyle} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                    <Button variant="primary" size="lg" onClick={() => setStep(3)}>Review Order <ChevronRight size={13} className="ml-1" /></Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-2xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-dark)' }}>Review Order</h2>
                  <div className="space-y-3 mb-8 p-5 rounded-2xl"
                    style={{ background: 'white', border: '1px solid rgba(139,92,246,0.1)' }}>
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="flex items-center gap-4 py-2"
                        style={{ borderBottom: '1px solid rgba(139,92,246,0.06)' }}>
                        <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text-dark)' }}>{item.product.name}</span>
                        <span className="text-xs" style={{ color: 'rgba(139,92,246,0.5)' }}>{item.selectedColor} · {item.selectedSize} · ×{item.quantity}</span>
                        <span className="text-sm font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={() => setStep(2)}>Back</Button>
                    <Button variant="primary" size="lg" onClick={handleConfirm}>Place Order</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar summary */}
          <div className="p-6 rounded-2xl h-fit"
            style={{ background: 'white', border: '1px solid rgba(139,92,246,0.1)', boxShadow: '0 8px 32px rgba(124,58,237,0.06)' }}>
            <div className="h-[3px] w-10 mb-5 rounded-full" style={{ background: 'linear-gradient(to right,#7C3AED,#EC4899)' }} />
            <h3 className="text-sm tracking-widest uppercase font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'rgba(139,92,246,0.55)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-dark)' }}>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgba(139,92,246,0.55)' }}>Shipping</span>
                <span style={{ color: 'var(--text-dark)' }}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold pt-3 mt-1"
                style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
                <span style={{ color: 'var(--text-dark)' }}>Total</span>
                <span style={{ color: 'var(--v-600)' }}>{formatPrice(subtotal + shipping)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

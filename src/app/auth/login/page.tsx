'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });

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

  return (
    <div className="min-h-screen pt-16 flex" style={{ background: 'var(--bg-page)' }}>
      {/* Left image panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=80)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,rgba(109,40,217,0.75) 0%,rgba(236,72,153,0.4) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[60%] h-[50%]"
            style={{ background: 'radial-gradient(ellipse at 20% 90%,rgba(124,58,237,0.3) 0%,transparent 60%)' }} />
        </div>
        <div className="relative z-10 flex flex-col justify-end p-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right,rgba(249,168,212,0.7),transparent)' }} />
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold" style={{ color: 'rgba(249,168,212,0.8)' }}>Welcome back</p>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white">
            Premium fashion<br />awaits you.
          </h2>
          <p className="mt-4 text-sm" style={{ color: 'rgba(196,181,253,0.7)' }}>
            Sign in to access your MODEL account.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={12} style={{ color: '#F472B6' }} />
              <p className="text-[10px] tracking-[0.4em] uppercase font-semibold" style={{ color: 'var(--v-400)' }}>MODEL</p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-dark)' }}>Sign In</h1>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>Email</label>
              <input type="email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase mb-2 font-semibold" style={{ color: 'rgba(139,92,246,0.6)' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} style={{ ...inputStyle, paddingRight: 48 }}
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(139,92,246,0.5)' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4" style={{ accentColor: '#7C3AED' }} />
                <span className="text-xs" style={{ color: 'rgba(139,92,246,0.6)' }}>Remember me</span>
              </label>
              <Link href="#" className="text-xs transition-colors" style={{ color: 'var(--v-500)' }}>
                Forgot password?
              </Link>
            </div>
            <Button variant="primary" size="lg" className="w-full">Sign In</Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.1)' }} />
            <span className="text-xs" style={{ color: 'rgba(139,92,246,0.45)' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.1)' }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Apple'].map((p) => (
              <button key={p} className="flex items-center justify-center gap-2 py-3 text-sm rounded-xl transition-all"
                style={{ border: '1px solid rgba(139,92,246,0.15)', color: 'var(--v-600)', background: 'white' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.05)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}>
                {p}
              </button>
            ))}
          </div>

          <p className="text-center text-sm mt-8" style={{ color: 'rgba(139,92,246,0.55)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold transition-colors" style={{ color: 'var(--v-500)' }}>
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

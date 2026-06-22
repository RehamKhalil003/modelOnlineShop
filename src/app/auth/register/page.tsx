'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3">Join MODEL</p>
          <h1 className="text-3xl font-extralight text-white">Create Account</h1>
        </div>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {[['Full Name', 'name', 'text'], ['Email Address', 'email', 'email'], ['Password', 'password', 'password'], ['Confirm Password', 'confirm', 'password']].map(([label, key, type]) => (
            <div key={key}>
              <label className="block text-[10px] tracking-widest uppercase text-neutral-400 mb-2">{label}</label>
              <input type={type} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3.5 text-sm outline-none focus:border-white/40 transition-colors" />
            </div>
          ))}
          <Button variant="secondary" size="lg" className="w-full">Create Account</Button>
        </form>
        <p className="text-center text-neutral-500 text-sm mt-8">
          Already have an account? <Link href="/auth/login" className="text-white hover:text-neutral-300">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

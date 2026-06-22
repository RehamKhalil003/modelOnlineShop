'use client';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const border = '1px solid rgba(139,92,246,0.08)';

const stats = [
  { label: 'Total Revenue', value: '١٬٠٦٨٬٤٥٠ ر.س', change: '+12.5%', up: true, icon: TrendingUp },
  { label: 'Total Orders', value: '1,284', change: '+8.2%', up: true, icon: ShoppingBag },
  { label: 'Customers', value: '4,891', change: '+18.3%', up: true, icon: Users },
  { label: 'Products', value: '156', change: '-2.1%', up: false, icon: Package },
];

const recentOrders = [
  { id: 'MD-48291', customer: 'Alexandra M.', product: 'Silk Evening Gown', amount: 2850, status: 'delivered' },
  { id: 'MD-48290', customer: 'Sophie T.', product: 'Tailored Wool Suit', amount: 4500, status: 'shipped' },
  { id: 'MD-48289', customer: 'Isabella R.', product: 'Cashmere Overcoat', amount: 3200, status: 'processing' },
  { id: 'MD-48288', customer: 'Camille L.', product: 'Diamond Bracelet', amount: 8900, status: 'pending' },
  { id: 'MD-48287', customer: 'Elena V.', product: 'Cropped Blazer', amount: 1650, status: 'delivered' },
];

const statusStyle: Record<string, { color: string; background: string }> = {
  delivered:  { color: '#7fb89a', background: 'rgba(127,184,154,0.1)' },
  shipped:    { color: '#8898d4', background: 'rgba(136,152,212,0.1)' },
  processing: { color: '#d4a0bc', background: 'rgba(212,160,188,0.1)' },
  pending:    { color: 'rgba(139,92,246,0.55)',     background: 'rgba(154,114,176,0.1)' },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <FadeIn className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right,#7C3AED,transparent)' }} />
            <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(139,92,246,0.55)' }}>Admin</p>
          </div>
          <h1 className="text-3xl font-extralight tracking-wide" style={{ color: 'var(--text-dark)' }}>Dashboard</h1>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <motion.div whileHover={{ y: -3 }} className="p-6" style={{ background: 'white', border }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs tracking-wide" style={{ color: 'rgba(139,92,246,0.55)' }}>{stat.label}</p>
                  <stat.icon size={17} style={{ color: 'rgba(154,114,176,0.35)' }} />
                </div>
                <p className="text-2xl font-light mb-2" style={{ color: 'var(--text-dark)' }}>{stat.value}</p>
                <div className="flex items-center gap-1 text-xs"
                  style={{ color: stat.up ? '#7fb89a' : '#c97a9a' }}>
                  {stat.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {stat.change} vs last month
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <FadeIn className="lg:col-span-2">
            <div className="p-6" style={{ background: 'white', border }}>
              <h2 className="text-sm tracking-widest uppercase mb-6" style={{ color: 'var(--text-dark)' }}>Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: border }}>
                      {['Order', 'Customer', 'Product', 'Amount', 'Status'].map((h) => (
                        <th key={h} className="text-left pb-3 pr-4 text-[10px] tracking-widest uppercase" style={{ color: 'rgba(139,92,246,0.55)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="text-sm" style={{ borderBottom: '1px solid rgba(196,176,224,0.05)' }}>
                        <td className="py-3 pr-4 text-xs font-mono" style={{ color: 'var(--v-400)' }}>{order.id}</td>
                        <td className="py-3 pr-4" style={{ color: 'var(--text-dark)' }}>{order.customer}</td>
                        <td className="py-3 pr-4 text-xs max-w-[140px] truncate" style={{ color: 'rgba(139,92,246,0.55)' }}>{order.product}</td>
                        <td className="py-3 pr-4" style={{ color: 'var(--text-dark)' }}>{formatPrice(order.amount)}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase"
                            style={statusStyle[order.status]}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Top Products */}
          <FadeIn delay={0.1}>
            <div className="p-6" style={{ background: 'white', border }}>
              <h2 className="text-sm tracking-widest uppercase mb-6" style={{ color: 'var(--text-dark)' }}>Top Products</h2>
              <div className="space-y-4">
                {products.filter((p) => p.isBestSeller).slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2"
                    style={{ borderBottom: '1px solid rgba(196,176,224,0.05)' }}>
                    <div className="min-w-0 flex-1 mr-3">
                      <p className="text-xs truncate" style={{ color: 'var(--text-dark)' }}>{p.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'rgba(139,92,246,0.55)' }}>{p.reviews} reviews</p>
                    </div>
                    <p className="text-sm shrink-0 font-bold" style={{ color: 'var(--v-600)' }}>{formatPrice(p.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

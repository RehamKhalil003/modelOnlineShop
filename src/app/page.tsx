import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import PromoSection from '@/components/home/PromoSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Marquee from '@/components/animations/Marquee';

const marqueeItems = [
  'New Collection', 'Premium Fashion', 'شحن مجاني فوق ١٬٨٧٥ ر.س',
  'MODEL Exclusive', 'SS 2024', 'Premium Quality', 'Worldwide Delivery',
];

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg-page)' }}>
      <HeroSection />
      <div style={{ background: 'rgba(139,92,246,0.05)', borderTop: '1px solid rgba(139,92,246,0.06)', borderBottom: '1px solid rgba(139,92,246,0.06)' }}>
        <Marquee items={marqueeItems} className="py-3.5" />
      </div>
      <CategoriesSection />
      <FeaturedSection />
      <PromoSection />
      <NewsletterSection />
    </div>
  );
}

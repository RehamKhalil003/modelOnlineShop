import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StarRating({ rating, max = 5, size = 12, className }: { rating: number; max?: number; size?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={size} style={
          i < Math.floor(rating)
            ? { fill: '#EC4899', color: '#EC4899' }
            : i < rating
            ? { fill: 'rgba(236,72,153,0.4)', color: 'rgba(236,72,153,0.4)' }
            : { fill: 'rgba(167,139,250,0.25)', color: 'rgba(167,139,250,0.25)' }
        } />
      ))}
    </div>
  );
}

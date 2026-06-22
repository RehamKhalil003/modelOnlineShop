import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggle: (product: Product) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set({ items: [...get().items, product] }),
      removeItem: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),
      isWishlisted: (productId) => get().items.some((p) => p.id === productId),
      toggle: (product) => {
        if (get().isWishlisted(product.id)) get().removeItem(product.id);
        else get().addItem(product);
      },
    }),
    { name: 'luxe-wishlist' }
  )
);

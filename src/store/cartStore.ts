import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color: string, size: string) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, color, size) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
        );
        if (existing) {
          set({ items: items.map((i) => i === existing ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ items: [...items, { product, quantity: 1, selectedColor: color, selectedSize: size }] });
        }
      },
      removeItem: (productId, color, size) => {
        set({ items: get().items.filter((i) => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size)) });
      },
      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) { get().removeItem(productId, color, size); return; }
        set({ items: get().items.map((i) => i.product.id === productId && i.selectedColor === color && i.selectedSize === size ? { ...i, quantity } : i) });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'luxe-cart' }
  )
);

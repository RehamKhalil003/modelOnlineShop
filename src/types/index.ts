export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  specifications: Record<string, string>;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface WishlistItem {
  product: Product;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  country: string;
  zip: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

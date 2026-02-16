
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  vendorName?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  vendorId: string;
  vendorName: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Page = 'home' | 'menu' | 'cart' | 'checkout' | 'login' | 'register' | 'vendor_dashboard' | 'add_product';

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  badge?: string;
  hot?: boolean;
  timer?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
}

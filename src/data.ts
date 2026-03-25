import { Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Chair Padded Seat',
    price: 100.00,
    oldPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1598191950976-3b78874b827c?q=80&w=600&auto=format&fit=crop',
    category: 'Dining Chair',
    rating: 4,
    reviews: 2,
    description: 'A comfortable padded chair perfect for any modern dining room. Crafted with premium materials for long-lasting durability.',
    badge: '-20%',
    hot: true
  },
  {
    id: 2,
    title: 'Briarwood Decorative 2',
    price: 25.00,
    oldPrice: 40.00,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=600&auto=format&fit=crop',
    category: 'Decor',
    rating: 5,
    reviews: 12,
    description: 'Elegant decorative piece that adds a touch of sophistication to your living space.',
    badge: '-38%',
    timer: true
  },
  {
    id: 3,
    title: 'Aqua Globes 2',
    price: 25.00,
    oldPrice: 32.50,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=600&auto=format&fit=crop',
    category: 'Decor',
    rating: 4,
    reviews: 8,
    description: 'Beautiful glass globes that catch the light and create a serene atmosphere.',
    badge: 'HOT'
  },
  {
    id: 4,
    title: 'Aqua Globes',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=600&auto=format&fit=crop',
    category: 'Decor',
    rating: 5,
    reviews: 5,
    description: 'The original Aqua Globe, a minimalist masterpiece for your home.',
    badge: 'HOT'
  },
  {
    id: 5,
    title: 'Modern Velvet Sofa',
    price: 850.00,
    oldPrice: 1100.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
    category: 'Sofas',
    rating: 5,
    reviews: 24,
    description: 'Luxurious velvet sofa with clean lines and a comfortable deep seat.',
    badge: 'NEW'
  },
  {
    id: 6,
    title: 'Geometric Coffee Table',
    price: 320.00,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop',
    category: 'Table',
    rating: 4,
    reviews: 15,
    description: 'A striking geometric coffee table that serves as a functional art piece.'
  },
  {
    id: 7,
    title: 'Minimalist Floor Lamp',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
    category: 'Lighting',
    rating: 4,
    reviews: 7,
    description: 'Sleek floor lamp that provides warm, ambient lighting for your reading nook.'
  },
  {
    id: 8,
    title: 'Walnut Dining Table',
    price: 1200.00,
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=600&auto=format&fit=crop',
    category: 'Table',
    rating: 5,
    reviews: 3,
    description: 'Solid walnut dining table, handcrafted to last for generations.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Art of Minimalist Living',
    date: 'March 15, 2026',
    excerpt: 'Discover how to transform your home into a sanctuary of peace and clarity through minimalist design principles.',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop',
    author: 'Elena Rossi'
  },
  {
    id: 2,
    title: 'Choosing the Right Materials',
    date: 'March 10, 2026',
    excerpt: 'From rich walnut to brushed steel, learn how different materials can change the mood of your living space.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
    author: 'Marcus Thorne'
  },
  {
    id: 3,
    title: 'Spring Interior Trends 2026',
    date: 'March 05, 2026',
    excerpt: 'A deep dive into the colors and textures that are defining modern homes this season.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e16747d52c?q=80&w=800&auto=format&fit=crop',
    author: 'Sarah Jenkins'
  }
];

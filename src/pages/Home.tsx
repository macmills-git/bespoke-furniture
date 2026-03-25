import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ArrowRight,
  ShoppingBag,
  Heart,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { Product } from '../types';

const Hero = () => {
  return (
    <section className="relative min-h-[600px] bg-alabaster overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="text-[25vw] md:text-[350px] font-bold text-white tracking-tighter opacity-60 select-none">
          01
        </span>
      </div>

      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block border-t-2 border-charcoal pt-2 mb-6">
            <span className="text-[10px] font-bold tracking-[0.3em] text-charcoal uppercase">
              New Arrivals 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] text-charcoal mb-8 tracking-tight">
            Spring <br /> Collection
          </h1>
          <Link to="/shop" className="bg-tangerine text-white px-10 py-4 text-sm font-semibold tracking-wider hover:bg-charcoal transition-all duration-300 rounded-none shadow-lg inline-flex items-center gap-2 group">
            SHOP NOW
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-8 md:p-0">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-sage rounded-full -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop" 
            alt="Modern Grey Armchair"
            className="w-full max-w-[500px] object-contain drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Categories = () => {
  const categories = [
    { title: 'Dining Chair', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop', path: '/shop?category=Dining Chair' },
    { title: 'Sofas', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop', path: '/shop?category=Sofas' },
    { title: 'Table', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop', path: '/shop?category=Table' },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl font-medium text-charcoal mb-2">Shop by categories</h2>
          <div className="w-20 h-0.5 bg-tangerine"></div>
        </div>
        <p className="text-ash text-sm mt-4 md:mt-0">200+ Unique products available</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <Link 
            key={idx}
            to={cat.path}
            className="group cursor-pointer"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="aspect-square bg-studio-grey flex items-center justify-center p-12 relative overflow-hidden"
            >
              <img 
                src={cat.img} 
                alt={cat.title}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6">
                <span className="text-sm font-bold tracking-widest text-charcoal uppercase">{cat.title}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const ProductCard = ({ product, key }: { product: Product, key?: any }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="group">
      <div className="aspect-square bg-studio-grey relative flex items-center justify-center p-8 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
          referrerPolicy="no-referrer"
        />
        
        {product.badge && (
          <div className={`absolute top-4 left-4 px-2 py-1 text-[10px] font-bold text-white ${
            product.badge.includes('-') ? 'bg-tangerine' : 'bg-charcoal'
          }`}>
            {product.badge}
          </div>
        )}
        {product.hot && (
          <div className="absolute top-4 right-4 px-2 py-1 text-[10px] font-bold text-white bg-tangerine">
            HOT
          </div>
        )}

        {product.timer && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[90%]">
            <div className="bg-white border border-gray-200 px-3 py-2 text-center shadow-sm">
              <p className="text-[9px] font-mono text-ash uppercase mb-1">Ends in:</p>
              <p className="text-[10px] font-mono font-bold text-charcoal">804d : 08h : 37m : 20s</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={() => addToCart(product)}
            className="w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-md hover:bg-tangerine hover:text-white transition-all"
          >
            <ShoppingBag size={18} />
          </button>
          <button 
            onClick={() => toggleWishlist(product)}
            className={`w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-md hover:bg-tangerine hover:text-white transition-all ${
              isInWishlist(product.id) ? 'text-tangerine' : ''
            }`}
          >
            <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => navigate(`/product/${product.id}`)}
            className="w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-md hover:bg-tangerine hover:text-white transition-all"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="flex justify-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
          ))}
          <span className="text-[10px] text-ash ml-1">({product.reviews} reviews)</span>
        </div>
        <h4 
          className="text-sm font-medium text-charcoal mb-1 group-hover:text-tangerine transition-colors cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.title}
        </h4>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-bold text-tangerine">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-xs text-ash line-through">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Banners = () => {
  return (
    <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative h-[450px] group overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop" 
          alt="Living Room"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors duration-300"></div>
        <div className="absolute inset-8 border border-white/40 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[2px]">
          <span className="text-[10px] font-bold tracking-[0.3em] text-white mb-2">20% OFF ALL ORDERS</span>
          <h3 className="text-4xl font-medium text-white mb-6">Living Room</h3>
          <Link to="/shop?category=Living Room" className="bg-tangerine text-white px-8 py-2.5 text-xs font-bold tracking-widest rounded-full hover:bg-white hover:text-tangerine transition-all duration-300">
            SHOP NOW
          </Link>
        </div>
      </div>

      <div className="relative h-[450px] group overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1617806118233-18e16747d52c?q=80&w=1000&auto=format&fit=crop" 
          alt="Dining Room"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors duration-300"></div>
        <div className="absolute inset-8 border border-white/40 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[2px]">
          <span className="text-[10px] font-bold tracking-[0.3em] text-white mb-2">NEW COLLECTION</span>
          <h3 className="text-4xl font-medium text-white mb-6">Dining Room</h3>
          <Link to="/shop?category=Dining Room" className="bg-tangerine text-white px-8 py-2.5 text-xs font-bold tracking-widest rounded-full hover:bg-white hover:text-tangerine transition-all duration-300">
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

const HotProducts = () => {
  const [activeTab, setActiveTab] = useState('LATEST PRODUCTS');
  const tabs = ['LATEST PRODUCTS', 'TOP RATING', 'BEST SELLERS'];

  const filteredProducts = PRODUCTS.slice(0, 4); // For home page, just show first 4

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-medium text-charcoal mb-6 lg:mb-0">Hot Products</h2>
        
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] font-bold tracking-[0.2em] pb-4 transition-all relative ${
                activeTab === tab ? 'text-charcoal' : 'text-ash hover:text-charcoal'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />
              )}
            </button>
          ))}
        </div>

        <Link to="/shop" className="hidden lg:flex items-center gap-2 text-xs font-bold tracking-widest text-ash hover:text-tangerine transition-colors mt-6 lg:mt-0">
          ALL PRODUCTS <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Banners />
      <HotProducts />
    </>
  );
};

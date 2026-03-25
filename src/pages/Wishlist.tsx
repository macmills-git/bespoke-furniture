import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-7xl mx-auto">
        <div className="w-24 h-24 bg-studio-grey rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={40} className="text-ash" />
        </div>
        <h2 className="text-3xl font-medium text-charcoal mb-4">Your wishlist is empty</h2>
        <p className="text-ash text-sm mb-10">Save your favorite items here to keep track of them.</p>
        <Link to="/shop" className="bg-tangerine text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-charcoal transition-all duration-300 rounded-none shadow-lg inline-flex items-center gap-2 group">
          RETURN TO SHOP
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-ash uppercase mb-12">
        <Link to="/" className="hover:text-tangerine transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-charcoal">Wishlist</span>
      </div>

      <h1 className="text-4xl font-medium text-charcoal mb-12">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {wishlist.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group"
            >
              <div className="aspect-square bg-studio-grey relative flex items-center justify-center p-8 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                  referrerPolicy="no-referrer"
                />
                
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white flex items-center justify-center rounded-full shadow-md text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} />
                </button>

                <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-white text-charcoal px-6 py-2.5 text-[10px] font-bold tracking-widest hover:bg-tangerine hover:text-white transition-all shadow-lg flex items-center gap-2"
                  >
                    <ShoppingBag size={14} /> ADD TO CART
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

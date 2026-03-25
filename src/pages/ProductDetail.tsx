import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag,
  Heart,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../data';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = useMemo(() => 
    PRODUCTS.find(p => p.id === Number(id)), 
  [id]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-medium text-charcoal mb-4">Product not found</h2>
        <Link to="/shop" className="text-tangerine font-bold underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Simple feedback could be added here
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-ash uppercase mb-12">
        <Link to="/" className="hover:text-tangerine transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-tangerine transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-charcoal">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-studio-grey flex items-center justify-center p-12 relative overflow-hidden group">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <div className="absolute top-6 left-6 px-3 py-1.5 text-xs font-bold text-white bg-tangerine">
                {product.badge}
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-studio-grey flex items-center justify-center p-4 cursor-pointer hover:border-tangerine border border-transparent transition-all">
                <img 
                  src={product.image} 
                  alt={`${product.title} view ${i + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply opacity-50 hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
            ))}
            <span className="text-xs text-ash ml-2">({product.reviews} customer reviews)</span>
          </div>

          <h1 className="text-4xl font-medium text-charcoal mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-tangerine">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-lg text-ash line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-ash text-sm leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-widest text-charcoal uppercase w-24">Availability:</span>
              <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                <Check size={14} /> IN STOCK
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-widest text-charcoal uppercase w-24">Category:</span>
              <span className="text-xs text-ash">{product.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-widest text-charcoal uppercase w-24">SKU:</span>
              <span className="text-xs text-ash">BES-00{product.id}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center border border-gray-200 px-4 py-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-ash hover:text-charcoal transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-sm font-bold text-charcoal">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-ash hover:text-charcoal transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="bg-tangerine text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-charcoal transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag size={18} /> ADD TO CART
            </button>

            <button 
              onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-tangerine hover:text-tangerine transition-all ${
                isInWishlist(product.id) ? 'text-tangerine border-tangerine' : 'text-charcoal'
              }`}
            >
              <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-10 pt-10 border-t border-gray-100 flex items-center gap-6">
            <span className="text-[10px] font-bold tracking-widest text-ash uppercase">Share:</span>
            <div className="flex gap-4">
              {['Fb', 'Tw', 'Ig', 'Pi'].map(social => (
                <a key={social} href="#" className="text-ash hover:text-tangerine transition-colors text-xs font-bold uppercase">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="flex items-center justify-center gap-10 border-b border-gray-100 mb-10">
          {['description', 'additional info', 'reviews'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] font-bold tracking-[0.2em] pb-4 transition-all relative uppercase ${
                activeTab === tab ? 'text-charcoal' : 'text-ash hover:text-charcoal'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="productTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />
              )}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-ash text-sm leading-relaxed mb-6">
                {product.description} This piece is designed with the modern home in mind, combining minimalist aesthetics with maximum comfort. Each item is meticulously crafted by our expert artisans using only the finest materials.
              </p>
              <p className="text-ash text-sm leading-relaxed">
                Our commitment to quality ensures that every Bespoke piece is not just furniture, but a long-term investment in your home's style and functionality.
              </p>
            </motion.div>
          )}
          {activeTab === 'additional info' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-right font-bold text-charcoal uppercase tracking-widest text-[10px]">Weight:</div>
                <div className="text-left text-ash">12.5 kg</div>
                <div className="text-right font-bold text-charcoal uppercase tracking-widest text-[10px]">Dimensions:</div>
                <div className="text-left text-ash">60 x 60 x 85 cm</div>
                <div className="text-right font-bold text-charcoal uppercase tracking-widest text-[10px]">Materials:</div>
                <div className="text-left text-ash">Solid Walnut, Premium Fabric</div>
              </div>
            </motion.div>
          )}
          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-ash text-sm italic">"Absolutely beautiful piece. The quality is even better than expected!" - Verified Buyer</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-charcoal mb-4">Related Products</h2>
            <div className="w-20 h-0.5 bg-tangerine mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <div key={p.id} className="group">
                <div className="aspect-square bg-studio-grey relative flex items-center justify-center p-8 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-sm font-medium text-charcoal mb-1 group-hover:text-tangerine transition-colors cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>{p.title}</h4>
                  <span className="text-sm font-bold text-tangerine">${p.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

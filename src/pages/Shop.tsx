import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag,
  Heart,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { Product } from '../types';

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

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  
  const categoryFilter = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const categories = ['All', 'Dining Chair', 'Sofas', 'Table', 'Decor', 'Lighting'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [categoryFilter, searchQuery, sortBy]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-medium text-charcoal mb-4">Shop Collection</h1>
        <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-ash uppercase">
          <Link to="/" className="hover:text-tangerine transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal">Shop</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-10">
          <div>
            <h3 className="text-sm font-bold tracking-widest text-charcoal uppercase mb-6 border-b border-gray-100 pb-2">Categories</h3>
            <div className="space-y-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`block text-sm transition-colors ${
                    categoryFilter === cat ? 'text-tangerine font-semibold' : 'text-ash hover:text-charcoal'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest text-charcoal uppercase mb-6 border-b border-gray-100 pb-2">Price Range</h3>
            <div className="space-y-4">
              <input type="range" className="w-full accent-tangerine" min="0" max="2000" />
              <div className="flex justify-between text-xs font-bold text-ash">
                <span>$0</span>
                <span>$2,000+</span>
              </div>
            </div>
          </div>

          <div className="bg-sage p-8 relative overflow-hidden">
            <h4 className="text-xl font-medium text-charcoal mb-4 relative z-10">New Arrivals <br /> 2026</h4>
            <Link to="/shop" className="text-xs font-bold tracking-widest text-tangerine hover:text-charcoal transition-colors relative z-10">VIEW ALL →</Link>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full"></div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-100 pb-6">
            <p className="text-sm text-ash">Showing {filteredProducts.length} results</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-ash">
                <span>Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="outline-none font-semibold text-charcoal cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <button className="p-1 text-charcoal"><Filter size={18} /></button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl text-ash">No products found matching your criteria.</h3>
              <button 
                onClick={() => {
                  searchParams.delete('category');
                  searchParams.delete('search');
                  setSearchParams(searchParams);
                }}
                className="mt-4 text-tangerine font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Header = () => {
  const { cart, wishlist } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-charcoal flex items-center justify-center rounded-sm group-hover:bg-tangerine transition-colors">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-[0.3em] text-charcoal">BESPOKE</span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: 'Blog', path: '/blog' },
            { name: 'Wishlist', path: '/wishlist' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-sm font-medium text-charcoal hover:text-tangerine transition-colors flex items-center gap-1"
            >
              {item.name}
              {item.name === 'Shop' && <ChevronDown size={14} className="text-ash" />}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-studio-grey px-3 py-1.5 rounded-none">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs outline-none w-32 lg:w-48"
            />
            <button type="submit">
              <Search size={16} className="text-ash hover:text-tangerine transition-colors" />
            </button>
          </form>
          
          <div className="flex items-center gap-4">
            <User size={20} className="text-charcoal cursor-pointer hover:text-tangerine transition-colors" />
            <Link to="/wishlist" className="relative">
              <Heart size={20} className="text-charcoal cursor-pointer hover:text-tangerine transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-tangerine rounded-full border-2 border-white"></span>
              )}
            </Link>
            <Link to="/cart" className="relative group">
              <ShoppingBag size={20} className="text-charcoal group-hover:text-tangerine transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-tangerine rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-charcoal">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 space-y-4 shadow-lg">
          <Link to="/" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/blog" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link to="/wishlist" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
          <Link to="/cart" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 border-2 border-tangerine rotate-45"></div>
            <span className="text-xl font-bold tracking-[0.3em]">BESPOKE</span>
          </div>
          <p className="text-ash text-sm leading-relaxed mb-6">
            Meticulously crafted, contemporary furniture that elevates the modern home through minimalist design and premium materials.
          </p>
          <div className="flex gap-4">
            {['Fb', 'Tw', 'Ig', 'Pi'].map(social => (
              <a key={social} href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-[10px] font-bold hover:bg-tangerine hover:border-tangerine transition-all">
                {social}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-widest mb-8 uppercase">Quick Links</h4>
          <ul className="space-y-4 text-ash text-sm">
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop Collection</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-widest mb-8 uppercase">Customer Care</h4>
          <ul className="space-y-4 text-ash text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-widest mb-8 uppercase">Newsletter</h4>
          <p className="text-ash text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent text-sm outline-none flex-1"
            />
            <button className="text-tangerine hover:text-white transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-ash tracking-widest uppercase">© 2026 BESPOKE FURNITURE. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-30 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-30 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useAppContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-7xl mx-auto">
        <div className="w-24 h-24 bg-studio-grey rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={40} className="text-ash" />
        </div>
        <h2 className="text-3xl font-medium text-charcoal mb-4">Your cart is empty</h2>
        <p className="text-ash text-sm mb-10">Looks like you haven't added any items to your cart yet.</p>
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
        <span className="text-charcoal">Shopping Cart</span>
      </div>

      <h1 className="text-4xl font-medium text-charcoal mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="hidden md:grid grid-cols-6 gap-4 border-b border-gray-100 pb-4 text-[10px] font-bold tracking-widest text-ash uppercase">
            <div className="col-span-3">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center border-b border-gray-100 pb-8 group"
              >
                <div className="col-span-1 md:col-span-3 flex items-center gap-6">
                  <div className="w-24 h-24 bg-studio-grey flex-shrink-0 p-4">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal mb-1 hover:text-tangerine transition-colors cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-ash mb-2">{item.category}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-bold tracking-widest text-red-500 flex items-center gap-1 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={12} /> REMOVE
                    </button>
                  </div>
                </div>

                <div className="text-center text-sm font-bold text-charcoal">
                  <span className="md:hidden text-ash font-normal mr-2">Price:</span>
                  ${item.price.toFixed(2)}
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center border border-gray-200 px-3 py-1.5">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="text-ash hover:text-charcoal transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-charcoal">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="text-ash hover:text-charcoal transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-right text-sm font-bold text-tangerine">
                  <span className="md:hidden text-ash font-normal mr-2">Total:</span>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex flex-wrap justify-between items-center gap-6 pt-4">
            <Link to="/shop" className="text-xs font-bold tracking-widest text-charcoal hover:text-tangerine transition-colors flex items-center gap-2">
              <ArrowRight size={16} className="rotate-180" /> CONTINUE SHOPPING
            </Link>
            <button 
              onClick={clearCart}
              className="text-xs font-bold tracking-widest text-ash hover:text-red-500 transition-colors"
            >
              CLEAR SHOPPING CART
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-studio-grey p-8 space-y-8">
            <h3 className="text-sm font-bold tracking-widest text-charcoal uppercase border-b border-gray-200 pb-4">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-ash">Subtotal</span>
                <span className="font-bold text-charcoal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ash">Shipping</span>
                <span className="font-bold text-charcoal">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-ash italic">Free shipping on orders over $500.00</p>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm font-bold tracking-widest text-charcoal uppercase">Total</span>
              <span className="text-2xl font-bold text-tangerine">${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-charcoal text-white py-4 text-sm font-bold tracking-widest hover:bg-tangerine transition-all duration-300 shadow-lg"
            >
              PROCEED TO CHECKOUT
            </button>

            <div className="space-y-4 pt-4">
              <p className="text-[10px] font-bold tracking-widest text-ash uppercase text-center">We Accept:</p>
              <div className="flex justify-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50 grayscale" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-50 grayscale" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

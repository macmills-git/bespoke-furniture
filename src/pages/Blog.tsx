import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  ChevronRight,
  Calendar,
  User,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data';

export const Blog = () => {
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-ash uppercase mb-12">
        <Link to="/" className="hover:text-tangerine transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-charcoal">Blog</span>
      </div>

      <h1 className="text-4xl font-medium text-charcoal mb-12 text-center">Bespoke Journal</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Blog Posts */}
        <div className="lg:col-span-2 space-y-20">
          {BLOG_POSTS.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[16/9] overflow-hidden mb-8 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[10px] font-bold tracking-widest text-charcoal shadow-lg">
                  INTERIOR DESIGN
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-ash uppercase mb-4">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><User size={12} /> BY {post.author}</span>
              </div>

              <h2 className="text-3xl font-medium text-charcoal mb-4 hover:text-tangerine transition-colors cursor-pointer">
                {post.title}
              </h2>
              
              <p className="text-ash text-sm leading-relaxed mb-8 max-w-2xl">
                {post.excerpt}
              </p>

              <button className="text-xs font-bold tracking-[0.2em] text-charcoal hover:text-tangerine transition-colors flex items-center gap-2 group/btn">
                READ MORE <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-12">
          {/* Search */}
          <div className="bg-studio-grey p-8">
            <h3 className="text-sm font-bold tracking-widest text-charcoal uppercase mb-6 border-b border-gray-200 pb-2">Search</h3>
            <div className="flex bg-white px-4 py-3 border border-gray-100">
              <input 
                type="text" 
                placeholder="Search posts..." 
                className="bg-transparent text-xs outline-none flex-1"
              />
              <Search size={16} className="text-ash" />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-studio-grey p-8">
            <h3 className="text-sm font-bold tracking-widest text-charcoal uppercase mb-6 border-b border-gray-200 pb-2">Categories</h3>
            <ul className="space-y-4 text-sm text-ash">
              <li className="flex justify-between hover:text-tangerine transition-colors cursor-pointer">
                <span>Interior Design</span>
                <span>(12)</span>
              </li>
              <li className="flex justify-between hover:text-tangerine transition-colors cursor-pointer">
                <span>Minimalism</span>
                <span>(8)</span>
              </li>
              <li className="flex justify-between hover:text-tangerine transition-colors cursor-pointer">
                <span>Furniture Care</span>
                <span>(5)</span>
              </li>
              <li className="flex justify-between hover:text-tangerine transition-colors cursor-pointer">
                <span>New Arrivals</span>
                <span>(15)</span>
              </li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="bg-studio-grey p-8">
            <h3 className="text-sm font-bold tracking-widest text-charcoal uppercase mb-6 border-b border-gray-200 pb-2">Recent Posts</h3>
            <div className="space-y-6">
              {BLOG_POSTS.slice(0, 3).map(post => (
                <div key={post.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-white flex-shrink-0 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal mb-1 line-clamp-2 group-hover:text-tangerine transition-colors">{post.title}</h4>
                    <span className="text-[10px] text-ash">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-studio-grey p-8">
            <h3 className="text-sm font-bold tracking-widest text-charcoal uppercase mb-6 border-b border-gray-200 pb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Design', 'Modern', 'Walnut', 'Minimal', 'Spring', 'Handcrafted'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white text-[10px] font-bold text-ash hover:bg-tangerine hover:text-white transition-all cursor-pointer">
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

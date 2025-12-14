import React from 'react';
import { Section, Card, Button, DecorativeShapes } from '../components/UI';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold font-heading text-slate-900 dark:text-white mb-6">Latest Updates</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            News, stories, and insights from the ground.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <Card key={post.id} className="flex flex-col h-full group">
              <div className="h-56 overflow-hidden relative rounded-t-[24px]">
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                 <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                   <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                   <span className="flex items-center gap-1"><User size={12} /> Admin</span>
                 </div>
                 <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">{post.title}</h3>
                 <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">{post.excerpt}</p>
                 <div className="mt-auto">
                   <Button variant="ghost" className="pl-0 text-sm">Read Full Story <ArrowRight size={16} className="ml-2" /></Button>
                 </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-[#06B6D4] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-heading mb-4">Subscribe to our Newsletter</h2>
            <p className="mb-8 max-w-xl mx-auto opacity-90">Get quarterly updates on our programs, financial reports, and volunteer opportunities delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-white" />
              <Button variant="subscribe">Subscribe</Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
      </Section>
    </>
  );
};

export default Blog;
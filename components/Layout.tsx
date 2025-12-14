import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Heart, ChevronDown, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { Button } from './UI';
import { NGO_DETAILS, LOGO_URL } from '../constants';

// Expanded Navigation Structure with Dropdowns
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { 
    label: 'About', 
    path: '/about',
    children: [
      { label: 'Our Mission', path: '/about' },
      { label: 'Leadership', path: '/founders' },
      { label: 'Extended Team', path: '/team' },
      { label: 'Financial Reports', path: '/financial-reports' },
    ]
  },
  { 
    label: 'Programs', 
    path: '/programs',
    children: [
      { label: 'All Programs', path: '/programs' },
      { label: 'Education Support', path: '/programs' },
      { label: 'Digital Literacy', path: '/programs' },
      { label: 'Scholarships', path: '/programs' },
    ]
  },
  { 
    label: 'Media', 
    path: '/gallery',
    children: [
      { label: 'Photo Gallery', path: '/gallery' },
      { label: 'Events', path: '/events' },
      { label: 'Impact Stories', path: '/impact' },
      { label: 'Blog & News', path: '/blog' },
    ]
  },
  { 
    label: 'Get Involved', 
    path: '/volunteer',
    children: [
      { label: 'Volunteer', path: '/volunteer' },
      { label: 'Donate', path: '/donate' },
      { label: 'Partner with Us', path: '/contact' },
    ]
  },
  { label: 'Contact', path: '/contact' },
];

// --- Magnetic Logo ---
const MagneticLogo = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <NavLink 
      to="/" 
      ref={ref}
      className="flex items-center gap-3 group relative z-50 shrink-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, transition: 'transform 0.1s ease-out' }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg overflow-hidden border-2 border-[#06B6D4] flex items-center justify-center relative shrink-0 p-1">
         <img 
           src={LOGO_URL} 
           alt="ABS Logo" 
           className="w-full h-full object-contain"
         />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-bold text-base md:text-lg leading-tight tracking-tight text-slate-900 dark:text-white group-hover:text-[#9C4DFF] transition-colors whitespace-nowrap">
          Akshara Bharatham
        </span>
        <span className="text-[10px] md:text-xs font-semibold tracking-widest text-[#06B6D4] uppercase">
          Society
        </span>
      </div>
    </NavLink>
  );
};

export const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleDropdownToggle = (label: string, e: React.MouseEvent) => {
    e.preventDefault(); 
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Mobile: Wrap content to allow menu to drop to second line. Desktop: No wrap, single line. */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between py-3 lg:h-20 lg:py-0 gap-y-3">
          
          {/* 1. Logo */}
          <MagneticLogo />

          {/* 2. Actions (Theme/Donate) 
              On Mobile: Displays on the right of the top row.
              On Desktop: Displays on the far right (order-3).
          */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0 lg:order-3 shrink-0 pl-4">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="hidden sm:block">
              <NavLink to="/donate">
                <Button size="sm" className="shadow-purple-500/20">Donate</Button>
              </NavLink>
            </div>
          </div>

          {/* 3. Navigation Menu 
              On Mobile: Wraps to new line (order-last), full width, scrollable.
              On Desktop: Sits in middle (order-2), auto width.
          */}
          <nav className={`
            order-last lg:order-2 
            w-full lg:w-auto lg:flex-1
            flex items-center gap-1 
            overflow-x-auto lg:overflow-visible 
            hide-scrollbar 
            pb-1 lg:pb-0
            lg:ml-8
            border-t lg:border-t-0 border-slate-100 dark:border-slate-800 lg:border-none pt-2 lg:pt-0
          `}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group shrink-0">
                {/* Main Link */}
                <div className="flex items-center">
                  <NavLink 
                    to={item.path}
                    onClick={(e) => {
                      // On mobile/tablet, if it has children, the first click opens dropdown modal
                      if (item.children && window.innerWidth < 1024) {
                         handleDropdownToggle(item.label, e);
                      }
                    }}
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-full flex items-center gap-1 text-sm font-medium transition-all whitespace-nowrap ${
                        isActive && !activeDropdown
                          ? 'bg-[#06B6D4]/10 text-[#06B6D4] font-bold' 
                          : activeDropdown === item.label
                             ? 'text-[#9C4DFF] bg-purple-50 dark:bg-slate-800'
                             : 'text-slate-700 dark:text-slate-200 hover:text-[#9C4DFF] dark:hover:text-[#9C4DFF] hover:bg-white/50 dark:hover:bg-slate-800/50'
                      }`
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-300 opacity-60 ${activeDropdown === item.label ? 'rotate-180' : 'group-hover:rotate-180'}`} 
                      />
                    )}
                  </NavLink>
                </div>

                {/* Dropdown Menus */}
                {item.children && (
                  <>
                    {/* Desktop Hover Dropdown */}
                    <div className="hidden lg:block absolute top-full left-0 pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden p-2">
                        {item.children.map((child, index) => (
                          <NavLink 
                            key={`${child.path}-${index}`}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 rounded-xl text-sm transition-colors font-medium ${
                                 isActive && child.path !== '#'
                                  ? 'bg-purple-50 dark:bg-slate-800 text-[#9C4DFF]'
                                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#9C4DFF]'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Modal Dropdown (Better than inline for scrolling navs) */}
                    {activeDropdown === item.label && (
                       <>
                         <div 
                           className="lg:hidden fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" 
                           onClick={() => setActiveDropdown(null)}
                         />
                         <div className="lg:hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl z-[70] p-2 border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 fade-in duration-200">
                            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                  {item.label} <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">Menu</span>
                                </span>
                                <button 
                                  onClick={() => setActiveDropdown(null)}
                                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <X size={18} className="text-slate-500"/>
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto">
                              {item.children.map((child, index) => (
                                <NavLink 
                                  key={`${child.path}-${index}-mobile`}
                                  to={child.path}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#9C4DFF]"
                                >
                                  {child.label}
                                </NavLink>
                              ))}
                            </div>
                         </div>
                       </>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/40 dark:bg-[#0b1220]/60 backdrop-blur-lg border-t border-white/20 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#06B6D4] flex items-center justify-center text-white font-bold text-xl p-2 shadow-lg">
                 <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">Akshara Bharatham</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {NGO_DETAILS.shortIntro}
            </p>
            <div className="flex gap-4">
               {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                 <a 
                   key={i} 
                   href={i === 0 ? "https://www.facebook.com/p/Akshara-Bharatam-Society-100072491923829/" : "#"} 
                   target={i === 0 ? "_blank" : "_self"} 
                   rel={i === 0 ? "noopener noreferrer" : ""} 
                   className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-[#9C4DFF] hover:text-white transition-all shadow-sm"
                 >
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Programs', 'Volunteer', 'Contact Us'].map(link => (
                <li key={link}><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-[#06B6D4] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              {[
                { label: 'Privacy Policy', path: '/privacy' }, 
                { label: 'Terms of Service', path: '/terms' }, 
                { label: 'Cookie Policy', path: '/cookie-policy' }, 
                { label: 'Financial Reports', path: '/financial-reports' }
              ].map(link => (
                <li key={link.label}><NavLink to={link.path} className="text-slate-600 dark:text-slate-400 hover:text-[#06B6D4] transition-colors">{link.label}</NavLink></li>
              ))}
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-slate-900 dark:text-white mb-6">Contact</h4>
             <ul className="space-y-4 text-slate-600 dark:text-slate-400">
               <li className="flex gap-3">
                 <MapPin className="shrink-0 text-[#06B6D4]" size={20} />
                 <span>{NGO_DETAILS.location}</span>
               </li>
               <li className="flex gap-3">
                 <Phone className="shrink-0 text-[#06B6D4]" size={20} />
                 <span>{NGO_DETAILS.phone}</span>
               </li>
               <li className="flex gap-3">
                 <Mail className="shrink-0 text-[#06B6D4]" size={20} />
                 <span>{NGO_DETAILS.email}</span>
               </li>
             </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/50 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Akshara Bharatham Society. All rights reserved.</p>
          <div className="flex gap-2 text-sm text-slate-500">
             <span>Made with <Heart size={12} className="inline text-red-500 fill-red-500" /> for a better future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
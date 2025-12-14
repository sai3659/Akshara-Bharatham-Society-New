import React, { useRef, useEffect, useState } from 'react';

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subscribe';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm";
  
  const variants = {
    primary: "bg-cta-gradient text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 focus:ring-purple-500 border-none relative overflow-hidden after:absolute after:inset-0 after:bg-white/20 after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-500",
    secondary: "bg-[#06B6D4] text-white shadow-lg shadow-cyan-500/30 hover:bg-[#0891b2] hover:shadow-cyan-500/50 hover:-translate-y-1 focus:ring-cyan-500",
    outline: "border-2 border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-dark-card",
    ghost: "text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-white bg-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800",
    subscribe: "bg-[#F2FEFF]/80 dark:bg-slate-800/80 text-[#06B6D4] font-bold border-2 border-[#06B6D4] dark:border-cyan-500 hover:bg-cta-gradient hover:border-transparent hover:text-white shadow-md hover:shadow-purple-500/50 hover:-translate-y-1"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- Typewriter Component (Cycling Words) ---
export const Typewriter: React.FC<{ words: string[]; speed?: number; delay?: number }> = ({ words, speed = 150, delay = 2000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout2);
  }, []);

  useEffect(() => {
    // Safety check if words array is empty
    if (!words || words.length === 0) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, delay]);

  return (
    <span className="inline-flex items-center">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-400">
        {words[index]?.substring(0, subIndex)}
      </span>
      <span className={`ml-1 w-1 h-[1em] bg-cyan-500 ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
};

// --- CountUp Animation Component ---
export const CountUp: React.FC<{ end: string | number; duration?: number; suffix?: string }> = ({ end, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const endNum = parseInt(String(end).replace(/[^0-9]/g, ''), 10);
    if (isNaN(endNum)) return;

    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = easeOutExpo(frame / totalFrames);
      const currentCount = Math.round(endNum * progress);

      if (frame === totalFrames) {
        setCount(endNum);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
};


// --- Cards with RGB Glow Effect (Hover only) ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Glassmorphism default background (Transparent white/dark)
  const defaultBg = className.includes('bg-') ? '' : 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-md';

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative group rounded-[24px] ${defaultBg} ${className}`}
    >
      {/* Internal Content Container */}
      <div className={`relative h-full w-full rounded-[24px] overflow-hidden ${defaultBg} border border-white/50 dark:border-slate-700/50 group-hover:border-transparent transition-colors z-10 shadow-sm`}>
        {/* Internal Spotlight Effect */}
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-20 mix-blend-overlay"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.4), transparent 40%)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-30 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Inputs ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
    <input 
      className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-[#9C4DFF] focus:border-transparent outline-none transition-all placeholder:text-slate-400 ${className}`}
      {...props}
    />
  </div>
);

// --- Select ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
    <select 
      className={`w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-[#9C4DFF] focus:border-transparent outline-none transition-all ${className}`}
      {...props}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// --- Section ---
export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  // Reduced padding for optimized layout
  <section id={id} className={`py-12 md:py-20 px-4 md:px-8 relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// --- Decorative Shapes & Static Corner Patterns ---
export const DecorativeShapes: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    {/* Floating Blobs (Subtle) */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-400/10 dark:bg-purple-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50" />
    <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-400/10 dark:bg-cyan-900/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-50" />
    
    {/* Top Left Corner Pattern */}
    <svg className="absolute top-0 left-0 text-cyan-500/10 dark:text-cyan-400/10 w-64 h-64" viewBox="0 0 200 200">
      <circle cx="0" cy="0" r="100" fill="currentColor" />
      <circle cx="0" cy="0" r="150" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="0" cy="0" r="180" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>

    {/* Top Right Corner Pattern (Dots) */}
    <div className="absolute top-10 right-10 flex gap-2 flex-wrap w-20 opacity-20 dark:opacity-10 rotate-12">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-purple-600" />
      ))}
    </div>

    {/* Bottom Left Corner Pattern (Lines) */}
    <svg className="absolute bottom-0 left-0 text-purple-500/10 dark:text-purple-400/10 w-48 h-48" viewBox="0 0 100 100">
       <path d="M0 100 L100 0" stroke="currentColor" strokeWidth="10" />
       <path d="M0 80 L80 0" stroke="currentColor" strokeWidth="5" />
       <path d="M0 60 L60 0" stroke="currentColor" strokeWidth="2" />
    </svg>

    {/* Bottom Right Corner Pattern */}
    <svg className="absolute bottom-0 right-0 text-cyan-500/10 dark:text-cyan-400/10 w-56 h-56" viewBox="0 0 200 200">
      <path d="M100 200 A100 100 0 0 0 200 100 L200 200 Z" fill="currentColor" />
    </svg>
  </div>
);
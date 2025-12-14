import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Star, Quote, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Button, Card, CountUp, Typewriter } from '../components/UI';
import { STATS, PROGRAMS, NGO_DETAILS, TESTIMONIALS } from '../constants';

// --- Antigravity Balls Background ---
const AntigravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Physics constants
    const FRICTION = 0.95;
    const MOUSE_FORCE = 0.8;
    const PARTICLE_COUNT = 30; // Fewer but larger balls
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      mass: number;
      baseColor: string;

      constructor() {
        this.radius = Math.random() * 30 + 15; // Larger radius for "balls"
        this.x = Math.random() * (width - this.radius * 2) + this.radius;
        this.y = Math.random() * (height - this.radius * 2) + this.radius;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.mass = this.radius; 
        
        // Theme-based colors (base for gradient)
        const isDark = document.documentElement.classList.contains('dark');
        const colors = isDark 
          ? ['#06B6D4', '#9C4DFF', '#22d3ee'] 
          : ['#a5f3fc', '#e9d5ff', '#cffafe']; // Pastels for light
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.color = this.baseColor;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x + this.radius > width) { this.x = width - this.radius; this.vx *= -1; }
        if (this.x - this.radius < 0) { this.x = this.radius; this.vx *= -1; }
        if (this.y + this.radius > height) { this.y = height - this.radius; this.vy *= -1; }
        if (this.y - this.radius < 0) { this.y = this.radius; this.vy *= -1; }

        // Mouse Interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // React when cursor is near (repel)
        if (dist < 250) {
           const force = (250 - dist) / 250;
           // Gentle push
           this.vx -= dx * force * 0.002 * MOUSE_FORCE;
           this.vy -= dy * force * 0.002 * MOUSE_FORCE;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Create radial gradient for 3D ball effect
        const gradient = ctx.createRadialGradient(
          this.x - this.radius/3, this.y - this.radius/3, this.radius/10,
          this.x, this.y, this.radius
        );
        
        // Determine transparency based on theme to blend nicely
        const isDark = document.documentElement.classList.contains('dark');
        
        gradient.addColorStop(0, isDark ? '#ffffff' : '#ffffff'); // Highlight
        gradient.addColorStop(0.3, this.baseColor);
        gradient.addColorStop(1, isDark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'); // Fade edges

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = isDark ? 0.6 : 0.8;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    let particles: Particle[] = [];
    
    // Initialize
    const init = () => {
       particles = [];
       for (let i = 0; i < PARTICLE_COUNT; i++) {
         particles.push(new Particle());
       }
    };
    init();

    const observer = new MutationObserver(() => init());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-100 mix-blend-multiply dark:mix-blend-screen" />;
};

const Home: React.FC = () => {
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto scroll testimonials
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-20 transition-colors duration-500">
        <AntigravityBackground />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/80 backdrop-blur-md border border-white/50 dark:border-slate-700/50 text-slate-800 dark:text-cyan-300 font-semibold text-sm shadow-sm hover:scale-105 transition-transform cursor-default">
              <Star size={14} className="text-amber-400 fill-amber-400" /> Empowering Rural India
            </div>
            
            {/* Dynamic Typewriter Heading */}
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-slate-900 dark:text-white leading-tight min-h-[160px] md:min-h-[auto] drop-shadow-sm">
              Bring Quality in <br/>
              <Typewriter words={["Education", "Life"]} speed={150} delay={2000} />
            </h1>

            {/* Static Vibrant Quote */}
            <p className="text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 drop-shadow-sm">
              Akshara Bharatham Society is dedicated to supporting students and improving educational standards. Join our mission today to create a brighter future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <NavLink to="/donate">
                <Button size="lg" className="shadow-purple-500/20 w-full sm:w-auto group">
                   Donate Now 
                   <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </NavLink>
              <NavLink to="/founders">
                <Button variant="outline" size="lg" className="border-slate-800 text-slate-800 dark:border-white dark:text-white hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-black w-full sm:w-auto backdrop-blur-sm">
                  Book Meeting
                </Button>
              </NavLink>
            </div>
          </div>
          
          <div className="relative animate-in slide-in-from-right-10 fade-in duration-1000 hidden lg:block perspective-1000">
             {/* 3D Tilt Effect Container */}
             <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl shadow-purple-900/20 border-8 border-white/40 dark:border-slate-800/50 transform rotate-2 hover:rotate-0 transition-all duration-700 group h-[500px]">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
               <img src="https://images.unsplash.com/photo-1577896337318-2838d7c0f0cc?auto=format&fit=crop&q=80&w=800" alt="Indian Classroom" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute bottom-8 left-8 z-20 text-white">
                  <p className="font-bold text-lg">Real Change</p>
                  <p className="text-sm opacity-80">Happening in Rambilli Mandal</p>
               </div>
             </div>
             {/* Floating Badge */}
             <div className="absolute -bottom-10 -left-10 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-6 rounded-3xl shadow-xl dark:shadow-black/50 z-20 flex items-center gap-4 animate-float border border-white/50 dark:border-slate-800">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                  <Star fill="currentColor" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading text-slate-900 dark:text-white">4.9/5</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Community Rating</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section with CountUp */}
      <section className="py-12 bg-white/30 dark:bg-[#0b1120]/30 backdrop-blur-sm border-y border-white/20 dark:border-slate-800/50 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center space-y-2 group">
                <div className="inline-flex p-4 rounded-2xl bg-[#F2FEFF] dark:bg-slate-800 text-[#06B6D4] mb-2 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl font-bold font-heading text-slate-900 dark:text-white">
                  <CountUp end={stat.value} suffix="+" />
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <Section className="">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-4">Our Key Initiatives</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">We run targeted programs to address specific gaps in the education system.</p>
        </div>

        {/* Removed RGB Glow Border Container - Regular clean layout */}
        <div className="">
              <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 md:pb-0">
                {PROGRAMS.slice(0, 3).map(prog => (
                  <Card key={prog.id} className="overflow-hidden group h-full flex flex-col min-w-[280px] snap-center">
                    <div className="h-56 overflow-hidden relative">
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors z-10" />
                      <img src={prog.image} alt={prog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      <span className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-black/80 backdrop-blur text-[#06B6D4] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                        {prog.category}
                      </span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">{prog.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{prog.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-lg">{prog.impact}</span>
                        <NavLink to="/programs" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#06B6D4] hover:text-white transition-all">
                          <ArrowRight size={20} />
                        </NavLink>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
        </div>
        
        <div className="text-center mt-12">
          <NavLink to="/programs">
            <Button variant="outline" size="lg">View All Programs</Button>
          </NavLink>
        </div>
      </Section>

      {/* Impact/Testimonial Slider */}
      <Section className="">
         <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="flex-1 space-y-8 w-full">
                  <div className="inline-block p-2 px-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                    Success Stories
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white leading-tight">Voices from the Field</h2>
                  
                  {/* Testimonial Carousel - Single visible item with manual control */}
                  <div 
                    className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-400 to-cyan-400 group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                     <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[22px] overflow-hidden p-8 h-72 relative flex flex-col justify-center">
                        {/* Wrapper for sliding */}
                        <div className="relative overflow-hidden h-full">
                          {TESTIMONIALS.map((t, idx) => (
                             <div 
                                key={idx} 
                                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out px-4 ${
                                  idx === currentTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
                                }`}
                             >
                               <Quote className="absolute top-0 left-0 text-purple-200 dark:text-purple-900/40 transform scale-150" size={40} />
                               <p className="text-lg md:text-xl italic text-slate-700 dark:text-slate-300 relative z-10 leading-relaxed font-medium mb-6 pl-6">
                                 "{t.quote}"
                               </p>
                               <div className="pl-6">
                                 <h4 className="font-bold text-slate-900 dark:text-white text-lg">{t.author}</h4>
                                 <p className="text-[#06B6D4] font-medium text-sm">{t.role}</p>
                               </div>
                             </div>
                           ))}
                        </div>
                     </div>
                     
                     {/* Manual Controls overlay on hover */}
                     <button 
                       onClick={prevTestimonial}
                       className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                     >
                       <ChevronLeft size={20} />
                     </button>
                     <button 
                       onClick={nextTestimonial}
                       className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                     >
                       <ChevronRight size={20} />
                     </button>
                  </div>
                  
                  {/* Indicators */}
                  <div className="flex gap-2 items-center">
                    {TESTIMONIALS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentTestimonial(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-purple-500' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-purple-300'}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                    <span className="ml-auto text-xs text-slate-400 font-medium">
                      {isPaused ? 'Paused' : 'Auto-playing'}
                    </span>
                  </div>

                  <NavLink to="/impact">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent text-purple-600 hover:text-purple-500 text-lg group">
                      Read more impact stories 
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </NavLink>
               </div>
               
               <div className="flex-1 relative pl-8 hidden md:block">
                 <div className="grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg mt-12 transform hover:-translate-y-2 transition-transform duration-500 border-4 border-white/50 dark:border-slate-800/50" alt="Student smiling" />
                    <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg mb-12 transform hover:-translate-y-2 transition-transform duration-500 border-4 border-white/50 dark:border-slate-800/50" alt="Group of students" />
                 </div>
                 {/* Decorative Circle */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-100/30 dark:bg-cyan-900/20 rounded-full blur-3xl -z-10 animate-pulse" />
               </div>
            </div>
         </div>
      </Section>

      {/* Map Section */}
      <section className="h-[600px] w-full relative bg-slate-200/50 dark:bg-slate-800/50">
         <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            loading="lazy" 
            allowFullScreen 
            src={`https://www.google.com/maps?q=${NGO_DETAILS.coordinates.lat},${NGO_DETAILS.coordinates.lng}&hl=en;z=14&output=embed`}
            title="NGO Location"
            className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700 mix-blend-multiply dark:mix-blend-normal"
          ></iframe>
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-center text-center md:text-left max-w-4xl w-[90%] border border-white/50 dark:border-slate-700/50">
             <div className="w-16 h-16 rounded-full bg-cta-gradient flex items-center justify-center text-white shrink-0 shadow-lg">
               <MapPin size={32} />
             </div>
             <div>
               <h3 className="font-bold text-slate-900 dark:text-white text-2xl mb-2">Visit Akshara Bharatham Society</h3>
               <p className="text-slate-500 dark:text-slate-400 text-lg">{NGO_DETAILS.location}</p>
             </div>
             <div className="md:ml-auto">
               <NavLink to="/contact">
                <Button variant="outline" size="md" className="border-2 font-bold">Get Directions</Button>
               </NavLink>
             </div>
          </div>
      </section>

      {/* Sticky Donate Bar (Bottom) */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg border-t border-white/50 dark:border-slate-800 p-4 z-40 transform translate-y-0 transition-transform shadow-[0_-5px_30px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                <span className="text-purple-600 dark:text-purple-400 mr-2">Goal:</span>
                Help us reach 1,000 more students this month.
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <NavLink to="/founders" className="flex-1 md:flex-none">
                <Button variant="outline" size="sm" className="w-full">Book Meeting</Button>
              </NavLink>
              <NavLink to="/donate" className="flex-1 md:flex-none">
                <Button size="sm" className="w-full shadow-purple-500/30">Donate Now</Button>
              </NavLink>
              <button 
                onClick={() => setShowStickyBar(false)} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer for sticky bar */}
      {showStickyBar && <div className="h-24" />}
    </>
  );
};

export default Home;
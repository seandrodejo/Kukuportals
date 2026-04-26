"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, ChevronRight, ChevronLeft, Zap, Cpu, X, Send, 
  MessageCircle, Star, Quote, Terminal, Activity, Layers, 
  ShieldCheck, CheckCircle2, Globe, Database, Lock, 
  UserCheck, Briefcase, Award, Verified, Menu, Loader2,
  BadgeDollarSign, FileText, ExternalLink, Plus, Calendar,
  BarChart, Network, Target
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';

// FIREBASE IMPORT
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * KUKU PORTALS - MASTER DEPLOYMENT (V18.5)
 * Operator: Sean
 * Patch: Mobile Responsiveness & Modal Overflow Protection (Zero Removals)
 */

const LinkedInIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InternalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    html { scroll-behavior: smooth; }
    @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
    @keyframes codeFall { 0% { transform: translateY(-100%); opacity: 0; } 5% { opacity: 0.7; } 95% { opacity: 0.7; } 100% { transform: translateY(100vh); opacity: 0; } }
    @keyframes plasmaPulse { 0% { box-shadow: 0 0 15px #ff1b1b, inset 0 0 8px #ff1b1b; } 50% { box-shadow: 0 0 35px #ff1b1b, inset 0 0 15px #ff1b1b; } 100% { box-shadow: 0 0 15px #ff1b1b, inset 0 0 8px #ff1b1b; } }
    @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
    
    .glass-pill { background: rgba(8, 8, 9, 0.85); backdrop-filter: blur(50px); border: 1px solid rgba(255, 255, 255, 0.1); }
    .cyberpunk-title { font-family: 'Orbitron', sans-serif; letter-spacing: -0.02em; }
    .btn-plasma {
      background: #ff1b1b; color: white; font-family: 'Orbitron', sans-serif; text-transform: uppercase; font-weight: 900;
      letter-spacing: 0.1em; border: 1px solid rgba(255,255,255,0.3); transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); animation: plasmaPulse 2.5s infinite;
    }
    .btn-plasma:hover { background: white; color: black; transform: skewX(-10deg) scale(1.05); box-shadow: 0 0 50px rgba(255,255,255,0.6); }
    
    /* ENHANCED GLASSMORPHISM FOR CARDS */
    .price-card { 
      border: 1px solid rgba(255, 255, 255, 0.08); 
      background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%); 
      backdrop-filter: blur(40px); 
      transition: all 0.5s; 
    }
    .price-card:hover { border-color: #ff1b1b; background: linear-gradient(145deg, rgba(255,27,27,0.08) 0%, rgba(255,255,255,0.01) 100%); transform: translateY(-10px); }
    
    .faq-card { border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(255,255,255,0.02); transition: all 0.4s; }
    .faq-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,27,27,0.4); }
    .tech-grid { background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 60px 60px; }
  `}} />
);

const CodeMeteoriteRain = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const rainDrops = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ column: (i * 2.5) + Math.random() * 2, delay: Math.random() * 5, duration: 5 + Math.random() * 10 })), []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
      {rainDrops.map((drop, index) => (
        <div key={index} className="absolute text-[12px] font-mono leading-none" style={{ left: `${drop.column}%`, top: `-20vh`, animation: `codeFall ${drop.duration}s ${drop.delay}s infinite linear`, color: '#F4F1EA' }}>
          {Array.from({ length: 15 }).map((_, charIdx) => (
            <div key={charIdx} style={{ opacity: 1 - (charIdx / 15), color: charIdx === 0 ? '#FFFFFF' : '#444444' }}>
              {["0", "1", "A", "F", "X", "9"][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const InfiniteMarquee = () => (
  <div className="w-full overflow-hidden bg-[#FF1B1B] py-3 flex border-y border-white/20 relative z-20">
    <div className="flex w-max" style={{ animation: 'marquee 25s linear infinite' }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-12 md:gap-16 items-center px-4 md:px-8 text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm cyberpunk-title shrink-0">
          <span className="flex items-center gap-2"><Zap size={16}/> High-Velocity Deployment</span>
          <span className="flex items-center gap-2"><Lock size={16}/> Sub-Second Secure Protocols</span>
          <span className="flex items-center gap-2"><Database size={16}/> Escrow Verified Architecture</span>
          <span className="flex items-center gap-2"><Target size={16}/> Elite Conversion Funnels</span>
        </div>
      ))}
    </div>
  </div>
);

const HEADLINES = ["LIMIT BROKEN.", "FORCE MULTIPLIED.", "VELOCITY ENGINED.", "SYSTEM ACTIVE."];

const SLIDES = [
  { id: 1, title: "NEURAL INTERFACE", desc: "Sub-second lead processing infrastructure with active AI integration.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070" },
  { id: 2, title: "VELOCITY FUNNELS", desc: "Psychologically engineered for high-ticket conversion.", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070" },
  { id: 3, title: "CRIMSON PROTOCOL", desc: "Next-gen security automation for multi-region transactions.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070" },
  { id: 4, title: "GLOBAL UPLINK", desc: "Enterprise cloud deployment with zero latency architecture.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070" }
];

const SERVICES = [
  { icon: <Activity size={32} />, title: "Conversion Funnels", desc: "Psychologically engineered paths that turn cold traffic into high-ticket buyers through behavioral triggers and sub-second load times." },
  { icon: <Network size={32} />, title: "Business Portals", desc: "Private, secure client infrastructures designed for high-end project management, seamless data transfer, and automated workflows." },
  { icon: <ShieldCheck size={32} />, title: "Secure Deployment", desc: "Military-grade cloud architecture ensuring 100% data integrity, encrypted database linkage, and high scalability." }
];

const PLANS = [
  { 
    tier: "Strategic Subdomain", 
    price: "800", 
    original: "1,000", 
    features: ["Custom UI/UX Architecture", "Deployed on Kuku Network", "SEO & Speed Optimized", "Mobile Responsive Priority", "Database Integration"],
    intent: "subdomain_funnel"
  },
  { 
    tier: "Sovereign Domain", 
    price: "1,000", 
    original: "1,400", 
    features: ["All Strategic Features", "Custom Root Domain Ownership", "Enterprise SSL Handshaking", "Business Email Setup", "Dedicated VIP Maintenance"],
    intent: "custom_domain_funnel"
  }
];

const TESTIMONIALS = [
  { name: "Alex V.", role: "CEO, Stratwell Advisory", text: "Sean didn't just build a site; he built a high-speed capture system. Our conversion rate spiked 40% in two weeks.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
  { name: "Quel Ly", role: "Founder, VN Brigade", text: "The aesthetic alone commands authority. It feels like a multi-million dollar infrastructure. Fast, ruthless, and precise.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
  { name: "Sarah J.", role: "Director, SilverCrest", text: "Cleanest inbox management bridge I've ever used. The logic is flawless and the delivery was ahead of schedule.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150" }
];

const FAQ_DATA = [
  { q: "Why is a 50% upfront payment required?", a: "This authorizes the procurement of your infrastructure's neural assets and locks your priority slot. All funds are secured via Contra Escrow." },
  { q: "What is the difference between Strategic and Sovereign tiers?", a: "Strategic ($800) uses our high-speed subdomain network. Sovereign ($1,000) gives you total ownership of a custom root domain and business email servers." },
  { q: "How fast is the deployment cycle?", a: "Subdomain architectures are active within 72 hours. Sovereign builds require 5 business days for manual DNS propagation and SSL linkage." },
  { q: "Do I own the intellectual property?", a: "Yes. 100% IP transfer occurs immediately upon the final milestone payment. You own the code and design assets permanently." }
];

// --- REUSABLE SCROLL ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function KukuPortalsFinal() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', intent: '' });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const linkedinLink = "https://www.linkedin.com/in/sean-rodejo-a429aa377/";

  useEffect(() => {
    const timer = setInterval(() => setHeadlineIndex(p => (p + 1) % HEADLINES.length), 5000); 
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => { clearInterval(timer); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const paginate = (newDir: number) => {
    setDirection(newDir);
    setSlideIndex(prev => (prev + newDir + SLIDES.length) % SLIDES.length);
  };

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.intent) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "funnel_leads"), { ...formData, timestamp: serverTimestamp() });
      setSubmitted(true);
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050506] text-[#F4F1EA] overflow-x-hidden font-sans selection:bg-[#FF1B1B]/40">
      <InternalStyles />
      
      {/* RESTORED BACKGROUND INFRASTRUCTURE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050506]">
        <div className="absolute inset-0 bg-cover bg-center grayscale opacity-[0.15]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050506_100%)]" />
        <div className="absolute inset-0 tech-grid opacity-30" />
        <CodeMeteoriteRain />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,27,27,0.2)_50%,transparent_100%)] bg-[length:100%_1200px]" style={{ animation: 'scanline 12s infinite linear' }} />
      </div>

      {/* TOP PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-[#FF1B1B] origin-left z-[500] shadow-[0_0_20px_#FF1B1B]" style={{ scaleX }} />

      {/* HUD NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[400] flex justify-center transition-all duration-700 ${isScrolled ? 'pt-4' : 'pt-6 md:pt-10'}`}>
        <div className={`w-[96%] max-w-7xl flex justify-between items-center px-4 md:px-10 py-4 md:py-5 transition-all rounded-2xl md:rounded-[2rem] glass-pill nav-border-glow ${isScrolled ? 'shadow-2xl scale-[0.99] bg-black/90' : 'bg-black/60'}`}>
          <div className="flex items-center gap-3 md:gap-6 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="relative hidden sm:block">
               <img src="/kuku.png" alt="Core" className="h-10 md:h-14 grayscale group-hover:grayscale-0 duration-1000 relative z-10" />
               <div className="absolute inset-0 bg-[#FF1B1B] blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="cyberpunk-title font-black text-xl sm:text-2xl md:text-4xl text-white uppercase italic tracking-tighter">KUKU<span className="text-[#FF1B1B]">PORTALS</span></span>
              <span className="text-[7px] md:text-[9px] font-black tracking-[0.4em] md:tracking-[0.6em] text-[#FF1B1B] uppercase mt-1">Authorized Design Unit</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
             <button onClick={() => document.getElementById('booking')?.scrollIntoView({behavior:'smooth'})} className="hidden lg:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/50 hover:text-white transition-all"><Calendar size={16}/> Book Call</button>
             <button onClick={() => setShowForm(true)} className="btn-plasma px-6 py-3 md:px-10 md:py-4 text-[10px] md:text-sm rounded-full shadow-[0_0_20px_rgba(255,27,27,0.3)]">Deploy</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6 text-center pt-24 md:pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="max-w-[1600px] w-full space-y-12 md:space-y-16 relative">
          
          <div className="absolute top-0 left-10 text-[10px] font-mono text-[#FF1B1B] text-left hidden lg:block opacity-50">
             SYS.V18.5 <br/> UPTIME: 99.9% <br/> SECURE UPLINK
          </div>
          <div className="absolute bottom-0 right-10 text-[10px] font-mono text-white/30 text-right hidden lg:block">
             LATENCY: 0.4ms <br/> NODE: ACTIVE
          </div>

          <div className="inline-flex items-center gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-3 border border-white/10 glass-pill text-[#FF1B1B] text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] md:tracking-[1em] rounded-full shadow-2xl"><CheckCircle2 size={14} className="shrink-0" /> <span className="hidden sm:inline">Verified Operator // Sean</span><span className="sm:hidden">Operator Sean</span></div>
          
          <div className="min-h-[120px] sm:min-h-[160px] md:min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1 key={headlineIndex} initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }} transition={{ duration: 0.6 }} className="text-[12vw] sm:text-[12vw] md:text-9xl lg:text-[13rem] xl:text-[15rem] font-black leading-[0.9] md:leading-[0.8] tracking-tighter uppercase italic text-white drop-shadow-2xl">
                {HEADLINES[headlineIndex].split(' ')[0]} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF1B1B] via-[#FF1B1B] to-[#700000]">{HEADLINES[headlineIndex].split(' ')[1]}</span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 w-full px-4">
            <button onClick={() => setShowForm(true)} className="w-full sm:w-auto bg-[#FF1B1B] text-white px-8 py-5 md:px-20 md:py-8 font-black uppercase text-lg md:text-2xl flex items-center justify-center gap-4 md:gap-6 hover:scale-105 transition-all shadow-[0_15px_40px_rgba(255,27,27,0.4)] rounded-xl md:rounded-2xl group">Initiate Protocol <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></button>
            <a href={linkedinLink} target="_blank" className="w-full sm:w-auto border border-white/20 px-8 py-5 md:px-20 md:py-8 font-black uppercase text-lg md:text-2xl flex items-center justify-center gap-4 md:gap-6 hover:border-[#FF1B1B] bg-white/[0.02] backdrop-blur-3xl text-white rounded-xl md:rounded-2xl group">Verify Profile <LinkedInIcon size={24} /></a>
          </div>
        </motion.div>
      </section>

      <InfiniteMarquee />

      {/* ARCHITECT */}
      <section id="architect" className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-3 px-4 md:px-5 py-2 border border-[#FF1B1B] text-[#FF1B1B] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 md:mb-12 rounded-full"><Cpu size={14}/> Lead Protocol Architect</div>
            <h2 className="text-5xl sm:text-6xl md:text-[6rem] font-black uppercase italic tracking-tighter text-white mb-6 md:mb-10 leading-none drop-shadow-lg">The <br/><span className="text-[#FF1B1B]">Architect.</span></h2>
            <p className="text-xl md:text-3xl text-white/60 leading-relaxed font-bold italic mb-10 md:mb-14 max-w-2xl">I am <span className="text-white">Sean</span>. I engineer high-velocity sales infrastructures. My mission is to bridge the gap between aggressive business logic and elite visual aesthetics.</p>
            <div className="grid grid-cols-2 gap-6 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
              <div><h4 className="text-[#FF1B1B] font-black text-4xl sm:text-5xl md:text-7xl mb-2 md:mb-3 cyberpunk-title drop-shadow-[0_0_15px_rgba(255,27,27,0.4)]">100%</h4><p className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] md:tracking-[0.4em] font-black">Retention Velocity</p></div>
              <div><h4 className="text-[#FF1B1B] font-black text-4xl sm:text-5xl md:text-7xl mb-2 md:mb-3 cyberpunk-title drop-shadow-[0_0_15px_rgba(255,27,27,0.4)]">{'<1s'}</h4><p className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] md:tracking-[0.4em] font-black">Load Protocol</p></div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="relative border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] backdrop-blur-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
              
              <div className="flex flex-col gap-8 md:gap-10 relative z-10">
                <div className="flex items-center gap-4"><ShieldCheck className="text-[#FF1B1B] shrink-0" size={24} /><span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/70">Legitimacy Protocol</span></div>
                <div className="h-px w-full bg-gradient-to-r from-[#FF1B1B] to-transparent opacity-50" />
                <div className="flex items-center gap-6 md:gap-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-[#00d3ff]/10 border-2 border-[#00d3ff]/40 rounded-2xl md:rounded-3xl flex items-center justify-center font-black text-[#00d3ff] text-3xl md:text-5xl tracking-tighter shadow-[0_0_30px_rgba(0,211,255,0.2)] cyberpunk-title">C.</div>
                  <div><h5 className="font-black text-2xl md:text-3xl text-white italic tracking-tighter mb-1 md:mb-2">Vetted on Contra</h5><p className="text-[9px] md:text-xs text-white/50 font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]">Identity & Payment Secured</p></div>
                </div>
                <p className="text-sm md:text-lg text-white/40 leading-relaxed font-bold mt-2 md:mt-4">I utilize the Contra framework for contractual legalities. This ensures total client escrow protection and authorizes secure, automated asset delivery.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-40">
        <FadeIn>
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">Infrastructure <span className="text-[#FF1B1B]">Assets</span></h2>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-white/40">Core Competencies</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-md group hover:border-[#FF1B1B]/60 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-10 transition-opacity"><BarChart size={120} className="md:w-[150px] md:h-[150px]" /></div>
                <div className="text-[#FF1B1B] mb-8 md:mb-12 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-[#FF1B1B]/30 rounded-2xl bg-[#FF1B1B]/5 shadow-[0_0_20px_rgba(255,27,27,0.1)] group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="text-2xl md:text-3xl font-black italic uppercase text-white mb-4 md:mb-6 tracking-tighter">{s.title}</h3>
                <p className="text-sm md:text-base text-white/50 font-bold leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-40">
        <FadeIn>
          <div className="text-center mb-16 md:mb-24 space-y-4">
             <h2 className="text-4xl sm:text-5xl md:text-[6rem] font-black uppercase italic tracking-tighter text-white">Financial <span className="text-[#FF1B1B]">Tiers</span></h2>
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-white/40">Authorized Contra & Wise Transactions</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {PLANS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <div className="price-card p-8 sm:p-12 md:p-20 rounded-[2rem] md:rounded-[3.5rem] space-y-10 md:space-y-12 relative overflow-hidden group">
                 <div className="flex flex-col gap-6 md:gap-8 w-full">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic text-white tracking-tighter leading-none">{p.tier}</h3>
                    <div className="flex flex-col text-left">
                       <span className="text-white/30 line-through font-black text-xl md:text-2xl mb-1 md:mb-2">${p.original}</span>
                       <span className="text-5xl sm:text-6xl md:text-7xl font-black text-[#FF1B1B] cyberpunk-title drop-shadow-[0_0_15px_rgba(255,27,27,0.4)] leading-none">${p.price}</span>
                    </div>
                 </div>
                 <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
                 <ul className="space-y-4 md:space-y-6">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-4 md:gap-6 text-white/60 font-bold uppercase text-xs sm:text-sm md:text-base tracking-widest"><CheckCircle2 size={20} className="text-[#FF1B1B] shrink-0 md:w-[24px] md:h-[24px]" /> {f}</li>
                    ))}
                 </ul>
                 <button onClick={() => { setShowForm(true); setFormData({...formData, intent: `Inquiry for ${p.tier}`})}} className="w-full py-6 md:py-8 border-2 border-white/10 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-sm tracking-[0.3em] md:tracking-[0.5em] text-white/70 group-hover:border-[#FF1B1B] group-hover:text-white group-hover:bg-[#FF1B1B]/10 transition-all shadow-lg">Secure This Tier</button>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.4}>
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             <div className="glass-pill p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center gap-4 md:gap-6 border border-white/10 hover:border-[#FF1B1B]/30 transition-colors">
                <BadgeDollarSign size={40} className="text-[#FF1B1B] md:w-[48px] md:h-[48px]" />
                <h4 className="text-xl md:text-2xl font-black uppercase italic text-white tracking-tighter">50% Downpayment</h4>
                <p className="text-xs md:text-sm text-white/40 font-bold leading-relaxed">Secure your slot with a 50% upfront deposit. Final payment is released upon 100% infrastructure completion.</p>
             </div>
             <div className="glass-pill p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center gap-4 md:gap-6 border border-white/10 hover:border-[#FF1B1B]/30 transition-colors">
                <ShieldCheck size={40} className="text-[#FF1B1B] md:w-[48px] md:h-[48px]" />
                <h4 className="text-xl md:text-2xl font-black uppercase italic text-white tracking-tighter">Escrow Secured</h4>
                <p className="text-xs md:text-sm text-white/40 font-bold leading-relaxed">Payments handled through Contra for maximum legality, IP protection, and peace of mind.</p>
             </div>
             <div className="glass-pill p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center gap-4 md:gap-6 border border-white/10 hover:border-[#FF1B1B]/30 transition-colors">
                <FileText size={40} className="text-[#FF1B1B] md:w-[48px] md:h-[48px]" />
                <h4 className="text-xl md:text-2xl font-black uppercase italic text-white tracking-tighter">Design Brief</h4>
                <p className="text-xs md:text-sm text-white/40 font-bold leading-relaxed">After submission, you access the terminal to provide deep funnel customization and visual intent.</p>
             </div>
          </div>
        </FadeIn>
      </section>

      {/* SLIDESHOW */}
      <section id="modules" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pb-32 md:pb-64">
        <FadeIn>
          <div className="relative h-[500px] sm:h-[650px] md:h-[950px] w-full overflow-hidden border border-white/10 bg-[#050506] shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-[2rem] md:rounded-3xl group">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={slideIndex} custom={direction} initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: direction < 0 ? "100%" : "-100%", opacity: 0 }} transition={{ type: "spring", stiffness: 150, damping: 25 }} className="absolute inset-0">
                <img src={SLIDES[slideIndex].img} className="w-full h-full object-cover opacity-30 grayscale mix-blend-screen" alt="" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-32 bg-gradient-to-t from-black via-black/80 to-transparent text-left">
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                    <div className="flex items-center gap-4 md:gap-6 text-[#FF1B1B] font-black tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-xs mb-4 md:mb-8"><div className="h-px w-16 md:w-32 bg-[#FF1B1B]"></div> MODULE 0{SLIDES[slideIndex].id}</div>
                    <h2 className="text-4xl sm:text-5xl md:text-[9rem] lg:text-[11rem] font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-2xl">{SLIDES[slideIndex].title}</h2>
                    <p className="text-white/50 text-xs sm:text-base md:text-3xl uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] max-w-5xl leading-relaxed mt-4 md:mt-6">{SLIDES[slideIndex].desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-10 right-4 md:right-10 flex justify-between z-50 pointer-events-none">
              <button onClick={() => paginate(-1)} className="p-4 sm:p-6 md:p-10 bg-black/80 border border-white/10 text-white transition-all pointer-events-auto hover:bg-[#FF1B1B] hover:scale-110 rounded-full shadow-2xl backdrop-blur-md"><ChevronLeft size={24} className="md:w-[44px] md:h-[44px]" /></button>
              <button onClick={() => paginate(1)} className="p-4 sm:p-6 md:p-10 bg-black/80 border border-white/10 text-white transition-all pointer-events-auto hover:bg-[#FF1B1B] hover:scale-110 rounded-full shadow-2xl backdrop-blur-md"><ChevronRight size={24} className="md:w-[44px] md:h-[44px]" /></button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* SYNC WITH SEAN (CALENDLY) */}
      <section id="booking" className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn>
            <div className="space-y-6 md:space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 md:gap-4 px-4 py-2 md:px-5 md:py-2 border border-[#FF1B1B]/40 rounded-full bg-[#FF1B1B]/10 text-[#FF1B1B] text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,27,27,0.2)]"><Activity size={14} className="md:w-[16px] md:h-[16px] animate-pulse" /> Synchronicity Uplink</div>
              <h2 className="text-5xl sm:text-6xl md:text-[7rem] font-black uppercase italic tracking-tighter text-white leading-none">Sync with <br className="hidden lg:block"/><span className="text-[#FF1B1B]">Sean.</span></h2>
              <p className="text-lg md:text-2xl text-white/50 font-bold leading-relaxed max-w-xl mx-auto lg:mx-0">Book a tactical strategy session to calibrate your funnel's exact ROI targets and technical requirements.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-full h-[500px] md:h-[650px] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black/50 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative p-2">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FF1B1B]/5 to-transparent pointer-events-none" />
              <iframe src="https://calendly.com/seanrodejo15/30min" width="100%" height="100%" frameBorder="0" className="rounded-[1.5rem] md:rounded-[2.5rem]"></iframe>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LOGS */}
      <section id="logs" className="relative z-10 max-w-6xl mx-auto px-6 pb-32 md:pb-64 space-y-24 md:space-y-40">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-5xl sm:text-6xl md:text-[8rem] font-black italic uppercase text-white tracking-tighter leading-none">Verified <br/> <span className="text-[#FF1B1B]">Logs</span></h2>
            <div className="h-1 md:h-1.5 w-32 md:w-48 bg-[#FF1B1B] mt-8 md:mt-12 shadow-[0_0_15px_#FF1B1B]"></div>
          </div>
        </FadeIn>
        <div className="flex flex-col gap-16 md:gap-32">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="group relative w-full bg-white/[0.02] backdrop-blur-[120px] border border-white/10 p-8 sm:p-12 md:p-32 rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl hover:border-[#FF1B1B]/40 transition-all duration-700">
                <Quote className="absolute -top-4 -right-4 md:-top-10 md:-right-10 text-white/[0.02] group-hover:text-[#FF1B1B]/5 transition-all duration-1000 w-[200px] h-[200px] md:w-[600px] md:h-[600px]" />
                <div className="relative z-10 flex flex-col gap-8 md:gap-16">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                    <div className="w-24 h-24 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-[#FF1B1B] p-1.5 md:p-2 shadow-[0_0_30px_rgba(255,27,27,0.3)]">
                      <img src={t.avatar} className="w-full h-full rounded-full grayscale group-hover:grayscale-0 transition-all object-cover" alt="" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-3xl md:text-6xl italic text-white mb-2 md:mb-4 leading-none tracking-tighter">{t.name}</h4>
                      <p className="text-xs md:text-base font-black text-[#FF1B1B] uppercase tracking-[0.4em] md:tracking-[0.8em]">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-white/60 font-bold leading-relaxed italic text-lg md:text-5xl max-w-6xl">"{t.text}"</p>
                  <div className="flex gap-4 md:gap-6">{[...Array(5)].map((_, j) => <Star key={j} size={24} className="md:w-[40px] md:h-[40px] fill-[#FF1B1B] text-[#FF1B1B] drop-shadow-[0_0_10px_#FF1B1B]" />)}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* DEFENSE FAQ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-40">
        <FadeIn>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-[6rem] font-black uppercase italic text-white tracking-tighter leading-none">Tactical <span className="text-[#FF1B1B]">FAQ</span></h2>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] md:tracking-[1em] text-white/40 mt-6 md:mt-8">Defense Protocol Layer</p>
          </div>
        </FadeIn>
        <div className="space-y-4 md:space-y-6">
          {FAQ_DATA.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="faq-card rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-6 md:p-10 flex justify-between items-center text-left">
                  <span className="text-xs md:text-lg font-black uppercase tracking-widest text-white pr-4 md:pr-8 leading-relaxed">{item.q}</span>
                  {activeFaq === idx ? <X size={20} className="md:w-[28px] md:h-[28px] text-[#FF1B1B] shrink-0" /> : <Plus size={20} className="md:w-[28px] md:h-[28px] text-white/30 shrink-0" />}
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 md:px-10 md:pb-10">
                      <p className="text-sm md:text-xl text-white/50 font-bold leading-relaxed border-t border-white/10 pt-6 md:pt-8 italic">"{item.a}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-32 md:py-64 border-t border-white/5 bg-gradient-to-t from-black to-[#050506] text-center px-6">
        <FadeIn>
          <div className="flex flex-col items-center gap-16 md:gap-20">
            <img src="/kuku.png" alt="Kuku" className="h-24 md:h-48 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />
            <div className="flex flex-wrap justify-center gap-8 md:gap-32 text-[10px] md:text-sm font-black uppercase tracking-[1em] md:tracking-[1.5em] text-white/30">
              <a href="https://m.me/sean.rodejo" target="_blank" className="hover:text-[#FF1B1B] transition-colors">Messenger Link</a>
              <a href={linkedinLink} target="_blank" className="hover:text-[#FF1B1B] transition-colors">LinkedIn Portal</a>
              <a href="https://contra.com/sean_rodejo_a429aa377" target="_blank" className="hover:text-[#FF1B1B] transition-colors">Vetted on Contra</a>
            </div>
            <p className="text-[8px] md:text-xs font-black uppercase tracking-[2em] md:tracking-[5em] text-white/20 italic mt-12 md:mt-20">Lead Operator: Sean // Built 2026</p>
          </div>
        </FadeIn>
      </footer>

      {/* INTAKE MODAL - Mobile Optimized */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-3xl overflow-hidden">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-2xl bg-[#080809] border border-white/10 p-8 md:p-20 relative rounded-[2rem] md:rounded-[3rem] shadow-[0_0_50px_rgba(255,27,27,0.15)] overflow-y-auto max-h-[90vh]">
              {!submitted && (
                <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 md:top-10 md:right-10 text-white/20 hover:text-[#FF1B1B] transition-colors"><X size={28} className="md:w-[40px] md:h-[40px]" /></button>
              )}
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-8 md:mb-14 pr-8">
                      <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1 md:px-4 md:py-1 border border-[#FF1B1B]/40 rounded-full bg-[#FF1B1B]/10 text-[#FF1B1B] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6"><Zap size={12} className="md:w-[14px] md:h-[14px]"/> Fast-Track Protocol</div>
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic uppercase text-white tracking-tighter leading-none">Initiate <br/><span className="text-[#FF1B1B]">Build.</span></h2>
                    </div>
                    <form className="space-y-6 md:space-y-10" onSubmit={handleSubmission}>
                      <div className="space-y-2 md:space-y-3">
                         <label className="text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-[0.3em] md:tracking-[0.5em] ml-2">Signature</label>
                         <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 p-4 md:p-6 rounded-xl md:rounded-2xl text-white outline-none focus:border-[#FF1B1B] font-bold text-lg md:text-xl uppercase tracking-widest transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                         <label className="text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-[0.3em] md:tracking-[0.5em] ml-2">Uplink Address</label>
                         <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 p-4 md:p-6 rounded-xl md:rounded-2xl text-white outline-none focus:border-[#FF1B1B] font-bold text-lg md:text-xl uppercase tracking-widest transition-all" placeholder="EMAIL@DOMAIN.COM" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                         <label className="text-[9px] md:text-[10px] font-black uppercase text-white/40 tracking-[0.3em] md:tracking-[0.5em] ml-2">Architecture Intent</label>
                         <textarea required value={formData.intent} onChange={(e) => setFormData({...formData, intent: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 p-4 md:p-6 rounded-xl md:rounded-2xl text-white outline-none focus:border-[#FF1B1B] font-bold h-24 md:h-40 text-lg md:text-xl uppercase tracking-widest transition-all resize-none" placeholder="Briefly describe your project..." />
                      </div>
                      <button disabled={isSubmitting} className="w-full btn-plasma py-6 md:py-8 rounded-xl md:rounded-2xl font-black uppercase text-lg md:text-2xl flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-8 shadow-[0_15px_40px_rgba(255,27,27,0.3)]">
                        {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <>Initialize Uplink <Send size={24} className="md:w-[32px] md:h-[32px]" /></>}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-16 md:py-24 text-center space-y-8 md:space-y-12">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FF1B1B]/10 border-2 border-[#FF1B1B] rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(255,27,27,0.4)]">
                      <CheckCircle2 size={48} className="md:w-[64px] md:h-[64px] text-[#FF1B1B]" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white tracking-tighter leading-none">Transmission <br/><span className="text-[#FF1B1B]">Locked.</span></h2>
                      <p className="text-white/40 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-4 md:mt-6 text-xs md:text-sm leading-relaxed max-w-sm mx-auto">Uplink Successful. Access the secure terminal to provide exact funnel customizations.</p>
                    </div>
                    <button 
                      onClick={() => router.push('/brief')} 
                      className="w-full py-6 md:py-8 bg-white text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-lg rounded-xl md:rounded-2xl flex items-center justify-center gap-3 md:gap-4 hover:bg-[#FF1B1B] hover:text-white transition-all cursor-pointer shadow-2xl"
                    >
                       Deploy Design Brief <ExternalLink size={20} className="md:w-[24px] md:h-[24px]" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
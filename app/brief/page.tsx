"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Palette, 
  Globe, 
  Target, 
  ArrowRight, 
  Zap, 
  Lock, 
  ChevronLeft,
  CreditCard,
  FileText,
  BadgeDollarSign,
  Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// FIREBASE IMPORT
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * KUKU PORTALS - DESIGN BRIEF PORTAL (V2.7)
 * Operator: Sean
 * Patch: Client Identity Linkage (Zero Removals)
 */

const InternalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
    html { scroll-behavior: smooth; }
    @keyframes codeFall { 0% { transform: translateY(-100%); opacity: 0; } 5% { opacity: 0.7; } 95% { opacity: 0.7; } 100% { transform: translateY(100vh); opacity: 0; } }
    .cyberpunk-title { font-family: 'Orbitron', sans-serif; letter-spacing: -0.02em; }
    .glass-brief { 
      background: rgba(8, 8, 9, 0.8); 
      backdrop-filter: blur(80px); 
      border: 1px solid rgba(255, 255, 255, 0.05); 
    }
    .neon-text-red { text-shadow: 0 0 10px #ff1b1b; }
    .input-focus:focus { border-color: #ff1b1b; box-shadow: 0 0 15px rgba(255, 27, 27, 0.2); }
  `}} />
);

const CodeMeteoriteRain = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const rainDrops = useMemo(() => Array.from({ length: 20 }, (_, i) => ({ column: (i * 5) + Math.random() * 2, delay: Math.random() * 5, duration: 8 + Math.random() * 10 })), []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      {rainDrops.map((drop, index) => (
        <div key={index} className="absolute text-[10px] font-mono" style={{ left: `${drop.column}%`, top: `-20vh`, animation: `codeFall ${drop.duration}s ${drop.delay}s infinite linear`, color: '#F4F1EA' }}>
          {Array.from({ length: 10 }).map((_, charIdx) => (
            <div key={charIdx} style={{ opacity: 1 - (charIdx / 10), color: charIdx === 0 ? '#FFFFFF' : '#444444' }}>{["0", "1", "A", "F"][Math.floor(Math.random() * 4)]}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function DesignBrief() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [clientIdentity, setClientIdentity] = useState({ name: 'Unknown Client', email: '' });

  const [formData, setFormData] = useState({
    aesthetic: '',
    tier: 'Subdomain ($800)',
    goals: ''
  });

  // IDENTITY EXTRACTION: Pull client data from browser memory upon loading
  useEffect(() => {
    const storedName = localStorage.getItem('kuku_client_name');
    const storedEmail = localStorage.getItem('kuku_client_email');
    if (storedName && storedEmail) {
      setClientIdentity({ name: storedName, email: storedEmail });
    }
  }, []);

  const handleBriefSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
      await addDoc(collection(db, "briefing_logs"), {
        ...formData,
        name: clientIdentity.name,   // IDENTITY ATTACHED
        email: clientIdentity.email, // IDENTITY ATTACHED
        timestamp: serverTimestamp(),
        status: "Payment Pending"
      });

      await new Promise(resolve => setTimeout(resolve, 600)); 

      if (formData.tier.includes('800')) {
        window.location.href = "https://contra.com/s/clZEqOOQ-strategic-subdomain-funnel-architecture";
      } else {
        window.location.href = "https://contra.com/s/orFrcBEk-sovereign-domain-funnel-architecture";
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setIsSubmitting(false); 
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050506] text-[#F4F1EA] overflow-x-hidden font-sans selection:bg-[#FF1B1B]/40">
      <InternalStyles />
      
      {/* 1. BACKGROUND INFRASTRUCTURE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050506_100%)]" />
        <CodeMeteoriteRain />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* NAV BACK */}
        <button 
          onClick={() => router.push('/')}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-[#FF1B1B] transition-all mb-8 md:mb-12"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Return to Uplink
        </button>

        {/* HEADER BLOCK */}
        <header className="space-y-4 md:space-y-6 mb-12 md:mb-20 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2 border border-[#FF1B1B]/20 rounded-full bg-[#FF1B1B]/5 text-[#FF1B1B] text-[8px] md:text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} /> Authorization Verified // Sean Rodejo
          </motion.div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">
            Design <span className="text-[#FF1B1B] neon-text-red">Brief.</span>
          </motion.h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs max-w-2xl mx-auto md:mx-0">Translate your business requirements into elite digital infrastructure.</p>
        </header>

        {/* FINANCIAL SUMMARY / TRUST CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-brief p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-l-4 border-l-[#FF1B1B]">
             <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 text-[#FF1B1B]">
                <BadgeDollarSign size={24} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
                <h4 className="font-black uppercase italic text-lg md:text-xl">Deposit Required</h4>
             </div>
             <p className="text-xs md:text-sm text-white/30 leading-relaxed font-medium">To initiate the architecture phase, a <span className="text-white">50% upfront deposit</span> is mandatory. This secures your slot in the deployment queue and authorizes immediate asset procurement.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass-brief p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem]">
             <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 text-white">
                <Lock size={24} className="text-[#FF1B1B] w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
                <h4 className="font-black uppercase italic text-lg md:text-xl">Escrow Protocol</h4>
             </div>
             <p className="text-xs md:text-sm text-white/30 leading-relaxed font-medium">100% of your payment is held in <span className="text-white">Escrow via Contra</span>. Funds are only released to Operator Sean upon your total satisfaction with the infrastructure build.</p>
          </motion.div>
        </div>

        {/* MAIN CUSTOMIZATION TERMINAL */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          className="glass-brief p-6 md:p-16 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Zap size={300} className="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
          </div>

          <form className="space-y-12 md:space-y-16 relative z-10" onSubmit={handleBriefSubmission}>
            
            {/* STEP 01: AESTHETICS */}
            <div className="space-y-6 md:space-y-8">
               <div className="flex items-center gap-3 md:gap-4 text-[#FF1B1B] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[10px]">
                  <Palette size={16} className="md:w-[18px] md:h-[18px]" /> 01 // Visual Identity Intent
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] md:text-[10px] font-black uppercase text-white/20 tracking-widest ml-1">Color Palette & Brand Vibe</label>
                 <textarea 
                  required
                  value={formData.aesthetic}
                  onChange={(e) => setFormData({...formData, aesthetic: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl text-white outline-none input-focus font-bold text-base md:text-xl h-32 md:h-40 transition-all resize-none" 
                  placeholder="Example: Cyberpunk Red/Black, Minimalist White/Gold, Dark Mode Enterprise..." 
                 />
               </div>
            </div>

            {/* STEP 02: TIER SELECTION */}
            <div className="space-y-6 md:space-y-8">
               <div className="flex items-center gap-3 md:gap-4 text-[#FF1B1B] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[10px]">
                  <Globe size={16} className="md:w-[18px] md:h-[18px]" /> 02 // Deployment Target
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                 {['Subdomain Build ($800)', 'Custom Domain Build ($1,000)'].map((t) => (
                   <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({...formData, tier: t})}
                    className={`p-6 md:p-8 rounded-xl md:rounded-2xl border font-black uppercase text-xs md:text-sm tracking-widest transition-all ${formData.tier === t ? 'bg-[#FF1B1B] border-[#FF1B1B] text-white shadow-[0_0_20px_rgba(255,27,27,0.3)] md:shadow-[0_0_30px_rgba(255,27,27,0.3)]' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                   >
                     {t}
                   </button>
                 ))}
               </div>
            </div>

            {/* STEP 03: GOALS */}
            <div className="space-y-6 md:space-y-8">
               <div className="flex items-center gap-3 md:gap-4 text-[#FF1B1B] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[10px]">
                  <Target size={16} className="md:w-[18px] md:h-[18px]" /> 03 // Revenue & Conversion Logic
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] md:text-[10px] font-black uppercase text-white/20 tracking-widest ml-1">Funnel Goal</label>
                 <textarea 
                  required
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl text-white outline-none input-focus font-bold text-base md:text-xl h-32 md:h-40 transition-all resize-none" 
                  placeholder="Who is the target audience? What action should they take? (Buy, Call, Sign up)" 
                 />
               </div>
            </div>

            {/* FINAL ACTION: CONTRA PAYMENT GATEWAY */}
            <div className="pt-8 md:pt-10 space-y-6 md:space-y-8">
               <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
               <div className="text-center space-y-8 md:space-y-10">
                 <div className="space-y-2">
                    <h3 className="font-black text-xl md:text-2xl uppercase italic text-white">Authorize Initial Transmission</h3>
                    <p className="text-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Final Step: Secure Escrow Authorization</p>
                 </div>
                 
                 <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 md:py-10 bg-[#FF1B1B] text-white rounded-2xl md:rounded-[2rem] font-black uppercase text-lg md:text-3xl flex items-center justify-center gap-4 md:gap-10 hover:bg-white hover:text-black transition-all shadow-[0_15px_40px_rgba(255,27,27,0.4)] md:shadow-[0_20px_60px_rgba(255,27,27,0.4)] group disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isSubmitting ? (
                     <>Securing Uplink... <Loader2 size={28} className="animate-spin md:w-[36px] md:h-[36px]" /></>
                   ) : (
                     <>Authorize & Deploy <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform md:w-[36px] md:h-[36px]" /></>
                   )}
                 </button>

                 <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-12 pt-2 md:pt-4">
                    <div className="flex items-center gap-2 md:gap-3 text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                       <CreditCard size={14} className="text-[#FF1B1B]" /> Secure via Contra
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                       <FileText size={14} className="text-[#FF1B1B]" /> Legal Contract Protection
                    </div>
                 </div>
               </div>
            </div>

          </form>
        </motion.section>

        {/* FOOTER SIG */}
        <footer className="mt-12 md:mt-20 text-center space-y-4 opacity-20">
           <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] md:tracking-[1em]">Operator: Sean // Secure Infrastructure Portal</p>
        </footer>
      </div>

    </main>
  );
}
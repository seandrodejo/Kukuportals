"use client";

import React, { useState, useEffect } from 'react';
import { 
  db 
} from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  Trash2, 
  ExternalLink, 
  ShieldCheck, 
  RefreshCcw, 
  Terminal, 
  Database, 
  User, 
  Mail, 
  MessageSquare,
  Clock,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * KUKU PORTALS - ADMIN COMMAND CENTER (V1.4)
 * Lead Operator: Sean
 * Protocol: Real-time Identity Extraction
 */

interface Lead {
  id: string;
  type: 'Initial Lead' | 'Design Brief';
  timestamp: Date; 
  name?: string;
  email?: string;
  intent?: string;
  aesthetic?: string;
  tier?: string;
  goals?: string;
  status?: string;
}

const AdminStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
    
    .cyberpunk-font { font-family: 'Orbitron', sans-serif; }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.01);
      backdrop-filter: blur(40px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .neon-border-red {
      box-shadow: 0 0 15px rgba(255, 27, 27, 0.1);
      border: 1px solid rgba(255, 27, 27, 0.2);
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #ff1b1b; border-radius: 10px; }
  `}} />
);

export default function AdminPortal() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLeads = async () => {
    setIsRefreshing(true);
    try {
      const [leadsSnap, briefsSnap] = await Promise.all([
        getDocs(query(collection(db, "funnel_leads"), orderBy("timestamp", "desc"))),
        getDocs(query(collection(db, "briefing_logs"), orderBy("timestamp", "desc")))
      ]);

      const leadsData = leadsSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: 'Initial Lead',
          ...data,
          timestamp: data.timestamp?.toDate() || new Date()
        };
      });

      const briefsData = briefsSnap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: 'Design Brief',
          ...data,
          timestamp: data.timestamp?.toDate() || new Date()
        };
      });

      const combinedData = [...leadsData, ...briefsData].sort((a, b) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      });

      setLeads(combinedData as Lead[]);
    } catch (error) {
      console.error("Access Denied / Firebase Error:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const deleteLead = async (id: string, type: string) => {
    if (!confirm("Confirm Deletion of Asset?")) return;
    try {
      const collectionName = type === 'Design Brief' ? "briefing_logs" : "funnel_leads";
      await deleteDoc(doc(db, collectionName, id));
      setLeads(leads.filter(lead => lead.id !== id));
    } catch (error) {
      alert("Encryption Error: Could not delete.");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <main className="min-h-screen bg-[#050506] text-[#F4F1EA] p-6 md:p-12 font-sans selection:bg-[#FF1B1B]/40">
      <AdminStyles />
      
      {/* 1. HEADER HUD */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#FF1B1B]/10 rounded-2xl flex items-center justify-center border border-[#FF1B1B]/30 shadow-[0_0_20px_rgba(255,27,27,0.2)]">
            <Terminal className="text-[#FF1B1B]" size={32} />
          </div>
          <div>
            <h1 className="cyberpunk-font text-3xl md:text-5xl uppercase italic tracking-tighter text-white">
              Lead <span className="text-[#FF1B1B]">Terminal</span>
            </h1>
            <div className="flex items-center gap-3 mt-1 opacity-40">
              <ShieldCheck size={12} className="text-[#FF1B1B]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operator Session: Sean // Active</span>
            </div>
          </div>
        </div>

        <button 
          onClick={fetchLeads}
          disabled={isRefreshing}
          className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <RefreshCcw size={14} className={isRefreshing ? "animate-spin" : ""} />
          Sync Database
        </button>
      </header>

      {/* 2. STATS OVERVIEW */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-8 rounded-3xl neon-border-red">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Total Uplinks</p>
          <h2 className="text-6xl font-black italic text-white cyberpunk-font">{leads.length}</h2>
        </div>
        <div className="glass-card p-8 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Database Health</p>
          <div className="flex items-center gap-4">
             <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF1B1B] w-[100%]" />
             </div>
             <span className="text-white font-black">100%</span>
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">System Node</p>
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Firestore-V1.4</h3>
        </div>
      </section>

      {/* 3. DATA GRID */}
      <section className="max-w-7xl mx-auto">
        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Timestamp</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Signature (Name)</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Uplink (Email)</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Intent (Purpose)</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {leads.length > 0 ? (
                    leads.map((lead) => (
                      <motion.tr 
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`transition-colors ${lead.type === 'Design Brief' ? 'bg-white/[0.04] hover:bg-white/[0.06]' : 'hover:bg-white/[0.02]'}`}
                      >
                        <td className="p-6 whitespace-nowrap">
                          <div className="flex items-center gap-3 text-white/60 text-xs font-bold">
                            <Clock size={12} className={lead.type === 'Design Brief' ? 'text-[#00d3ff]' : 'text-[#FF1B1B]'} />
                            {lead.timestamp.toLocaleDateString()}
                          </div>
                        </td>
                        
                        {/* CONDITIONAL SIGNATURE RENDER: Now shows the actual client's name from Local Storage */}
                        <td className="p-6">
                          <div className="text-white font-black text-sm uppercase tracking-tight flex items-center gap-2">
                            {lead.type === 'Design Brief' ? (
                              <><FileText size={14} className="opacity-80 text-[#00d3ff]" /> {lead.name || "AUTHORIZED BRIEF"}</>
                            ) : (
                              <><User size={14} className="opacity-30" /> {lead.name}</>
                            )}
                          </div>
                        </td>

                        {/* CONDITIONAL UPLINK RENDER: Now shows the Tier AND the Client's Email */}
                        <td className="p-6">
                          {lead.type === 'Design Brief' ? (
                            <div className="flex flex-col gap-2">
                              <span className="text-white/80 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 border border-white/10 px-3 py-1 rounded-full bg-white/5 w-fit">
                                <Database size={12} className="opacity-50 text-white" /> {lead.tier}
                              </span>
                              {lead.email && (
                                <a href={`mailto:${lead.email}`} className="text-[#00d3ff] font-bold text-xs hover:underline flex items-center gap-2">
                                  <Mail size={12} className="opacity-50" /> {lead.email}
                                </a>
                              )}
                            </div>
                          ) : (
                            <a href={`mailto:${lead.email}`} className="text-[#FF1B1B] font-bold text-sm hover:underline flex items-center gap-2">
                              <Mail size={14} className="opacity-30 text-white" /> {lead.email}
                            </a>
                          )}
                        </td>

                        {/* CONDITIONAL INTENT RENDER */}
                        <td className="p-6 min-w-[300px]">
                          <div className="text-white/40 text-sm leading-relaxed max-h-20 overflow-y-auto pr-4">
                            {lead.type === 'Design Brief' ? (
                              <div className="space-y-1">
                                <span className="text-[#00d3ff] font-bold text-[10px] uppercase tracking-widest block">Vibe: {lead.aesthetic}</span>
                                <span className="block text-white/60">"{lead.goals}"</span>
                              </div>
                            ) : (
                              `"${lead.intent}"`
                            )}
                          </div>
                        </td>

                        {/* ACTIONS */}
                        <td className="p-6">
                          <div className="flex justify-center items-center gap-4">
                            <button 
                              onClick={() => deleteLead(lead.id, lead.type)}
                              className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/30 hover:text-[#FF1B1B] hover:border-[#FF1B1B]/40 hover:bg-[#FF1B1B]/5 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-20 text-center text-white/20 font-black uppercase tracking-[1em]">
                        {loading ? "Decrypting..." : "No Data Uplinks Found"}
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. BACKGROUND GRID (Subtle Admin Version) */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

    </main>
  );
}
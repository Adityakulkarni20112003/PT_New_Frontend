"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  ChevronRight, 
  Target, 
  BarChart3, 
    Activity,
    Layers,
    Globe2,
    Cpu,
    ArrowRight,
    Info,
    X,
    Plus,
    Target as ResistanceIcon
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ReferenceLine
} from "recharts";

// --- Mock Data ---

const MCX_HISTORY = [
  { date: "Jan 10", price: 210.5, ma30: 208.2, projection: null },
  { date: "Jan 15", price: 212.8, ma30: 209.5, projection: null },
  { date: "Jan 20", price: 211.2, ma30: 210.1, projection: null },
  { date: "Jan 25", price: 213.4, ma30: 211.5, projection: null },
  { date: "Jan 30", price: 214.45, ma30: 212.2, projection: 214.45 },
  { date: "Feb 05", price: null, ma30: null, projection: 215.8 },
  { date: "Feb 10", price: null, ma30: null, projection: 217.2 },
  { date: "Feb 15", price: null, ma30: null, projection: 218.5 },
];

const LME_CURVE = [
  { term: "Spot", price: 3257.66 },
  { term: "3-Month", price: 3288.50 },
  { term: "6-Month", price: 3315.20 },
  { term: "15-Month", price: 3380.00 },
];

const ARBITRAGE_DATA = [
  { date: "Jan 20", spread: 12.5 },
  { date: "Jan 22", spread: 14.2 },
  { date: "Jan 24", spread: 11.8 },
  { date: "Jan 26", spread: 15.5 },
  { date: "Jan 28", spread: 18.2 },
  { date: "Jan 30", spread: 16.8 },
];

// --- Sub-components ---

const KPI = ({ label, value, subValue, trend, icon: Icon }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm group hover:border-indigo-100 transition-colors">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-colors">
        <Icon size={18} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {trend.toUpperCase()}
        </div>
      )}
    </div>
    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-xl font-black text-zinc-900 tracking-tight">{value}</p>
    {subValue && <p className="text-[10px] font-bold text-zinc-500 mt-1">{subValue}</p>}
  </div>
);

const MarketDisclaimer = () => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 flex items-start gap-3 relative overflow-hidden"
    >
      <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
        <AlertCircle size={20} />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-amber-900 mb-1">Market Risk Advisory</h4>
        <p className="text-xs text-amber-700 leading-relaxed max-w-3xl">
          Trading in commodity futures involves substantial risk. Technical indicators and AI projections are based on historical data and do not guarantee future performance. Ensure your risk management protocols are active before executing trades based on these signals.
        </p>
      </div>
      <button onClick={() => setIsVisible(false)} className="p-1 hover:bg-amber-200 rounded-lg text-amber-900/50 transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  );
};

// --- Main Views ---

const MCXView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPI label="RSI (14)" value="62.4" subValue="Bullish Neutral" trend="up" icon={Activity} />
      <KPI label="Support (S1)" value="₹211.20" subValue="Major Level" icon={Target} />
      <KPI label="Resistance (R1)" value="₹218.50" subValue="Breakout Level" icon={ResistanceIcon} />
      <KPI label="vs 30D Average" value="+1.85%" subValue="Trading Above MA" trend="up" icon={BarChart3} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-black text-zinc-900 tracking-tight">Technical Analysis & AI Projection</h3>
            <p className="text-xs text-zinc-500 font-medium">MCX Aluminium FEB 2026 Contract</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-indigo-600 rounded-full" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Price</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-indigo-600/30 rounded-full" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">AI Projection</span>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MCX_HISTORY}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
              <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                labelStyle={{ fontWeight: 800, marginBottom: '4px', fontSize: '12px' }}
              />
              <ReferenceLine y={211.20} label={{ position: 'right', value: 'S1', fill: '#94a3b8', fontSize: 10 }} stroke="#f1f5f9" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              <Line type="monotone" dataKey="projection" stroke="#4f46e5" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#4f46e5' }} />
              <Line type="monotone" dataKey="ma30" stroke="#94a3b8" strokeWidth={1} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">Market Structure</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400">Structure</span>
              <span className="text-xs font-black text-white px-2 py-0.5 bg-zinc-800 rounded-md">CONTANGO</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400">Spread (FEB-MAR)</span>
              <span className="text-xs font-black text-indigo-400">₹1.65</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400">Open Interest Δ</span>
              <span className="text-xs font-black text-emerald-400">+4.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400">Volume Δ</span>
              <span className="text-xs font-black text-emerald-400">+12.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Domestic Fundamentals</h3>
          <div className="space-y-5">
            {[
              { label: "Hindalco Price", value: "₹218,500" },
              { label: "Import Parity Gap", value: "+₹2.45/kg", note: "Import Advantage" },
              { label: "USD/INR Ref", value: "83.1560" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">{item.label}</p>
                  {item.note && <p className="text-[9px] text-indigo-500 font-bold">{item.note}</p>}
                </div>
                <p className="text-sm font-black text-zinc-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
          <Cpu className="w-6 h-6 text-indigo-100" />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">AI Trading & Procurement Signals</h3>
          <p className="text-indigo-100/60 text-xs font-medium">Real-time model inference based on multi-exchange sentiment</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Trend Direction", value: "BULLISH", sub: "Strong Technical Support", color: "text-emerald-300" },
          { label: "Momentum Strength", value: "HIGH", sub: "RSI & Volume Divergence", color: "text-indigo-100" },
          { label: "Hedge Bias", value: "INCREASE", sub: "Accumulate at ₹212-214", color: "text-amber-300" },
          { label: "Procurement", value: "ACCELERATE", sub: "LME Contango widening", color: "text-indigo-100" },
        ].map((signal, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">{signal.label}</p>
            <p className={`text-2xl font-black mb-1 ${signal.color}`}>{signal.value}</p>
            <p className="text-[10px] font-bold text-indigo-100/40">{signal.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LMEView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPI label="LME RSI (14)" value="58.2" subValue="Neutral" trend="up" icon={Activity} />
      <KPI label="Support (S1)" value="$3,210" subValue="Daily Pivot" icon={Target} />
      <KPI label="Resistance (R1)" value="$3,345" subValue="Recent Peak" icon={Zap} />
      <KPI label="vs 30D Average" value="+0.92%" subValue="Consolidating" trend="up" icon={BarChart3} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-black text-zinc-900 tracking-tight">LME Price Curve Visualization</h3>
            <p className="text-xs text-zinc-500 font-medium">Spot to 15-Month Forward Pricing</p>
          </div>
          <div className="px-3 py-1 bg-indigo-50 rounded-full">
            <span className="text-[10px] font-black text-indigo-600 uppercase">Status: Contango</span>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LME_CURVE}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
              <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                labelStyle={{ fontWeight: 800, marginBottom: '4px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -mr-24 -mt-24" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 flex items-center gap-2">
            <Cpu size={16} /> AI Global Signals
          </h3>
          <div className="space-y-8">
            {[
              { label: "Trend", value: "NEUTRAL BULLISH", color: "text-white" },
              { label: "Momentum", value: "STEADY", color: "text-indigo-300" },
              { label: "Hedge Bias", value: "HOLD / NEUTRAL", color: "text-amber-300" },
              { label: "Procurement", value: "STAGGERED BUY", color: "text-white" },
            ].map((item, idx) => (
              <div key={idx} className="group cursor-default">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 group-hover:text-white transition-colors">{item.label}</p>
                <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
          <button className="mt-12 flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
            Detailed Global Report
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ArbitrageView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <KPI label="LME 3M ($)" value="$3,288" subValue="Official Settlement" icon={Globe2} />
      <KPI label="MCX Current (₹)" value="₹214.45" subValue="Market Price" icon={BarChart3} />
      <KPI label="SHFE (¥)" value="¥18,425" subValue="Shanghai Base" icon={Layers} />
      <KPI label="USD/INR" value="83.1560" subValue="RBI Ref Rate" icon={Activity} />
      <KPI label="USD/CNY" value="7.1820" subValue="PBOC Fix" icon={Activity} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-black text-zinc-900 tracking-tight">Arbitrage Spread Magnitude</h3>
            <p className="text-xs text-zinc-500 font-medium">LME vs MCX Historical Gap</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="text-[10px] font-black text-zinc-500 uppercase">Opportunity Window</span>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ARBITRAGE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dx={-10} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                labelStyle={{ fontWeight: 800, marginBottom: '4px', fontSize: '12px' }}
              />
              <Bar dataKey="spread" fill="#fbbf24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
            <Layers size={14} className="text-indigo-500" /> Comparison Insights
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-[10px] font-black text-zinc-400 uppercase mb-2">LME vs MCX</p>
              <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                Domestic prices are trading at a <span className="text-indigo-600 font-bold">Premium</span> to LME. Import parity suggests slight overvaluation in MCX futures.
              </p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-[10px] font-black text-zinc-400 uppercase mb-2">SHFE vs LME</p>
              <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                SHFE leading LME by 12 hours. China demand signals remain <span className="text-emerald-600 font-bold">Resilient</span> despite macro headwinds.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500 rounded-3xl p-8 text-amber-950 relative overflow-hidden shadow-lg shadow-amber-500/20">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6">Arbitrage Guidance</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black uppercase mb-1 opacity-60">Window Magnitude</p>
              <p className="text-2xl font-black">18.2 USD/MT</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase mb-1 opacity-60">Recommendation</p>
              <div className="inline-flex items-center px-3 py-1 bg-amber-950 text-amber-50 rounded-lg font-black text-[10px]">
                WAIT / MONITOR
              </div>
            </div>
            <p className="text-xs font-medium leading-relaxed opacity-80 pt-2 border-t border-amber-600/20">
              Spread is tightening. Current levels do not justify cross-exchange hedging execution. Monitor for widen above 22.0.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { label: "Spread Direction", value: "PREMIUM", note: "MCX relative to LME" },
        { label: "Magnitude", value: "MEDIUM", note: "Historical average is 15.0" },
        { label: "Urgency", value: "LOW", note: "No immediate structural shift" },
      ].map((metric, idx) => (
        <div key={idx} className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm hover:border-indigo-100 transition-colors">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">{metric.label}</p>
          <p className="text-xl font-black text-zinc-900 mb-1">{metric.value}</p>
          <p className="text-[10px] font-bold text-zinc-500">{metric.note}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Page Shell ---

export default function TrendsPage() {
  const [activeTab, setActiveTab] = useState("MCX");

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 font-sans selection:bg-indigo-100 pb-20">
      <main className="max-w-[1600px] mx-auto p-6 space-y-8">
        
        {/* Page Identity & Tab Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-center text-indigo-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Market Trends & Analytics</h1>
              <div className="flex items-center gap-2">
                <p className="text-xs text-zinc-500 font-medium tracking-tight">Technical hub for multi-exchange aluminum analysis</p>
                <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
                  <Activity size={10} />
                  LIVE ANALYTICS ENGINE
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-zinc-100 p-1.5 rounded-2xl shadow-sm">
              {["MCX", "LME", "Arbitrage"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold tracking-tight transition-all ${
                    activeTab === tab 
                      ? "bg-zinc-900 text-white shadow-lg" 
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl text-xs font-bold tracking-tight shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]">
              <Cpu size={14} />
              AI CONTRACT PICKER
            </button>
          </div>
        </div>

        <MarketDisclaimer />

        {/* Tab Content */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {activeTab === "MCX" && <MCXView />}
              {activeTab === "LME" && <LMEView />}
              {activeTab === "Arbitrage" && <ArbitrageView />}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
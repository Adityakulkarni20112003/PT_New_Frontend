"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    Clock,
    Calculator,
    ArrowRight,
    Info,
    AlertCircle,
    ChevronRight,
    Database,
    ArrowUpRight,
    Activity,
    DollarSign,
    Building2,
    FileText,
    Send
} from "lucide-react";
import {
    IconCurrencyRupee,
    IconSwitchHorizontal,
    IconScale,
    IconHistory,
    IconQuote
} from "@tabler/icons-react";

// Types
type PriceTrend = "up" | "down" | "neutral";

// Data Mock
const MARKET_SNAPSHOT = {
    lmeSpot: { price: "$3,257.66", change: "+0.76%", trend: "up" as PriceTrend },
    avgCSP: { price: "$3,242.15", period: "Jan 2026" },
    mcxFutures: [
        { month: "FEB 2026", price: "₹214.45", changePercent: "+0.85%", trend: "up" as PriceTrend },
        { month: "MAR 2026", price: "₹216.10", changePercent: "+0.62%", trend: "up" as PriceTrend },
        { month: "APR 2026", price: "₹217.55", changePercent: "-0.12%", trend: "down" as PriceTrend },
    ],
    isBackwardation: true
};

const SUPPLIER_DATA = {
    hindalco: { price: 218500, label: "HINDALCO" },
    vedanta: { price: 217800, label: "VEDANTA" },
    nalco: { price: 218100, label: "NALCO" }
};

const FOREX = {
    live: 83.1560,
    rbi: 83.1245,
    sbi: 83.4500
};

// Helper Components
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white border border-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_rgba(0,0,0,0.01)] rounded-2xl overflow-hidden ${className}`}
    >
        {children}
    </motion.div>
);

const SectionTitle = ({ children, icon: Icon, subtitle }: { children: React.ReactNode, icon?: any, subtitle?: string }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon className="w-5 h-5 text-indigo-500" />}
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">{children}</h2>
        </div>
        {subtitle && <p className="text-sm text-zinc-500 font-medium">{subtitle}</p>}
    </div>
);

export default function QuotePage() {
    // Calculator States
    const [mcxMode, setMcxMode] = useState<"live" | "manual">("live");
    const [mcxInput, setMcxInput] = useState("214.45");
    const [premium, setPremium] = useState("2.50");
    const [delivery, setDelivery] = useState("1.20");

    const [lmeInput, setLmeInput] = useState("3257.66");
    const [fxRate, setFxRate] = useState(FOREX.live.toString());
    const [duty, setDuty] = useState("7.5");

    return (
        <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 font-sans selection:bg-indigo-100 pb-20">
            <main className="max-w-[1600px] mx-auto p-6 space-y-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 w-fit rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <Activity className="w-3 h-3" />
                            Real-time Quote Engine
                        </div>
                        <h1 className="text-4xl font-black text-zinc-900 tracking-tighter mb-2">Live Market & <span className="text-indigo-600">Calculators</span></h1>
                        <p className="text-zinc-500 max-w-xl font-medium">Precision pricing tools for aluminum procurement, derived from global exchange signals and local supplier benchmarks.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">System Status</p>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="text-xs font-bold text-zinc-900">Calculators Online</span>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Market Snapshot Row */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <Card className="p-6 bg-zinc-900 text-white border-none lg:col-span-1">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">LME Spot Live</p>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black">{MARKET_SNAPSHOT.lmeSpot.price}</h3>
                                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                                    <TrendingUp className="w-3 h-3" />
                                    {MARKET_SNAPSHOT.lmeSpot.change}
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 lg:col-span-1">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Avg CSP ({MARKET_SNAPSHOT.avgCSP.period})</p>
                            <div className="space-y-1 text-zinc-900">
                                <h3 className="text-3xl font-black">{MARKET_SNAPSHOT.avgCSP.price}</h3>
                                <p className="text-xs font-bold text-zinc-400">Monthly Index</p>
                            </div>
                        </Card>

                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {MARKET_SNAPSHOT.mcxFutures.map((item, idx) => (
                                <Card key={idx} className="p-6 relative">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">MCX {item.month}</p>
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black text-zinc-900">{item.price}</h3>
                                        <div className={`flex items-center gap-1 text-xs font-bold ${item.trend === "up" ? "text-emerald-500" : "text-emerald-500"}`}>
                                            {item.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                            {item.changePercent}
                                        </div>
                                    </div>
                                    {idx === 0 && MARKET_SNAPSHOT.isBackwardation && (
                                        <div className="absolute top-4 right-4 group">
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-600 rounded text-[9px] font-black uppercase tracking-tighter">
                                                <AlertCircle className="w-3 h-3" />
                                                Backwardation
                                            </div>
                                            <div className="absolute right-0 top-8 w-48 p-3 bg-zinc-900 text-white text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                                Spot price is higher than future contracts. Indicates immediate supply tightness.
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Calculators Grid */}
                <section>
                    <SectionTitle icon={Calculator} subtitle="Professional grade calculators with live market integration.">Price Estimation Tools</SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* MCX Based Calculator */}
                        <Card className="flex flex-col">
                            <div className="p-6 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white">
                                        <IconScale className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-zinc-900">MCX Calculator</h3>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Futures Based Pricing</p>
                                    </div>
                                </div>
                                <div className="flex bg-white border border-zinc-200 p-1 rounded-lg">
                                    <button
                                        onClick={() => setMcxMode("live")}
                                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${mcxMode === "live" ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-zinc-600"}`}
                                    >LIVE</button>
                                    <button
                                        onClick={() => setMcxMode("manual")}
                                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${mcxMode === "manual" ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-zinc-600"}`}
                                    >MANUAL</button>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">MCX Price (₹)</label>
                                        <input
                                            type="number"
                                            value={mcxInput}
                                            onChange={(e) => setMcxInput(e.target.value)}
                                            disabled={mcxMode === "live"}
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-zinc-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none disabled:opacity-60"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Premium (₹)</label>
                                            <input
                                                type="number"
                                                value={premium}
                                                onChange={(e) => setPremium(e.target.value)}
                                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-zinc-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Delivery (₹)</label>
                                            <input
                                                type="number"
                                                value={delivery}
                                                onChange={(e) => setDelivery(e.target.value)}
                                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-zinc-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-zinc-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-zinc-500">Estimated Landed Price</span>
                                        <Info className="w-3.5 h-3.5 text-zinc-300 cursor-help" />
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-indigo-600">₹{(parseFloat(mcxInput) + parseFloat(premium) + parseFloat(delivery)).toFixed(2)}</span>
                                        <span className="text-xs font-bold text-zinc-400 uppercase">per KG</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* LME Based Calculator */}
                        <Card className="flex flex-col">
                            <div className="p-6 border-b border-zinc-50 flex items-center justify-between bg-indigo-50/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-zinc-900">LME Import Calc</h3>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global conversion tool</p>
                                    </div>
                                </div>
                                <div className="p-2 bg-indigo-100/50 rounded-lg">
                                    <IconSwitchHorizontal className="w-4 h-4 text-indigo-600" />
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">LME USD/MT</label>
                                            <input
                                                type="number"
                                                value={lmeInput}
                                                onChange={(e) => setLmeInput(e.target.value)}
                                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-zinc-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">FX Rate (INR)</label>
                                            <input
                                                type="number"
                                                value={fxRate}
                                                onChange={(e) => setFxRate(e.target.value)}
                                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-zinc-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Import Duty (%)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={duty}
                                                onChange={(e) => setDuty(e.target.value)}
                                                className="w-full px-4 py-4 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-zinc-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-zinc-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-zinc-500">Converted Landing Price</span>
                                        <p className="text-[10px] font-black text-zinc-300 uppercase">Incl. Duty</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-zinc-900">₹{((parseFloat(lmeInput) * parseFloat(fxRate) / 1000) * (1 + parseFloat(duty) / 100)).toFixed(2)}</span>
                                        <span className="text-xs font-bold text-zinc-400 uppercase">per KG</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Supplier Calculator */}
                        <Card className="flex flex-col">
                            <div className="p-6 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-900">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-zinc-900">Supplier Benchmarking</h3>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Direct comparison</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                {Object.values(SUPPLIER_DATA).map((supplier, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl group hover:bg-zinc-100 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-zinc-400 text-[10px] border border-zinc-100">
                                                {supplier.label[0]}
                                            </div>
                                            <span className="text-sm font-bold text-zinc-900 tracking-tight">{supplier.label}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-zinc-900">₹{(supplier.price / 1000).toFixed(2)}</p>
                                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Per KG Base</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4">
                                    <button className="w-full py-3 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                                        Compare All Grades
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>

                    </div>
                </section>

                {/* Planned / Hidden Feature Areas */}
                <section className="pt-10">
                    <SectionTitle icon={Database} subtitle="Reserve workspace for upcoming supplier engagement modules.">Planned Integration Hub</SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-60 grayscale-[0.5]">

                        {/* Quotes from Suppliers Placeholder */}
                        <div className="relative group cursor-not-allowed">
                            <Card className="p-10 border-dashed border-zinc-300 bg-zinc-50/50">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center border border-zinc-200 shadow-sm">
                                        <Send className="w-8 h-8 text-zinc-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-zinc-900 mb-1">Request for Quotes (RFQ)</h4>
                                        <p className="text-xs text-zinc-500 font-medium max-w-[300px]">Send personalized quote requests directly to your primary aluminum supplier network.</p>
                                    </div>
                                    <div className="px-4 py-1.5 bg-zinc-200 rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest">Coming Soon</div>
                                </div>
                            </Card>
                        </div>

                        {/* Latest Supplier Quotes Table Placeholder */}
                        <div className="relative group cursor-not-allowed">
                            <Card className="p-8 border-dashed border-zinc-300 h-full flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-white border border-zinc-200 rounded-xl">
                                        <IconQuote className="w-6 h-6 text-zinc-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-zinc-900">Historical Quote Feed</h4>
                                        <p className="text-xs text-zinc-500 font-medium">Track your recent negotiation history.</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-zinc-200/20 rounded-xl border border-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-zinc-300" />
                                                <div className="w-24 h-3 bg-zinc-200 rounded-full" />
                                            </div>
                                            <div className="w-16 h-3 bg-zinc-200 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                    </div>
                </section>

            </main>
        </div>
    );
}
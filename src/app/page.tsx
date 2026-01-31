"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Globe,
  DollarSign,
  ArrowUpRight,
  Bell,
  LayoutDashboard
} from "lucide-react";
import {
  IconCurrencyRupee,
  IconChartBar,
  IconBuildingFactory2,
  IconMail,
  IconBrandWhatsapp
} from "@tabler/icons-react";

// Types
type PriceTrend = "up" | "down" | "neutral";

// Data Mock
const LME_CASH_SETTLEMENT = {
  live: {
    price: "$3,257.66",
    unit: "/MT",
    change: "+$24.50",
    changePercent: "+0.76%",
    trend: "up" as PriceTrend,
    time: "14:45:02",
    date: "Jan 30, 2026",
    source: "Westmetals"
  },
  historical: [
    { date: "Jan 29, 2026", price: "$3,233.16", usdChange: "+$12.20", usdPercent: "+0.38%", inrChange: "+₹1,012" },
    { date: "Jan 28, 2026", price: "$3,220.96", usdChange: "-$5.40", usdPercent: "-0.17%", inrChange: "-₹448" },
    { date: "Jan 27, 2026", price: "$3,226.36", usdChange: "+$18.80", usdPercent: "+0.58%", inrChange: "+₹1,560" },
  ]
};

const EXCHANGES = {
  mcx: [
    { label: "FEB 2026", price: "₹214.45", changePercent: "+0.85%", trend: "up", updated: "14:42" },
    { label: "MAR 2026", price: "₹216.10", changePercent: "+0.62%", trend: "up", updated: "14:40" },
    { label: "APR 2026", price: "₹217.55", changePercent: "-0.12%", trend: "down", updated: "14:38" },
  ],
  lme: [
    { label: "LME SPOT", price: "$3,257.66", changePercent: "+0.76%", trend: "up", indicator: "Contango" },
    { label: "LME 3-MONTH", price: "$3,288.50", changePercent: "+1.12%", trend: "up", indicator: "Contango" },
  ],
  shfe: [
    { label: "FEB 2026", price: "¥18,425", changePercent: "+0.45%", trend: "up", updated: "14:45" },
    { label: "MAR 2026", price: "¥18,550", changePercent: "+0.32%", trend: "up", updated: "14:42" },
    { label: "APR 2026", price: "¥18,610", changePercent: "+0.15%", trend: "up", updated: "14:40" },
  ]
};

const SUPPLIERS = [
  { name: "Hindalco", price: "₹218,500", grade: "Aluminium Ingot P1020", change: "+0.45%", updated: "10:30 AM" },
  { name: "Vedanta", price: "₹217,800", grade: "Aluminium Ingot P1020", change: "+0.32%", updated: "11:15 AM" },
  { name: "NALCO", price: "₹218,100", grade: "Aluminium Ingot P1020", change: "+0.28%", updated: "09:45 AM" },
];

const FOREX = [
  { name: "RBI Reference Rate", rate: "83.1245", trend: "up", changePercent: "+0.02%", updated: "13:30" },
  { name: "SBI TT Rate", rate: "83.4500", trend: "down", changePercent: "-0.05%", updated: "14:15" },
  { name: "USD/INR Live", rate: "83.1560", trend: "up", changePercent: "+0.08%", updated: "14:46" },
];

// Helper Components
const StatusBadge = ({ trend }: { trend: PriceTrend }) => (
  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${trend === "up" ? "bg-emerald-500/10 text-emerald-500" :
    trend === "down" ? "bg-rose-500/10 text-rose-500" : "bg-zinc-500/10 text-zinc-500"
    }`}>
    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${trend === "up" ? "bg-emerald-500" : trend === "down" ? "bg-rose-500" : "bg-zinc-500"
      }`} />
    {trend === "up" ? "Live High" : trend === "down" ? "Live Low" : "Steady"}
  </div>
);

const TrendIcon = ({ trend, className }: { trend: PriceTrend, className?: string }) => {
  if (trend === "up") return <TrendingUp className={`text-emerald-500 ${className}`} />;
  if (trend === "down") return <TrendingDown className={`text-rose-500 ${className}`} />;
  return <div className={`w-4 h-0.5 bg-zinc-400 ${className}`} />;
};

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className="w-5 h-5 text-zinc-400" />}
    <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">{children}</h2>
  </div>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white border border-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_rgba(0,0,0,0.01)] rounded-2xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

export default function MarketDashboard() {
  const [alertCategory, setAlertCategory] = useState("MCX");
  const [alertType, setAlertType] = useState("Price"); // Price or Percentage
  const [targetValue, setTargetValue] = useState("");
  const [frequency, setFrequency] = useState("One-time");
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>(["Web App", "Email"]);
  const [customMessage, setCustomMessage] = useState("");

  const toggleSupplier = (supplier: string) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplier) ? prev.filter(s => s !== supplier) : [...prev, supplier]
    );
  };

  const toggleChannel = (channel: string) => {
    setChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const selectAllSuppliers = () => {
    if (selectedSuppliers.length === SUPPLIERS.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(SUPPLIERS.map(s => s.name));
    }
  };

  return (
    <div className="min-h-screen text-zinc-900 font-sans selection:bg-indigo-100">
      <main className="max-w-[1600px] mx-auto p-6 space-y-8">

        {/* LME Cash Settlement Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle icon={IconChartBar}>LME Cash Settlement</SectionTitle>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
              SOURCE: <span className="text-zinc-900">{LME_CASH_SETTLEMENT.live.source}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-5 p-6 relative group">
              <div className="absolute top-0 right-0 p-6">
                <StatusBadge trend={LME_CASH_SETTLEMENT.live.trend} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {LME_CASH_SETTLEMENT.live.time}
                  </div>
                  <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {LME_CASH_SETTLEMENT.live.date}
                  </div>
                </div>

                <div>
                  <h3 className="text-zinc-400 text-sm font-medium mb-0.5">Live Spot Price</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter text-zinc-900">
                      {LME_CASH_SETTLEMENT.live.price}
                    </span>
                    <span className="text-lg font-bold text-zinc-400">{LME_CASH_SETTLEMENT.live.unit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-3 bg-zinc-50 rounded-2xl w-fit">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm">
                      <TrendIcon trend={LME_CASH_SETTLEMENT.live.trend} className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">Movement</p>
                      <p className="text-sm font-bold text-emerald-500">{LME_CASH_SETTLEMENT.live.change} ({LME_CASH_SETTLEMENT.live.changePercent})</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-zinc-200" />
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm">
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">Market Bias</p>
                      <p className="text-sm font-bold text-zinc-900">Strong Bullish</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mb-8 pointer-events-none">
                <IconChartBar className="w-full h-full" />
              </div>
            </Card>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {LME_CASH_SETTLEMENT.historical.map((item, idx) => (
                <Card key={idx} className="p-6 flex flex-col relative overflow-hidden hover:border-zinc-200 transition-colors group">
                  <div className="flex justify-between items-start mb-6 z-10">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">{item.date}</p>
                    <ArrowUpRight className="w-4 h-4 text-zinc-200 group-hover:text-zinc-400 transition-colors" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center z-10">
                    <p className="text-3xl font-black text-zinc-900 tracking-tight mb-1">{item.price}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase mb-6">Settlement Price</p>

                    <div className="space-y-3 pt-6 border-t border-zinc-50/50 dashed">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">USD Change</span>
                        <span className={`text-xs font-bold ${item.usdPercent.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>
                          {item.usdChange} ({item.usdPercent})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">INR Converted</span>
                        <span className={`text-xs font-bold ${item.inrChange.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>
                          {item.inrChange}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="w-full h-full text-zinc-900" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Exchange Market Prices */}
        <section>
          <SectionTitle icon={Globe}>Exchange Market Prices</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <Card className="h-full flex flex-col relative overflow-hidden group">
              <div className="relative p-4 border-b border-zinc-50 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-zinc-900 rounded-lg blur opacity-20" />
                    <div className="relative w-8 h-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-900/20 group-hover:shadow-xl group-hover:shadow-zinc-900/30 transition-all duration-300 group-hover:scale-105">
                      <span className="text-[10px] font-bold">MCX</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">MCX Aluminium</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md shadow-sm">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">LIVE</span>
                </div>
              </div>

              <div className="flex-1 relative bg-white">
                {EXCHANGES.mcx.map((item, idx) => {
                  let spreadElement = null;
                  if (idx > 0) {
                    const currentPrice = parseFloat(item.price.replace(/[₹,]/g, ''));
                    const prevPrice = parseFloat(EXCHANGES.mcx[idx - 1].price.replace(/[₹,]/g, ''));
                    const diff = currentPrice - prevPrice;
                    const isContango = diff >= 0;

                    spreadElement = (
                      <div className="flex flex-col items-center justify-center -my-2 relative z-10" key={`spread-${idx}`}>
                        <div className="h-2 w-px bg-zinc-300 border-l border-dashed border-zinc-300"></div>
                        <div className={`flex items-center gap-2 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm border ${isContango ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                          }`}>
                          <span className="uppercase tracking-wider scale-90">{isContango ? "Contango" : "Backwardation"}</span>
                          <div className={`w-px h-3 ${isContango ? "bg-emerald-200" : "bg-rose-200"}`}></div>
                          <span>{diff > 0 ? "+" : ""}{diff.toFixed(2)}</span>
                        </div>
                        <div className="h-2 w-px bg-zinc-300 border-l border-dashed border-zinc-300"></div>
                      </div>
                    );
                  }

                  return (
                    <React.Fragment key={idx}>
                      {spreadElement}
                      <div className="relative p-4 flex items-center justify-between group/item transition-all duration-300 rounded-xl mx-2 border border-transparent hover:border-zinc-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer">
                        <div className="relative">
                          <p className="text-[10px] font-black text-zinc-400 uppercase mb-0.5 group-hover/item:text-zinc-600 transition-colors">{item.label}</p>
                          <p className="text-2xl font-black text-zinc-900 tracking-tight group-hover/item:text-black transition-colors">{item.price}</p>
                        </div>
                        <div className="relative text-right">
                          <div className="flex items-center justify-end gap-1 mb-1">
                            <div className="group-hover/item:scale-110 transition-transform duration-300">
                              <TrendIcon trend={item.trend as PriceTrend} className="w-3.5 h-3.5" />
                            </div>
                            <span className={`text-xs font-bold ${item.trend === "up" ? "text-emerald-500 group-hover/item:text-emerald-600" : "text-rose-500 group-hover/item:text-rose-600"} transition-colors`}>
                              {item.changePercent}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 font-medium group-hover/item:text-zinc-600 transition-colors">{item.updated}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </Card>

            <Card className="h-full flex flex-col relative overflow-hidden group">
              <div className="relative p-4 border-b border-zinc-50 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-600 rounded-lg blur opacity-20" />
                    <div className="relative w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:shadow-xl group-hover:shadow-indigo-600/30 transition-all duration-300 group-hover:scale-105">
                      <span className="text-[10px] font-bold">LME</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">LME Aluminium</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md shadow-sm">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">LIVE</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center relative bg-white">
                {EXCHANGES.lme.map((item, idx) => {
                  let spreadElement = null;
                  if (idx > 0) {
                    const currentPrice = parseFloat(item.price.replace(/[$,]/g, ''));
                    const prevPrice = parseFloat(EXCHANGES.lme[idx - 1].price.replace(/[$,]/g, ''));
                    const diff = currentPrice - prevPrice;
                    const isContango = diff >= 0;

                    spreadElement = (
                      <div className="flex flex-col items-center justify-center -my-2 relative z-10" key={`spread-${idx}`}>
                        <div className="h-2 w-px bg-zinc-300 border-l border-dashed border-zinc-300"></div>
                        <div className={`flex items-center gap-2 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm border ${isContango ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                          }`}>
                          <span className="uppercase tracking-wider scale-90">{isContango ? "Contango" : "Backwardation"}</span>
                          <div className={`w-px h-3 ${isContango ? "bg-emerald-200" : "bg-rose-200"}`}></div>
                          <span>{diff > 0 ? "+" : ""}{diff.toFixed(2)}</span>
                        </div>
                        <div className="h-2 w-px bg-zinc-300 border-l border-dashed border-zinc-300"></div>
                      </div>
                    );
                  }

                  return (
                    <React.Fragment key={idx}>
                      {spreadElement}
                      <div className="relative p-4 flex items-center justify-between group/item transition-all duration-300 rounded-xl mx-2 border border-transparent hover:border-zinc-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer">
                        <div className="relative">
                          <p className="text-[10px] font-black text-zinc-400 uppercase mb-0.5 group-hover/item:text-zinc-600 transition-colors">{item.label}</p>
                          <div className="flex items-baseline gap-1">
                            <p className="text-2xl font-black text-zinc-900 tracking-tight group-hover/item:text-black transition-colors">{item.price}</p>
                            <span className="text-[10px] font-bold text-zinc-400">USD</span>
                          </div>
                        </div>
                        <div className="relative text-right">
                          <div className="flex items-center justify-end gap-1 mb-1">
                            <div className="group-hover/item:scale-110 transition-transform duration-300">
                              <TrendIcon trend={item.trend as PriceTrend} className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-bold ${item.trend === "up" ? "text-emerald-500 group-hover/item:text-emerald-600" : "text-rose-500 group-hover/item:text-rose-600"} transition-colors`}>
                              {item.changePercent}
                            </span>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </Card>

            <Card className="h-full flex flex-col relative overflow-hidden group">
              <div className="relative p-4 border-b border-zinc-50 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-rose-600 rounded-lg blur opacity-20" />
                    <div className="relative w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-rose-600/20 group-hover:shadow-xl group-hover:shadow-rose-600/30 transition-all duration-300 group-hover:scale-105">
                      <span className="text-[10px] font-bold">SHFE</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">SHFE Aluminium</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md shadow-sm">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">LIVE</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center relative bg-white">
                {EXCHANGES.shfe.map((item, idx) => {
                  let spreadElement = null;
                  if (idx > 0) {
                    const currentPrice = parseFloat(item.price.replace(/[¥,]/g, ''));
                    const prevPrice = parseFloat(EXCHANGES.shfe[idx - 1].price.replace(/[¥,]/g, ''));
                    const diff = currentPrice - prevPrice;
                    const isContango = diff >= 0;

                    spreadElement = (
                      <div className="flex flex-col items-center justify-center -my-2 relative z-10" key={`spread-${idx}`}>
                        <div className="h-2 w-px bg-zinc-300 border-l border-dashed border-zinc-300"></div>
                        <div className={`flex items-center gap-2 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm border ${isContango ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                          }`}>
                          <span className="uppercase tracking-wider scale-90">{isContango ? "Contango" : "Backwardation"}</span>
                          <div className={`w-px h-3 ${isContango ? "bg-emerald-200" : "bg-rose-200"}`}></div>
                          <span>{diff > 0 ? "+" : ""}{diff.toFixed(2)}</span>
                        </div>
                        <div className="h-2 w-px bg-zinc-300 border-l border-dashed border-zinc-300"></div>
                      </div>
                    );
                  }

                  return (
                    <React.Fragment key={idx}>
                      {spreadElement}
                      <div className="relative p-4 flex items-center justify-between group/item transition-all duration-300 rounded-xl mx-2 border border-transparent hover:border-zinc-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer">
                        <div className="relative">
                          <p className="text-[10px] font-black text-zinc-400 uppercase mb-0.5 group-hover/item:text-zinc-600 transition-colors">{item.label}</p>
                          <div className="flex items-baseline gap-1">
                            <p className="text-2xl font-black text-zinc-900 tracking-tight group-hover/item:text-black transition-colors">{item.price}</p>
                            <span className="text-[10px] font-bold text-zinc-400">CNY</span>
                          </div>
                        </div>
                        <div className="relative text-right">
                          <div className="flex items-center justify-end gap-1 mb-1">
                            <div className="group-hover/item:scale-110 transition-transform duration-300">
                              <TrendIcon trend={item.trend as PriceTrend} className="w-3.5 h-3.5" />
                            </div>
                            <span className={`text-xs font-bold ${item.trend === "up" ? "text-emerald-500 group-hover/item:text-emerald-600" : "text-rose-500 group-hover/item:text-rose-600"} transition-colors`}>
                              {item.changePercent}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 font-medium group-hover/item:text-zinc-600 transition-colors">{item.updated}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col">
            <SectionTitle icon={IconBuildingFactory2}>Supplier Pricing Comparison</SectionTitle>
            <Card className="flex-1 overflow-hidden border-zinc-100/80 shadow-sm hover:shadow-md transition-shadow duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50/50 border-b border-zinc-100">
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Supplier</th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Grade / Spec</th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Live Price</th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">24h Change</th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {SUPPLIERS.map((supplier, idx) => (
                      <tr key={idx} className="group/row hover:bg-zinc-100/70 transition-all duration-200 cursor-pointer border-l-2 border-l-transparent hover:border-l-zinc-900">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="absolute inset-0 bg-zinc-900 rounded-lg blur opacity-0 group-hover/row:opacity-10 transition-opacity" />
                              <div className="relative w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center font-black text-zinc-900 shadow-sm border border-zinc-200/50 group-hover/row:scale-105 group-hover/row:border-zinc-300 transition-all duration-300">
                                {supplier.name[0]}
                              </div>
                            </div>
                            <div>
                              <p className="font-black text-zinc-900 text-sm group-hover/row:text-black transition-colors">{supplier.name}</p>
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Primary Producer</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-zinc-50 text-zinc-600 rounded-md text-[10px] font-bold border border-zinc-100">
                            {supplier.grade}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-lg font-black text-zinc-900 tracking-tight group-hover/row:text-black transition-colors">{supplier.price}</span>
                            <span className="text-[10px] font-bold text-zinc-400">/MT</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-black border border-emerald-100">
                              <TrendingUp className="w-3 h-3" />
                              {supplier.change}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold text-zinc-500">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            {supplier.updated}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            <SectionTitle icon={DollarSign}>FX Reference Rates</SectionTitle>
            <div className="flex-1 flex flex-col gap-4">
              {FOREX.map((item, idx) => (
                <Card key={idx} className="flex-1 relative overflow-hidden group/fx p-0 border-zinc-100/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent opacity-0 group-hover/fx:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-xl blur opacity-20 transition-all duration-500 group-hover/fx:opacity-30 ${item.trend === "up" ? "bg-zinc-400 group-hover/fx:bg-emerald-500" : "bg-zinc-400 group-hover/fx:bg-rose-500"
                          }`} />
                        <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border transition-all duration-500 group-hover/fx:scale-110 ${item.trend === "up"
                          ? "bg-zinc-50 border-zinc-200/50 text-zinc-500 group-hover/fx:bg-gradient-to-br group-hover/fx:from-emerald-50 group-hover/fx:to-emerald-100 group-hover/fx:border-emerald-200/50 group-hover/fx:text-emerald-600"
                          : "bg-zinc-50 border-zinc-200/50 text-zinc-500 group-hover/fx:bg-gradient-to-br group-hover/fx:from-rose-50 group-hover/fx:to-rose-100 group-hover/fx:border-rose-200/50 group-hover/fx:text-rose-600"
                          }`}>
                          <IconCurrencyRupee className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-900 mb-0.5 group-hover/fx:text-black transition-colors">{item.name}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                          <Clock className="w-3 h-3" />
                          {item.updated}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <p className="text-xl font-black text-zinc-900 tracking-tight group-hover/fx:text-black transition-colors">{item.rate}</p>
                        <span className="text-[10px] font-bold text-zinc-400">INR</span>
                      </div>
                      <div className="flex items-center justify-end gap-1.5 mt-1.5">
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black border ${item.trend === "up"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                          }`}>
                          <TrendIcon trend={item.trend as PriceTrend} className="w-3 h-3" />
                          <span className="uppercase tracking-wider">{item.changePercent}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Price Alert Section */}
        <div className="flex items-center justify-between mb-6">
          <SectionTitle icon={Bell}>Price Alert</SectionTitle>
          <button className="flex items-center gap-2 px-6 py-2 bg-pink-500/10 text-pink-500 border border-pink-500/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
            Activate smart alerts
          </button>
        </div>

        <section className="bg-[#0a0a0a] rounded-[2.5rem] p-10 overflow-hidden relative border border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="w-14 h-14 bg-pink-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-pink-400/20">
                <Bell className="w-8 h-8 text-pink-200" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-pink-200 tracking-tight leading-tight">Never miss a Market Swing.</h2>
                <p className="text-rose-200/70 text-lg">Configure intelligent alerts for exchange contracts and supplier price changes.</p>
              </div>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-zinc-800" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-pink-600 flex items-center justify-center text-xs font-bold text-white">
                    +1k
                  </div>
                </div>
                <p className="text-xs font-medium text-pink-300">Traders using smart alerts</p>
              </div>
            </div>

            <Card className="lg:col-span-7 bg-white/10 backdrop-blur-2xl border-white/10 p-5">
              {alertCategory === "Suppliers" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {/* Top Row: Category/Suppliers (L) and Channels (R) */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["MCX", "LME", "Suppliers"].map(cat => (
                          <button key={cat} onClick={() => setAlertCategory(cat)} className={`py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-wider ${alertCategory === cat ? "bg-white text-zinc-950 shadow-xl shadow-white/20" : "bg-white/5 text-pink-200 hover:bg-white/10"}`}>{cat}</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Select Suppliers</label>
                        <button onClick={selectAllSuppliers} className="text-[9px] font-black text-pink-400 uppercase hover:text-white transition-colors tracking-widest">{selectedSuppliers.length === SUPPLIERS.length ? "Deselect All" : "Select All"}</button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-xl p-0.5 border border-white/10">
                        {SUPPLIERS.map(s => (
                          <button key={s.name} onClick={() => toggleSupplier(s.name)} className={`py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-wider ${selectedSuppliers.includes(s.name) ? "bg-white/10 text-white" : "text-pink-300/40 hover:text-pink-200"}`}>{s.name}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Notification Channels</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[{ name: "Web App", icon: LayoutDashboard, color: "text-blue-400" }, { name: "WhatsApp", icon: IconBrandWhatsapp, color: "text-emerald-400" }, { name: "Email", icon: IconMail, color: "text-pink-300" }].map(ch => (
                        <div key={ch.name} onClick={() => toggleChannel(ch.name)} className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all cursor-pointer group ${channels.includes(ch.name) ? "bg-pink-500/10 border-pink-500/30 shadow-lg shadow-pink-500/5" : "bg-white/5 border-white/5 hover:border-white/10"}`}>
                          <div className={`w-3.5 h-3.5 rounded border transition-all flex items-center justify-center ${channels.includes(ch.name) ? "bg-pink-500 border-pink-400" : "bg-white/5 border-white/10 group-hover:bg-white/10"}`}>{channels.includes(ch.name) && <div className="w-1 h-1 bg-white rounded-full" />}</div>
                          <ch.icon className={`w-3.5 h-3.5 ${ch.color}`} />
                          <span className={`text-[10px] font-bold transition-colors ${channels.includes(ch.name) ? "text-white" : "text-pink-300/40"}`}>{ch.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 2: Alert Condition (L) and Frequency (R) */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Alert Condition</label>
                    <div className="flex bg-white/5 rounded-xl p-0.5 border border-white/10">
                      {["Price", "Percentage"].map(type => (
                        <button key={type} onClick={() => setAlertType(type)} className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-wider ${alertType === type ? "bg-white/10 text-white" : "text-pink-300/60 hover:text-pink-200"}`}>{type}</button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Frequency</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["One-time", "Recurring"].map(f => (
                        <button key={f} onClick={() => setFrequency(f)} className={`py-1.5 px-4 text-[10px] font-black rounded-xl border transition-all ${frequency === f ? "bg-white/10 text-white border-white/30" : "bg-transparent text-pink-300/40 border-white/5 hover:border-white/10"}`}>{f}</button>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Target Price (L) and Custom Message (R) */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">{alertType === "Price" ? "Target Price" : "Target percentage"}</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 font-bold text-xs">{alertType === "Price" ? "₹" : "%"}</div>
                      <input type="number" step="any" value={targetValue} onChange={(e) => setTargetValue(e.target.value)} placeholder="0.0" className="w-full pl-9 pr-4 py-2.5 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-pink-400/20 focus:ring-1 focus:ring-pink-500/50 outline-none transition-all font-bold" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Custom Message</label>
                    <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} placeholder="e.g. {price} reached..." className="w-full h-[45px] px-4 py-2 bg-white/5 border-white/10 rounded-xl text-white text-[11px] placeholder:text-pink-400/20 focus:ring-1 focus:ring-pink-500/50 outline-none resize-none transition-all scrollbar-none" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Category</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["MCX", "LME", "Suppliers"].map(cat => (
                            <button key={cat} onClick={() => setAlertCategory(cat)} className={`py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-wider ${alertCategory === cat ? "bg-white text-zinc-950 shadow-xl shadow-white/20" : "bg-white/5 text-pink-200 hover:bg-white/10"}`}>{cat}</button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Alert Condition</label>
                        <div className="flex bg-white/5 rounded-xl p-0.5 border border-white/10">
                          {["Price", "Percentage"].map(type => (
                            <button key={type} onClick={() => setAlertType(type)} className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all uppercase tracking-wider ${alertType === type ? "bg-white/10 text-white" : "text-pink-300/60 hover:text-pink-200"}`}>{type}</button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">{alertType === "Price" ? "Target Price" : "Target percentage"}</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 font-bold text-xs">{alertCategory === "LME" ? "$" : "₹"}</div>
                          <input type="number" step="any" value={targetValue} onChange={(e) => setTargetValue(e.target.value)} placeholder="0.0" className="w-full pl-9 pr-4 py-2.5 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-pink-400/20 focus:ring-1 focus:ring-pink-500/50 outline-none transition-all font-bold" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Notification Channels</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[{ name: "Web App", icon: LayoutDashboard, color: "text-blue-400" }, { name: "WhatsApp", icon: IconBrandWhatsapp, color: "text-emerald-400" }, { name: "Email", icon: IconMail, color: "text-pink-300" }].map(ch => (
                            <div key={ch.name} onClick={() => toggleChannel(ch.name)} className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all cursor-pointer group ${channels.includes(ch.name) ? "bg-pink-500/10 border-pink-500/30 shadow-lg shadow-pink-500/5" : "bg-white/5 border-white/5 hover:border-white/10"}`}>
                              <div className={`w-3.5 h-3.5 rounded border transition-all flex items-center justify-center ${channels.includes(ch.name) ? "bg-pink-500 border-pink-400" : "bg-white/5 border-white/10 group-hover:bg-white/10"}`}>{channels.includes(ch.name) && <div className="w-1 h-1 bg-white rounded-full" />}</div>
                              <ch.icon className={`w-3.5 h-3.5 ${ch.color}`} />
                              <span className={`text-[10px] font-bold transition-colors ${channels.includes(ch.name) ? "text-white" : "text-pink-300/40"}`}>{ch.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Frequency</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["One-time", "Recurring"].map(f => (
                            <button key={f} onClick={() => setFrequency(f)} className={`py-1.5 px-4 text-[10px] font-black rounded-xl border transition-all ${frequency === f ? "bg-white/10 text-white border-white/30" : "bg-transparent text-pink-300/40 border-white/5 hover:border-white/10"}`}>{f}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-pink-300 uppercase tracking-widest">Custom Message</label>
                    <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} placeholder="e.g. {price} reached..." className="w-full h-[60px] px-4 py-2.5 bg-white/5 border-white/10 rounded-xl text-white text-[11px] placeholder:text-pink-400/20 focus:ring-1 focus:ring-pink-500/50 outline-none resize-none transition-all scrollbar-none" />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <button className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-black uppercase tracking-[0.3em] rounded-xl shadow-2xl shadow-pink-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
                  <Bell className="w-4 h-4 group-hover:animate-ring" />
                  Create Alert
                </button>
              </div>
            </Card>
          </div>
        </section>

      </main>

      <footer className="max-w-[1600px] mx-auto p-6 flex items-center justify-between border-t border-zinc-100 mt-12 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <Image
              src="/novaex-logo.png"
              alt="NOVAEX Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">© 2026 NOVAEX. All Rights Reserved.</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[10px] font-bold text-zinc-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Privacy</a>
          <a href="#" className="text-[10px] font-bold text-zinc-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Terms</a>
          <a href="#" className="text-[10px] font-bold text-zinc-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}


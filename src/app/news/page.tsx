"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  Search,
  Filter,
  RefreshCw,
  BrainCircuit,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  Clock,
  ShieldCheck,
  Activity as HighImpactIcon,
  ChevronRight,
  ExternalLink,
  Target,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  Bolt
} from "lucide-react";

// Mock Data
const SENTIMENT_DATA = {
  outlook: "Bullish",
  confidence: "High",
  distribution: { bullish: 65, bearish: 20, neutral: 15 },
  stats: {
    totalAnalyzed: 142,
    highConfidence: 84,
    bullishSignals: 92,
    bearishSignals: 35
  }
};

const NEWS_ARTICLES = [
  {
    id: 1,
    headline: "LME Aluminum Stocks Hit 3-Year Low Amid Supply Chain Disruptions",
    source: "Reuters",
    time: "2h ago",
    relevance: 98,
    summary: "Significant drawdown in warehouse stocks across Asian hubs suggests tightening physical market. AI analysis indicates high probability of short-term price spike as traders cover positions.",
    sentiment: "Bullish",
    confidence: "High",
    impact: true
  },
  {
    id: 2,
    headline: "New Smelter Project in Middle East Set to Increase Global Capacity",
    source: "Bloomberg",
    time: "5h ago",
    relevance: 82,
    summary: "Planned 500k MT/year facility announced. While long-term supply increases, immediate market impact is muted by high construction costs and energy pricing uncertainties.",
    sentiment: "Neutral",
    confidence: "Medium",
    impact: false
  },
  {
    id: 3,
    headline: "Energy Costs in Europe Force Temporary Curtailment of Smelting Operations",
    source: "Metal Bulletin",
    time: "8h ago",
    relevance: 94,
    summary: "Rising natural gas prices make production uneconomical for tier-2 producers. Predicted supply reduction of 120k MT in Q1 2026. Clear upward pressure on premiums.",
    sentiment: "Bullish",
    confidence: "High",
    impact: true
  },
  {
    id: 4,
    headline: "China Macro Data Shows Cooling Manufacturing Sector Performance",
    source: "FT",
    time: "12h ago",
    relevance: 88,
    summary: "PMI data fell below expectations, suggesting slower domestic demand for industrial metals. Offsetting global supply constraints, preventing a runaway rally.",
    sentiment: "Bearish",
    confidence: "Medium",
    impact: false
  }
];

const INTELLIGENCE_SUMMARY = {
  themes: ["Inventory Depletion", "Energy Cost Volatility", "Macro Demand Cooling"],
  narrative: "The aluminum market is currently characterized by a tug-of-war between severe supply-side constraints (inventory lows, energy costs) and cooling demand signals from major manufacturing hubs. AI modeling suggests supply risks currently outweigh demand weakness.",
  risks: ["Geopolitical escalation affecting trade routes", "Sudden energy price spikes"],
  takeaway: "Maintain long bias on Spot/3-Month LME while monitoring China's recovery signals. Focus on high-purity ingot availability as premiums are likely to expand faster than LME base prices."
};

// Components
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white border border-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_rgba(0,0,0,0.01)] rounded-2xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const SentimentBadge = ({ sentiment }: { sentiment: string }) => {
  const styles: any = {
    Bullish: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Bearish: "bg-red-50 text-red-600 border-red-100",
    Neutral: "bg-zinc-50 text-zinc-600 border-zinc-100"
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[sentiment]}`}>
      {sentiment.toUpperCase()}
    </span>
  );
};

export default function NewsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 font-sans">
      <main className="max-w-[1400px] mx-auto p-6 space-y-8">

        {/* Page Identity & Controls */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-pink-600 rounded-lg text-white">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">Aluminum Market Intelligence</h1>
            </div>
            <p className="text-zinc-500 text-sm font-medium flex items-center gap-2">
              <Bolt className="w-4 h-4 text-amber-500 fill-amber-500" />
              AI-powered sentiment analysis and price impact prediction
            </p>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Last updated: Jan 30, 2026, 15:30:00
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-white border border-zinc-200 p-1 rounded-xl shadow-sm">
              {["All", "Confidence", "Sentiment", "Category"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item.toLowerCase())}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${filter === item.toLowerCase() ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-zinc-900"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="p-2.5 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: News Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                Latest News Analysis
              </h2>
              <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md">
                Showing {NEWS_ARTICLES.length} of 142
              </span>
            </div>

            <div className="space-y-4">
              {NEWS_ARTICLES.map((article) => (
                <Card key={article.id} className="group hover:border-pink-200 transition-all cursor-pointer">
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-tighter">
                          <span>{article.source}</span>
                          <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                          <span>{article.time}</span>
                          {article.impact && (
                            <span className="flex items-center gap-1 bg-red-500 text-white px-1.5 py-0.5 rounded ml-2 animate-pulse">
                              <Bolt className="w-2.5 h-2.5 fill-current" />
                              HIGH IMPACT
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 group-hover:text-pink-600 transition-colors leading-tight">
                          {article.headline}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter mb-1">Relevance</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-pink-500" style={{ width: `${article.relevance}%` }} />
                          </div>
                          <span className="text-xs font-black text-zinc-900">{article.relevance}%</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-500 font-medium leading-relaxed bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
                      {article.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sentiment:</span>
                          <SentimentBadge sentiment={article.sentiment} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">AI Confidence:</span>
                          <span className={`flex items-center gap-1 text-[10px] font-bold ${article.confidence === "High" ? "text-emerald-500" : "text-amber-500"
                            }`}>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {article.confidence}
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors">
                        Read Original <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <button className="w-full py-4 border-2 border-dashed border-pink-200/50 rounded-2xl text-pink-500 font-bold text-xs hover:border-pink-500 hover:bg-pink-50/50 transition-all uppercase tracking-widest shadow-sm">
              Load More Market Analysis
            </button>
          </div>

          {/* RIGHT COLUMN: Intelligence & Sentiment */}
          <div className="lg:col-span-4 space-y-8">

            {/* Sentiment Overview */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Sentiment Overview
              </h2>
              <Card className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Market Outlook</p>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-emerald-600">{SENTIMENT_DATA.outlook}</h3>
                        <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded uppercase">
                          {SENTIMENT_DATA.confidence} Confidence
                        </div>
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-500" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase">
                      <span>Distribution</span>
                      <span className="text-zinc-900">Total Analyzed: {SENTIMENT_DATA.stats.totalAnalyzed}</span>
                    </div>
                    <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `${SENTIMENT_DATA.distribution.bullish}%` }} />
                      <div className="h-full bg-zinc-400" style={{ width: `${SENTIMENT_DATA.distribution.neutral}%` }} />
                      <div className="h-full bg-red-500" style={{ width: `${SENTIMENT_DATA.distribution.bearish}%` }} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-zinc-500">{SENTIMENT_DATA.distribution.bullish}% Bullish</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-400" />
                        <span className="text-[10px] font-bold text-zinc-500">{SENTIMENT_DATA.distribution.neutral}% Neutral</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold text-zinc-500">{SENTIMENT_DATA.distribution.bearish}% Bearish</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-50">
                    <div className="p-3 bg-zinc-50 rounded-xl">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Bullish Signals</p>
                      <p className="text-xl font-black text-zinc-900">{SENTIMENT_DATA.stats.bullishSignals}</p>
                    </div>
                    <div className="p-3 bg-zinc-50 rounded-xl">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Bearish Signals</p>
                      <p className="text-xl font-black text-zinc-900">{SENTIMENT_DATA.stats.bearishSignals}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* News Intelligence Summary */}
            <section className="space-y-4 flex-1 flex flex-col">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Intelligence Summary
              </h2>
              <div className="flex-1 bg-[#0a0a0a] rounded-[2.5rem] p-8 overflow-hidden relative border border-white/5 shadow-2xl flex flex-col justify-between">
                {/* Background Blurs from Dashboard */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[100px] -mr-48 -mt-48 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px] -ml-32 -mb-32 opacity-40" />

                <div className="relative z-10 space-y-8 flex-1">
                  {/* Title like Dashboard */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-pink-500/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-pink-400/20">
                      <Lightbulb className="w-6 h-6 text-pink-200" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-pink-200 tracking-tight">Intelligence Summary</h2>
                      <p className="text-pink-200/60 text-xs font-medium mt-1">AI-synthesized market outlook and key themes.</p>
                    </div>
                  </div>

                  {/* Emerging Themes like Dashboard Buttons */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-pink-300 uppercase tracking-[0.2em]">Emerging Themes</p>
                    <div className="flex flex-wrap gap-2">
                      {INTELLIGENCE_SUMMARY.themes.map((theme) => (
                        <span key={theme} className="px-3 py-1.5 bg-white/5 text-pink-200 rounded-lg text-[10px] font-black uppercase border border-white/5 tracking-wider">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Market Narrative like Dashboard Card */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-pink-300 uppercase tracking-[0.2em]">Market Narrative</p>
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl">
                      <p className="text-sm text-pink-50/90 leading-relaxed font-medium italic">
                        "{INTELLIGENCE_SUMMARY.narrative}"
                      </p>
                    </div>
                  </div>

                  {/* Macro Risks like Dashboard Error/Alert states */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-pink-300 uppercase tracking-[0.2em]">Macro Risks</p>
                    <div className="grid grid-cols-1 gap-2">
                      {INTELLIGENCE_SUMMARY.risks.map((risk) => (
                        <div key={risk} className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-xl transition-all hover:bg-white/10">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-[11px] font-bold text-pink-100/70">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <footer className="max-w-[1400px] mx-auto p-6 flex items-center justify-between border-t border-zinc-100 mt-12 mb-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">© 2026 NOVAEX AI Intelligence. Market News API provided by Reuters.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[10px] font-bold text-zinc-400 hover:text-pink-600 uppercase tracking-widest transition-colors">Documentation</a>
          <a href="#" className="text-[10px] font-bold text-zinc-400 hover:text-pink-600 uppercase tracking-widest transition-colors">API Status</a>
        </div>
      </footer>
    </div>
  );
}
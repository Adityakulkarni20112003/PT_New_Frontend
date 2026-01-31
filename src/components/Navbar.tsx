"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  TrendingUp,
  FileText,
  Newspaper,
  Bell
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Trends", href: "/trends", icon: TrendingUp },
  { label: "Quote", href: "/quote", icon: FileText },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Alerts", href: "/alerts", icon: Bell },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all rounded-b-2xl">
      <div className="w-full max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">

        {/* Brand/Logo */}
        <div className="flex-1 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-3 transition-all active:scale-95 group"
          >
            <div className="relative w-40 h-10 overflow-hidden">
              <Image
                src="/novaex-logo.png"
                alt="NOVAEX Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navigation Center - Pill Design */}
        <div className="flex items-center">
          <div className="flex items-center bg-zinc-100/80 p-2 rounded-2xl border border-zinc-200/50">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl ${isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white shadow-sm border border-zinc-200/50 rounded-xl"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2.5">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? "text-pink-600" : "text-current"}`} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile */}
        <div className="flex-1 flex items-center justify-end">
          <div className="flex items-center">
            <div className="h-10 w-px bg-zinc-200 mx-8"></div>
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-zinc-900 leading-none group-hover:text-pink-600 transition-colors">Alex Thompson</p>
                <p className="text-xs font-medium text-zinc-400 mt-1">Trading Manager</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all">
                AT
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}